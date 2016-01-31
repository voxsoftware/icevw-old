(function(){
    
    var parallax= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        f.img= f.obj.find(".img");
        parallax.objects.push(self);
        parallax.id= parallax.id || 0;
        parallax.id++;
        f.id= parallax.id;
        
        f.scrollfire= f.obj.voxscrollfire()[0];
        
        
        
        f.events= function(){
            var g= function(ev){
                
                var h= $(window).height();
                var hi= f.obj.outerHeight();
                var maxRange= h+hi;
                var off= ev.offset;
                
                f.img.css("top", - ((f.img.height() * 80/100)) + "px");
                var percent= (off*100) / maxRange;
                
                var translate= 80* percent/ 100;
                translate= (f.img.height()* translate)/100;
                var factor= parseFloat(f.obj.data("factor"));
                if(!factor || isNaN(factor)){
                    factor= 1.24;
                }
                translate*=  factor;
                f.img.css("transform", "translate3d(0, " + translate.toString()+ "px, 0)");
                
            };
            f.scrollfire.on("scroll", g);    
            f.scrollfire.refresh();
            $(window).resize();
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
    
    var oparallax= parallax.objects=[];
    
    
    
    //vox.parallax= parallax;
    var j= function(obj){
        obj.voxparallax();
    }
    
    $.fn.voxparallax= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-parallax"))){
                t=new parallax(o);
                o.data("vox-parallax", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".parallax");
        j($(".parallax"));
        
    });
    
})();