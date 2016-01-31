(function(){
    
    var tab= function(obj){
        
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        f.a= f.obj.find("a");
        
        
        
        f.gethref= function(){
            var href= f.a.attr("href");
            if(href){
                href= $(href);
                f.href= href;
                
            }
            
            return f.href;
        }
        
        self.unselect= function(){
            
            var a0= f.a;
            
            var ev= vox.platform.createEvent("beforeunselect");
            ev.tab= self;
            ev.jTarget= a0;
            
            self.trigger("beforeunselect", ev);
            if(ev.defaultPrevented){
                return false; 
            }
        
            var ev= vox.platform.createEvent("unselect");
            ev.tab= self;
            ev.jTarget= a0;
            
            f.gethref().hide();
            if(f.parent){
                f.parent.$.removeindicator();
            }
            
            
            self.trigger("unselect", ev);
            if(ev.defaultPrevented){
                return; 
            }
            
            
            
        }
        
        self.select= function(){
            
            var a0= f.a;
            
            var ev= vox.platform.createEvent("beforeselect");
            ev.tab= self;
            ev.jTarget= a0;
            
            self.trigger("beforeselect", ev);
            if(ev.defaultPrevented){
                return false;
            }
        
            var ev= vox.platform.createEvent("select");
            ev.tab= self;
            ev.jTarget= a0;
            
            
            if(f.parent){
                if(f.parent.unselect()===false){
                    return false;
                }
            }
            f.gethref().show();
            if(f.parent){
                f.parent.$.addindicator(self);
            }
            
            
            self.trigger("select", ev);
            if(ev.defaultPrevented){
                return; 
            }
        }
        
        f.events= function(){
            f.a.click(function(ev){
                if(f.obj.attr("disabled")===undefined && f.a.attr("disabled")===undefined){
                    ev.preventDefault();
                    self.select();
                    
                }
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
            if(f.parent){
                f.parent.trigger(name, ev);
            }
        }
        
        self.on= function(name, ev){
            var g= f.ev[name]= f.ev[name]||[];
            g.push(ev);
        }
        
        f.gethref().hide();
        f.events();
        
    }
    
    var tabs= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        f.ev={};
        f.obj= obj;
        f.tabs=[];
        
        // 
        f.indicator= f.obj.find(".indicator");
        if(f.indicator.length==0){
            f.indicator= $("<div>");
            f.indicator.addClass("indicator");
            f.indicator.addClass("transitioned");
            //f.obj.append(f.indicator);
        }
        f.indicator.hide();
        
        f.events= function(){
            
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
            
        }
        
        self.isOpened= function(){
            //return f.menu.hasClass("active");
            return true;
        }
        
        f.removeindicator= function(){
            f.indicator.hide();
        }
        
        f.addindicator= function(tab){
            var o= f.lastTab;
            
            f.selectedTab= tab;
            f.lastTab= tab;
            var obj= tab.$.obj;
            var left= obj.position().left;
            f.indicator.show();
            
            if(f.tabs[0]){
                
                
                var nl=0;
                if(o){
                    nl = o.$.obj.position().left;
                }
                nl= nl.toString() + "px";
                
                f.indicator.css("left", nl);
                f.tabs[0].$.obj.append(f.indicator);
            }
            
            f.indicator.css("width", obj.outerWidth());
            f.indicator.voxtransition({
                left:left.toString() + "px"
            }, undefined, 1000, function(){
               
               f.indicator.css("left", 0);
               f.indicator.css("width", "100%");
               obj.append(f.indicator);
               
                
            });
            
        }
        
        
        
        self.unselect= function(){
            if(f.selectedTab){
                if(f.selectedTab.unselect()!== false){
                    f.selectedTab=undefined;
                }
            }
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
        
        var utab= f.obj.find(".tab");
        var i=0;
        utab.each(function(){
            var jtab= $(this);
            if(i==0){
                jtab.append(f.indicator);
            }
            
            var otab= new tab(jtab);
            jtab.attr("vox-index",i);
            otab.$.index=i;
            otab.$.parent = self;
            i++;
            f.tabs.push(otab);
            
        });
        
        
        f.events();
    };
    
    vox.tabgroup= tabs;
    var j= function(obj){
        obj.voxtabgroup();
    }
    
    $.fn.voxtabgroup= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-tabgroup"))){
                t=new tabs(o);
                o.data("vox-tabgroup", t);
            }
            dp.push(t);
        });
        return dp;
    }
    
    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".tabs");
        j($(".tabs"));
    });
    
})();