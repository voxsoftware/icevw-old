(function(){
    
    var modal= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        f.container= f.obj.parent();
        
        modal.modals.push(self);
        
        f.events= function(){
            
            vox.platform.attachEvents("keyup keydown", {
                active:self.isOpened,
                processEvent:function(ev){
                    ev.modal=self;
                    return ev;
                },
                self:self,
                callback:function(ev){
                    if(ev.keyCode==27 && ev.type=="keyup"){
                        if(!f.obj.data("escape-disabled")){
                            self.close();
                        }
                    }
                }
            });
            
            vox.platform.attachOuterClick(f.obj, {
                active:self.isOpened,
                processEvent:function(ev){
                    var ev2= vox.platform.createEvent("outerclick");
                    ev2.modal= self;
                    ev2.target= ev.target;
                    ev2.clickEvent= ev;
                    return ev2;
                },
                self:self,
                callback:function(ev){
                    if(!f.obj.data("closeonouterclick-disabled")){
                        self.close();
                    }
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
            ev.modal= self;
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
            
            modal.openBack();
            f.lEvent= ev2?ev2.type:"";
            f.obj.addClass("opened");
            f.container.show();
            f.obj.voxanimate(f.obj.data("ineffect")||"bounceInUp", undefined,function(){
                
                modal.checkOpened();
                
                var ev= vox.platform.createEvent("open");
                ev.modal= self;
                if(ev2){
                    ev.originalEvent= ev2;
                }
                self.trigger("open", ev);
                if(ev.defaultPrevented){
                    return; 
                }

            });
        }
        
        self.close= function(){
            
            var ev= vox.platform.createEvent("beforeclose");
            ev.modal= self;
            self.trigger("beforeclose", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            f.lEvent= undefined;
            f.obj.removeClass("opened");
            f.container.hide();
            f.obj.voxanimate(f.obj.data("outeffect")||"bounceOutDown", undefined,function(){
                
                modal.checkOpened();
                var ev= vox.platform.createEvent("close");
                ev.modal= self;
                self.trigger("close", ev);
            });
            
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
        
    };
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
    
    modal.openBack= function(){
        $("body").addClass("modal-opened");
        var m= $(".modal-back");
        if(m.length==0){
            m= $("<div>");
            m.addClass("modal-back");
            m.addClass("default");
            $("body").append(m);
        }
        m.show();
    }
    
    
    vox.modal= modal;
    var j= function(obj){
        obj.voxmodal();
    }
    
    $.fn.voxmodal= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-modal"))){
                t=new modal(o);
                o.data("vox-modal", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".modal");
        j($(".modal"));
        
        $("[data-toggle=modal]").click(function(){
           var e= $(this);
           var s= e.attr("vox-selector");
           var g= $(s).eq(0);
           var h= g.voxmodal()[0];
           if(h){
               h.open();
           }
        });
    });
    
})();