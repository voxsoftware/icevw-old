(function(){
    
    var media= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        f.audio= obj.data("control");
		if(f.audio){
			f.audio= $(f.audio);
			f.audio= f.audio.get(0);
		}
        
        f.oplay= f.obj.find(".on-played");
		f.opause= f.obj.find(".on-paused");
		f.oprogressbar= f.obj.find(".progress-bar");
		f.oprogress= f.obj.find(".progress");
		
        f.events= function(){
            
			
			f.oplay.click(function(){
				f.audio.play();
			});
			
			f.opause.click(function(){
				f.audio.pause();
			});
			
            f.audio.addEventListener("playing",function(){
				f.opause.show();
				f.oplay.hide();
				f.progress();
			});
			
			f.audio.addEventListener("play",function(){
				f.opause.show();
				f.oplay.hide();
				f.progress();
			});
			
			f.audio.addEventListener("pause", function(){
				f.opause.hide();
				f.oplay.show();
				clearInterval(f.progress.i);
			});
			
			//f.audio.addEventListener("progress", function(){
			f.progress= function(){
				f.progress.i= setInterval(function(){
					var d= f.audio.duration;
					var t= f.audio.currentTime;
					var p= t*100/d;
					
					f.oprogress.css("width", p+"%");
				},1000);	
			}
				
				
			//});
            
			f.oprogressbar.click(function(ev){
				var w= f.oprogressbar.width();
				var x= ev.clientX;
				var p= x*100/w;
				//f.oprogress.width(p +"%");
				f.audio.currentTime= (f.audio.duration*p)/100;
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
        
        
        
        
        f.events();
        
    };
	
	/*
    var modals= modal.modals=[];
    modal.checkOpened=function(){
        var open;
        for(var i=0;i<modals.length;i++){
            open= open || modals[i].isOpened();
            if(open){
                break;
            }
        }
        if(!open){
            $("body").removeClass("modal-opened");
             $(".modal-back").hide();
        }
        else{
            $("body").addClass("modal-opened");
            $(".modal-back").show();
        }
        
    }
	*/
    
    
    vox.media= media;
    var j= function(obj){
        obj.voxmedia();
    }
    
    $.fn.voxmedia= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-media"))){
                t=new media(o);
                o.data("vox-media", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".media-controls");
        j($(".media-controls"));
        
		/*
        $("[data-toggle=modal]").click(function(){
           var e= $(this);
           var s= e.attr("vox-selector");
           var g= $(s).eq(0);
           var h= g.voxmodal()[0];
           if(h){
               h.open();
           }
        });
		*/
		
    });
    
})();