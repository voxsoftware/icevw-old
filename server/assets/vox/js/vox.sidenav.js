(function(){
    
    
    var sidenav= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        
        if(!sidenav.overlay){
            sidenav.overlay= $("#sidenav-overlay");
            if(sidenav.overlay.length==0){
                sidenav.overlay=undefined;
            }
        }
        if(!sidenav.overlay){
            sidenav.overlay = $("<div>");
            sidenav.overlay.addClass("transitioned");
            sidenav.overlay.attr("id", "sidenav-overlay");
            sidenav.overlay.css("opacity", 0);
            sidenav.overlay.hide();
            $("body").append(sidenav.overlay);
            
            sidenav.overlay.click(function(){
                if(sidenav.current){
                    sidenav.current.close();
                }
            });
            
        }
        
        
        var main= f.obj.data("main");
        f.main= $(main);
        
        f.r= function(){
            var po= f.obj.position();
            var v=true;
            
            if(po.left<= -(f.obj.width()) || po.left>=$(window).width()){
                v= false;
            }
            
            if(v){
                f.main.css("padding-left", f.obj.outerWidth());
            }
            else{
                f.main.css("padding-left", 0);
            }
        }
        
        f.events= function(){
            if(f.button){
                f.button.click(function(){
                    self.toggle();
                });       
            }
            var g= function(){
                if(f.i){
                    clearTimeout(f.i);
                    f.i= undefined;
                }
                f.r();
                f.i= setTimeout(f.r, 600);
            };   
            f.g= g;
            $(window).resize(g);
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
            sidenav.overlay.show();
            sidenav.overlay.css("opacity", 1);
            f.obj.addClass("opened");
            sidenav.current= self;
            var ev= vox.platform.createEvent("open");
            ev.sidenav= self;
            self.trigger("open", ev);    
                
        }
        
        self.close= function(){
            sidenav.overlay.css("opacity", 0);
            setTimeout(function(){
                sidenav.overlay.hide();
            }, 800);
            f.obj.removeClass("opened");
            sidenav.current= undefined;
            var ev= vox.platform.createEvent("close");
            ev.sidenav= self;
            self.trigger("close", ev);    
                
            
        }
        
        self.toggle= function(){
            if(f.obj.hasClass("opened")){
                self.close();
            }
            else{
                self.open();
            }
        }
        
        
        f.events();
        setTimeout(f.r, 500);
        
    };
    
    vox.sidenav= sidenav;
    var j= function(obj){
        obj.voxsidenav();
    }
    
    $.fn.voxsidenav= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-sidenav"))){
                t=new sidenav(o);
                o.data("vox-sidenav", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".side-nav");
        j($(".side-nav"));
    });
    
})();