(function(){
    
    var dropdown= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        if(obj.data("menu-selector")!=undefined){
           f.menu= $(obj.data("menu-selector"));
        }
        else{
            f.menu= obj.find(".dropdown-menu");
        }
        
        
        f.events= function(){
            
            
            
            vox.mutation.watchAppend(f.menu, function(ev){
                f.pEvents(ev.jTarget.find(">a"));
            }, "li");
            f.pEvents(f.menu.find("li>a"));
            
            $(document).keyup(function(ev){
                if(f.captureKeyboard){
                    ev.preventDefault();
                    
                    ev.dropdown= self;
                    self.trigger("keyup", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    
                    if(ev.keyCode==39){
                        
                    }
                    
                    return false;
                }
            });
            
            $(document).click(function(ev){
                if(!self.isOpened()){
                    return; 
                }
                var e= $(ev.target);
                
                if((ev.target!= f.obj.get(0)) && (f.obj.find(e).length==0)){
                    
                    var ev2= vox.platform.createEvent("outerclick");
                    ev2.dropdown= self;
                    ev2.target= ev.target;
                    ev2.clickEvent= ev;
                    self.trigger("outerclick", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    
                    self.close();
                }
                
            });
            f.btn=f.obj.find("a,.button").eq(0);
            f.btn.click(function(){
                if(f.lEvent=="mouseenter"){
                    return self.open();
                }
                self.toggle();
            });
            
            
            var j= function(ev){
                if(f.obj.data("hover-activate")){
                    if(ev.type=="mouseenter"){
                        if(f.closing){
                            clearTimeout(f.closing);
                            f.closing= undefined;
                            return ;
                        }
                        if(self.isOpened()){
                            return;
                        }
                        self.open(ev);
                    }
                    else if(ev.type=="mouseleave"){
                        
                        if(f.lEvent!="mouseenter"){
                            return; 
                        }
                        
                        
                        f.closing= setTimeout(function(){
                            self.close();
                            f.closing=undefined;
                        }, 100);
                    }
                }
            }
            f.btn.hover(j);
            f.menu.hover(j);
            
            
        }
        
        self.isOpened= function(){
            return f.menu.hasClass("opened");
        }
        
        
        
        f.pEvents= function(a){
            a.click(function(){
                
                var a0= $(this);
                var ev= vox.platform.createEvent("beforeselect");
                ev.dropdown= self;
                ev.jTarget= a0;
                
                self.trigger("beforeselect", ev);
                if(ev.defaultPrevented){
                    return; 
                }
            
                var ev= vox.platform.createEvent("select");
                ev.dropdown= self;
                ev.jTarget= a0;
                ev.value= a0.data("value");
                
                self.trigger("select", ev);
                if(ev.defaultPrevented){
                    return; 
                }
                
                self.close();
            });
        }
        
        self.trigger= function(name, ev){
            var g;
            
            if(g=f.menu.data("vox-" + name)){
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
        
        self.open= function(ev2){
            
            var ev= vox.platform.createEvent("beforeopen");
            ev.dropdown= self;
            if(ev2){
                ev.originalEvent= ev2;
            }
            self.trigger("beforeopen", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            
            f.lEvent= ev2?ev2.type:"";
            f.menu.addClass("opened");
            //f.menu.show();
            
            f.menu.voxanimate(f.menu.data("ineffect")|| "fadeIn short", null, function(){
                
                f.captureKeyboard= true;
                var ev= vox.platform.createEvent("open");
                ev.dropdown= self;
                if(ev2){
                    ev.originalEvent= ev2;
                }
                self.trigger("open", ev);    
                
                
                
            });
            
            
            
            
        }
        
        self.close= function(){
            
            var ev= vox.platform.createEvent("beforeclose");
            ev.dropdown= self;
            self.trigger("beforeclose", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            f.lEvent= undefined;
            f.menu.removeClass("opened");
            f.menu.voxanimate(f.menu.data("outeffect")|| "fadeOut short", null, function(){
                f.captureKeyboard= false;
                var ev= vox.platform.createEvent("close");
                ev.dropdown= self;
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
    vox.dropdown= dropdown;
    var j= function(obj){
        obj.voxdropdown();
    }
    
    $.fn.voxdropdown= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-dropdown"))){
                t=new dropdown(o);
                o.data("vox-dropdown", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".dropdown");
        j($(".dropdown"));
    });
    
})();