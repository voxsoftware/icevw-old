(function(){
    
    
    var createTooltip= function(obj){
        var s= $("<div class='tooltip'></div>");
        if(obj.data("class")){
            s.addClass(obj.data("class"));
        }
        else{
            s.addClass("default");
        }
        $("body").append(s);
        return s;
    }
    
    var hasTooltip= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        
        var s= f.obj.attr("vox-selector");
        if(s){
            f.tip= $(s);
        }
        else{
            f.tip= createTooltip(obj);
        }
        f.tip= f.tip.voxtooltip()[0];
        
        f.events= function(){
            f.obj.hover(function(ev){
                if(ev.type=="mouseenter"){
                    self.activate();
                    return;
                }
                else if(ev.type="mouseleave"){
                    f.tip.activateClose();
                    return;
                }
            });
        }
        
        self.activate= function(){
            var fu = "setText";
            if(f.obj.data("html")){
                fu= "setHtml";
            }
            if(f.obj.data("tooltip")){
                f.tip[fu](f.obj.data("tooltip"));
            }
            
            f.tip.activate(f.obj);
        }
        
        self.close= function(){
            f.tip.close(f.obj);
        }
        
        f.events();
    }
    
    var tip= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        
        
        
        f.events= function(){
            
            f.obj.hover(function(ev){
                if(ev.type=="mouseenter"){
                    self.activate();
                    return;
                }
                else if(ev.type="mouseleave"){
                    self.activateClose();
                    return;
                }
            });
            
            
            $(document).click(function(ev){
                if(!self.isOpened()){
                    return; 
                }
                var e= $(ev.target);
                
                if((ev.target!= f.obj.get(0)) && (f.obj.find(e).length==0)){
                    
                    var ev2= vox.platform.createEvent("outerclick");
                    ev2.tooltip= self;
                    ev2.target= ev.target;
                    ev2.clickEvent= ev;
                    self.trigger("outerclick", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    
                    self.close();
                }
            });
        }
        
        self.setText= function(text){
            return f.obj.text(text);
        }
        self.getText= function(){
            return f.obj.text();
        }
        
        self.setHtml= function(html){
            return f.obj.html(html);
        }
        self.getHtml= function(){
            return f.obj.html();
        }
        
        self.isOpened= function(){
            return f.obj.hasClass("opened");
        }
        
        
        self.trigger= function(name, ev){
            var g;
            
            if(g=f.obj.data("vox-" + name)){
                g(ev);
            }
            
            if(g= f.ev[name]){
                g.each(function(r){
                    r(ev);
                });
            }
        }
        
        self.on= function(name, ev){
            var g= f.ev[name]= f.ev[name]||[];
            g.push(ev);
        }
        
        self.activate= function(parent){
            if(f.activating2){
                clearTimeout(f.activating2);
                f.activating2= undefined;
            }
            if(f.activating){
                clearTimeout(f.activating);
                f.activating= undefined;
            }
            var time= f.obj.data("delay");
            if(isNaN(time)|| !time){
                time=500;
            }
            if(parent){
                f.lParent= parent;
            }
            f.activating= setTimeout(self.open, time);
        }
        self.activateClose= function(){
            if(f.activating){
                clearTimeout(f.activating);
                f.activating= undefined;
            }
            if(f.activating2){
                clearTimeout(f.activating2);
                f.activating2= undefined;
            }
            var time= f.obj.data("delay");
            if(isNaN(time)|| !time){
                time=500;
            }
            
            f.activating2= setTimeout(self.close, time);
        }
        
        
        f.acomode= function(cb){
            f.obj.addClass("activating");
            setTimeout(function(){
               
               var h= f.obj.outerHeight();
               var hg= $(window).height();
               var w= f.obj.outerWidth();
               var hw= $(window).width();
               
               // Verificar cual sería el mejor left: 
               var l=(hw-w)/2;
               f.obj.css("top", 0);
               
               var f_abs= f.obj.offset().top; // El top absolute a partir de fixed 0 ... 
               var lOff=0;
               var lFixed=0;
               var lh= 0;
               var lw=0;
               var lLeft=0;
               
               if(f.lParent){
                   lw= f.lParent.outerWidth();
                   lOff= f.lParent.offset().top;
                   lLeft= f.lParent.offset().left;
                   lFixed= lOff - f_abs;
                   lh= f.lParent.outerHeight();
               }
               
               // Si el fixed del lParent es mayor a la mitad del height, se acomoda en la parte superior ...
               
               if(lFixed> (hg/2)){ // Acomodando a la parte superior ...
                   
                   var maxHeight= (lFixed-20 );
                   if(maxHeight<30){
                       maxHeight= "auto";
                   }
                   else{
                       maxHeight= maxHeight.toString()+ "px";
                   }
                   
                   var top= "initial";
                   var bottom= (hg - lOff + 4) + "px";
                   
               }
               else{ // Acomodando a la parte inferior ...
                    
                    var top= (lOff + lh + 4);
                    var maxHeight= hg- top;
                    if(maxHeight<30){
                        maxHeight= "auto";
                    }
                    else{
                        maxHeight= maxHeight.toString()+ "px";
                    }
                    var bottom= "initial";
                    top= top.toString() + "px";
                    
               }
               
               
               l= (lLeft + (lw/2)) - (w/2);
               if(l<0){
                   l= 0; 
               }
               
               f.obj.css("left", l+"px");
               f.obj.css("max-height", maxHeight);
               f.obj.css("top", top);
               f.obj.css("bottom", bottom);
               f.obj.removeClass("activating");
               
               if(cb){
                   cb();
               }
               
                
            },1);
        }
        
        self.open= function(ev2){
            if(self.isOpened()){
                return;
            }
            f.activating= undefined;
            var ev= vox.platform.createEvent("beforeopen");
            ev.tooltip= self;
            if(ev2){
                ev.originalEvent= ev2;
            }
            self.trigger("beforeopen", ev);
            if(ev.defaultPrevented){
                return; 
            }
            if(f.delay){
                clearTimeout(f.delay);
                f.delay=undefined;
            }
            
            
            // Acomodar ..
            f.acomode(function(){
                f.lEvent= ev2?ev2.type:"";
                
                
                
                var effect= f.obj.data("ineffect") || "fadeIn short";
                f.obj.addClass("opened");
                f.obj.voxanimate(effect, undefined,function(){
                    var ev= vox.platform.createEvent("open");
                    ev.tooltip= self;
                    if(ev2){
                        ev.originalEvent= ev2;
                    }
                    self.trigger("open", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }    
                });
                
                    
                
            });
            
            
        }
        
        self.close= function(){
            if(!self.isOpened()){
                return;
            }
            var ev= vox.platform.createEvent("beforeclose");
            ev.tooltip= self;
            self.trigger("beforeclose", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            f.lEvent= undefined;
            f.obj.removeClass("opened");
            
            var effect= f.obj.data("outeffect") || "fadeOut short";
            f.obj.voxanimate(effect, undefined, function(){
                var ev= vox.platform.createEvent("close");
                ev.tooltip= self;
                self.trigger("close", ev);    
            });
            
            
            
        }
        
        self.toggle= function(){
            if(f.menu.hasClass("opened")){
                self.close();
            }
            else{
                self.open();
            }
        }
        
        
        f.events();
        
    };
    
    
    vox.tooltip= tip;
    var j= function(obj){
        obj.voxtooltip();
    }
    
    var j2= function(obj){
        obj.voxhastooltip();
    }
    
    $.fn.voxtooltip= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-tooltip"))){
                t=new tip(o);
                o.data("vox-tooltip", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $.fn.voxhastooltip= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-hastooltip"))){
                t=new hasTooltip(o);
                o.data("vox-hastooltip", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j2(ev.jTarget);
        }, "[data-hover=tooltip]");
        j2($("[data-hover=tooltip]"));
        
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".tooltip");
        j($(".tooltip"));
        
    });
    
})();