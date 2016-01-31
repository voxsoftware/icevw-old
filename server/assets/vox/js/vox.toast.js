(function(){
    
    var toast= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        
        if(!toast.container){
            toast.container= $(".toast-container");
            if(toast.container.length==0){
                toast.container= $("<div>");    
                toast.container.addClass("toast-container");
                toast.container.addClass("flow-text");
                $("body").append(toast.container);
            }
        }
        f.obj.removeClass("toast");
        toast.container.append(f.obj);
        f.obj.addClass("toast");
        
        f.events= function(){
            $(document).click(function(ev){
                if(!self.isOpened()){
                    return; 
                }
                var e= $(ev.target);
                
                if((ev.target!= f.obj.get(0)) && (f.obj.find(e).length==0)){
                    
                    var ev2= vox.platform.createEvent("outerclick");
                    ev2.toast= self;
                    ev2.target= ev.target;
                    ev2.clickEvent= ev;
                    self.trigger("outerclick", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    
                    //self.close();
                }
                
            });
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
        
        self.open= function(ev2){
            
            var ev= vox.platform.createEvent("beforeopen");
            ev.toast= self;
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
            
            
            f.lEvent= ev2?ev2.type:"";
            f.obj.addClass("opened");
            f.obj.show();
            
            
            var ev= vox.platform.createEvent("open");
            ev.toast= self;
            if(ev2){
                ev.originalEvent= ev2;
            }
            self.trigger("open", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            var time= parseInt(f.obj.data("delay"));
            if(isNaN(time) || !time){
                time=1000;
            }
            
            f.delay= setTimeout(self.close, time);
            
        }
        
        self.close= function(){
            
            var ev= vox.platform.createEvent("beforeclose");
            ev.toast= self;
            self.trigger("beforeclose", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            f.lEvent= undefined;
            f.obj.removeClass("opened");
            f.obj.hide();
            
            var ev= vox.platform.createEvent("close");
            ev.toast= self;
            self.trigger("close", ev);
            
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
    
    
    vox.toast= toast;
    var j= function(obj){
        obj.voxtoast();
    }
    
    $.fn.voxtoast= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-toast"))){
                t=new toast(o);
                o.data("vox-toast", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            if(ev.moved==false){
                j(ev.jTarget);
            }
        }, ".toast");
        j($(".toast"));
        
        $("[data-toggle=toast]").click(function(){
           var e= $(this);
           var s= e.attr("vox-selector");
           var g= $(s).eq(0);
           var h= g.voxtoast()[0];
           if(h){
               h.open();
           }
        });
    });
    
})();