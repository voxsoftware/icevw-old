
(function(){
    
    var card= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        f.reveal= f.obj.find(".card-reveal");
        f.revealClose= f.obj.find(".card-reveal .card-title");
        f.activator= f.obj.find(".activator");
        
        f.events= function(){
            
            f.activator.click(function(ev){
                ev.preventDefault();
                self.reveal();
                return false;
            });
            
            f.revealClose.click(function(ev){
                ev.preventDefault();
                self.closeReveal();
                return false;
            });
            
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
        
        self.reveal= function(ev2){
            
            var ev= vox.platform.createEvent("beforereveal");
            ev.card= self;
            if(ev2){
                ev.originalEvent= ev2;
            }
            self.trigger("beforereveal", ev);
            if(ev.defaultPrevented){
                return false; 
            }
            
            
            f.reveal.show();
            f.reveal.css("top", 0);
            
            var ev= vox.platform.createEvent("reveal");
            ev.card= self;
            self.trigger("reveal", ev);
            if(ev.defaultPrevented){
                return; 
            }
        }
        
        self.closeReveal= function(ev2){
            
            var ev= vox.platform.createEvent("beforeclosereveal");
            ev.card= self;
            if(ev2){
                ev.originalEvent= ev2;
            }
            self.trigger("beforeclosereveal", ev);
            if(ev.defaultPrevented){
                return false; 
            }
            
            
            
            f.reveal.css("top", "100%");
            //f.reveal.hide();
            
            var ev= vox.platform.createEvent("closereveal");
            ev.card= self;
            self.trigger("closereveal", ev);
            if(ev.defaultPrevented){
                return; 
            }
        }
        
        
        
        
        f.events();
        
    };
    vox.card= card;
    var j= function(obj){
        obj.voxcard();
    }
    
    $.fn.voxcard= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-card"))){
                t=new card(o);
                o.data("vox-card", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".card");
        j($(".card"));
    });
    
})();