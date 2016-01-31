(function(){
    
    var pinned= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        f.parent= f.obj.parent();
        f.scrollfire= f.parent.voxscrollfire()[0];
        
        f.scrollfire.on("scroll",function(ev){
            var j= f.obj;
            var j2= f.parent;
            var h=j.outerHeight();
            var h2=j2.outerHeight();

            if(h>$(window).height()){
                if(ev.offset>=h){
                    if(ev.offset>h2){
                        ev.offset= h2;
                    }
                    var a= ev.offset-h;
                    j.css("margin-top",a+"px");
                }
                else{
                    j.css("margin-top","0");
                }    
            }
            else{
                if(ev.offset>$(window).height()){
                    var a=ev.offset-$(window).height();
                    if(a+h>= h2){
                        a= h2-h;
                    }
                    j.css("margin-top",a+"px");
                    
                }
                else{
                    j.css("margin-top","0");
                }
            }
            
        });
        
        
        f.events= function(){
            
            
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
        
        
        f.events();
        
    };
    vox.pinned= pinned;
    var j= function(obj){
        obj.voxpinned();
    }
    
    $.fn.voxpinned= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-pinned"))){
                t=new pinned(o);
                o.data("vox-pinned", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".pinned");
        j($(".pinned"));
    });
    
})();