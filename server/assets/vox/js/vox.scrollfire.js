(function(){
    
    var scrollFire= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        f.off=[];
        
        f.events= function(){
            var w= vox.platform.scrollObject;
            var wo= w.get(0);
            var g= function(ev){
                var he= f.obj.outerHeight();
                var top= f.obj.offset().top;
                var sTop= w.scrollTop();
                var windowScroll = wo.pageYOffset + wo.innerHeight;
                var elementOffset = f.obj.get(0).getBoundingClientRect().top + document.body.scrollTop;
                
               
                var offset= windowScroll-top;   
                if(ev.resize || (windowScroll>=top && sTop <= top + he)){
                    ev.scrollfire= self;
                    ev.offset= windowScroll-top;
                    ev.type= "scroll";
                    self.trigger("scroll", ev);
                }
                
                for(var i=0;i<f.off.length;i++){
                    var o= f.off[i];
                    if(offset>= o.offset){
                        if(o.scroll < o.offset && sTop<= top + he){
                            o.callback(ev);
                        }
                    }
                    o.scroll = offset;
                }
            }
            var y;
            var h= function(ev){
                var delay= parseInt(f.obj.data("delay"));
                if(!delay || isNaN(delay)){
                    delay=0;
                }
                if(delay==0){
                    return g(ev);
                }
                if(y){
                    clearTimeout(y);
                    y=undefined;
                }
                y=setTimeout(function(){
                    g(ev);
                }, delay);
            }
            w.bind("scroll", h);
            
            f.h=h;
            w.resize(function(){
                if(f.r){
                    clearTimeout(f.r);
                    f.r=undefined;
                }
                f.r= setTimeout(self.refresh, 100);
            });
            setTimeout(self.refresh, 100);
        }
        
        self.refresh= function(){
            var ev= vox.platform.createEvent("scroll");
            ev.scrollfire= self;
            ev.resize= true;
            f.h(ev);
        }
        
        self.bindOnOffset= function(offset, callback){
            f.off= {
                offset:offset, 
                callback:callback,
                scroll:-1
            };
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
    
    
    var j= function(obj){
        obj.voxscrollfire();
    }
    
    $.fn.voxscrollfire= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-scrollfire"))){
                t=new scrollFire(o);
                o.data("vox-scrollfire", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".scroll-fire");
        j($(".scroll-fire"));
        
    });
    
})();