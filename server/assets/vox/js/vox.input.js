(function(){
    
    var input= function(obj){
        var self= this;
        var f= self.$= self.$||{};
        
        
        f.ev={};
        f.obj= obj;
        f.inp= obj.find("input");
        f.label= f.obj.find("label");
        f.label.addClass("normal");
        f.action= f.obj.find(".action");
        
        
        
        f.createSelect= function(){
            
            f.voxStyle= f.obj.find("vox-css[vox-func='input-style']");
            if(f.voxStyle.length==0){
                f.voxStyle= $('<vox-css vox-type="class" vox-func="input-style" vox-selector="li>a:not([disabled]>a)">');
            }
            var cl=[f.obj.data("activecolor")  + "-hover"];
            if(f.obj.data("activecolortext")){
                cl.push("text" + f.obj.data("select-activecolortext")  + "-hover");
            }
            else{
                cl.push("text-white-hover");
            }
            f.voxStyle.data("value", cl.join(" "));
            
            
            
            
            f.select= f.obj.find("select");
            f.sw= $("<div>");
            f.sw.addClass("select-wrapper");
            f.opw= $("<ul>");
            
            f.opw.addClass("text-"+f.obj.data("activecolor"));
            
            f.opw.addClass("options-wrapper")
            var i1= $("<input>");
            i1.attr("type","text");
            i1.attr("readonly","readonly");
            
            f.inp= i1;  
            var av= f.select.val();
            var caret= $("<i class='fa fa-caret-down select-down'></i>");
            
            f.select.css("position", "absolute");
            f.select.css("top", "80px");
            var val='';
            f.selectDVal= ' ';
            f.select.find("option").each(function(){
                var op= $("<li>");
                var e= $(this);
                var vv= e.val()||"";
                op.attr("value", vv);
                
                var a= $("<a>");
                a.data("value", vv);
                
                a.text(e.text());
                op.append(a);
                if(e.attr("disabled")!==undefined){
                    op.attr("disabled", "disabled");
                }
                if(vv==""){
                   f.selectDVal= e.text(); 
                }
                
                if(!av){
                    if(e.attr("selected")!==undefined && e.attr("disabled")===undefined){
                        op.attr("selected", "selected");
                        i1.val(e.text());
                        val=vv;
                    }
                }
                else{
                    if(vv==av){
                        op.attr("selected", "selected");
                        i1.val(e.text());
                        val=vv;
                    }
                }
                f.opw.append(op);
            });
            
            
            if(!val){
                i1.val(f.selectDVal);
            }
            
            f.sw.append(i1);
            f.sw.append(caret);
            f.sw.append(f.opw);
            f.sw.insertBefore(f.select);
            f.sw.append(f.voxStyle);
            
            
            //f.sw= f.obj.find(".select-wrapper");
            //f.opw= f.sw.find(".options-wrapper");
            f.opw.addClass("dropdown-menu");
            f.dropdown= f.sw.voxdropdown()[0];
            var h= function(){
                f.dropdown.toggle();
            };
            f.sw.find(".select-down").click(h);
            f.inp.click(h);
            f.label.click(h);
            
        }
        
        
        
        if(f.obj.is(".select")){
            f.createSelect();
        }
        
        f.refreshValue= function(){
            var v= f.select.val();
            f.opw.find("li").removeAttr("selected");
            f.opw.find("li>a").removeAttr("hover-active");
            if(!v){
                f.inp.val(f.selectDVal);
                return;
            }
            f.opw.find("li").each(function(){
                var l= $(this);
                if(l.attr("value")==v){
                    l.attr("selected", "selected");
                    l.find("a").attr("hover-active","hover-active");
                    f.inp.val(l.text());
                }
            });
        }
        f.events= function(){
            f.r= function(){
                if(f.inp.val() && f.inp.val().length>0 && f.inp.attr("type")!="search"){
                    f.label.addClass("active");
                }
                else{
                    f.label.removeClass("active");
                }
            }
            f.line= f.obj.find(".line");
            if(f.line.length==0){
                f.line= $("<div>");
                f.line.addClass("line");
                f.obj.append(f.line);
            }
            
            if(f.select){
                f.select.focus(function(ev){
                    f.inp.focus();
                });
                f.select.blur(function(ev){
                    f.inp.blur();
                });
                f.select.change(function(){
                    f.refreshValue();
                });
                
                f.dropdown.on("select", function(ev){
                    f.select.val(ev.value);
                    //f.refreshValue();
                    f.select.change();
                })
            }
            
            
            f.addactive= function(){
                if(f.inp.attr("type")!="search"){
                    f.label.addClass("active");
                    f.label.removeClass("normal");
                }
                f.obj.addClass("active");
            }
            
            f.inp.focus(function(ev){
                
                self.on("focus", ev);
                if(ev.defaultPrevented){
                    return;
                }
                
                f.addactive();

                var l;
                if(f.lineClass){
                    l= "text-" + f.lineClass;
                    f.line.removeClass(f.lineClass);
                    f.label.removeClass(l);    
                }
                
                f.lineClass= f.obj.data("activecolor");
                f.line.addClass(f.lineClass);
                l= "text-"+f.lineClass;
                
                f.label.addClass(l);
                
                
            });
            
            
            f.inp.blur(function(ev){
                self.on("blur", ev);
                
                if(ev.defaultPrevented){
                    return;
                }
                
                f.r();
                f.obj.removeClass("active");
                f.label.addClass("normal");
                
                if(f.lineClass){
                    l= "text-" + f.lineClass;
                    f.line.removeClass(f.lineClass);
                    f.label.removeClass(l);    
                }
                f.lineClass=undefined;
                /*
                f.line.removeClass(f.lineClass);
                f.label.removeClass(f.lineClass);
                f.lineClass= f.obj.data("activecolor");
                f.line.addClass(f.lineClass);
                f.label.addClass(f.lineClass);
                */
                
            });
            
            
        }
        
        
        self.ok= function(){
            var ok= vox.platform.createEvent("ok");
            ok.input= self;
            
            self.on("ok", ok);
            if(ok.defaultPrevented){
                return;
            }
            
            f.obj.removeClass("active");
            f.label.addClass("normal");
            if(f.lineClass){
                l= "text-" + f.lineClass;
                f.line.removeClass(f.lineClass);
                f.label.removeClass(l);    
            }
            f.lineClass=f.obj.data("ok-color");
            if(f.lineClass){
                f.line.addClass(f.lineClass);
            }
        }
        
        self.warning= function(){
            var warning= vox.platform.createEvent("warning");
            warning.input= self;
            
            self.on("warning", warning);
            if(ev.defaultPrevented){
                return;
            }
            
            f.obj.removeClass("active");
            f.label.addClass("normal");
            if(f.lineClass){
                l= "text-" + f.lineClass;
                f.line.removeClass(f.lineClass);
                f.label.removeClass(l);    
            }
            f.lineClass=f.obj.data("warning-color");
            if(f.lineClass){
                f.line.addClass(f.lineClass);
            }
        }
        
        self.error= function(){
            var error= vox.platform.createEvent("error");
            error.input= self;
            
            self.on("error", error);
            if(ev.defaultPrevented){
                return;
            }
            
            f.obj.removeClass("active");
            f.label.addClass("normal");
            if(f.lineClass){
                l= "text-" + f.lineClass;
                f.line.removeClass(f.lineClass);
                f.label.removeClass(l);    
            }
            f.lineClass=f.obj.data("error-color");
            if(f.lineClass){
                f.line.addClass(f.lineClass);
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
        
        
        
        f.events();
        f.r();
        
    };
    
    
    vox.input= input;
    var j= function(obj){
        obj.voxinput();
    }
    
    $.fn.voxinput= function(){
        var dp=[];
        this.each(function(){
            var o= $(this);
            var t=undefined;
            if(!(t=o.data("vox-input"))){
                t=new input(o);
                o.data("vox-input", t);
            }
            dp.push(t);
        });
        return dp;
    }

    
    var val= $.fn.val;
    var val2=function(){
        var v= val.apply(this, arguments);
        $.fn.val= val;
        this.each(function(){
            try{
                var e= $(this);
                e= e.parents(".input-field").eq(0);
                var input=e.data("vox-input");
                if (input){
                    input.$.r();
                }
            }
            catch(e){
                console.error(e);
            }
        })
        $.fn.val= val2;
        return v;
    }
    $.fn.val= val2;

    $(function(){
        vox.mutation.watchAppend($("body"), function(ev){
            j(ev.jTarget);
        }, ".input-field");
        j($(".input-field"));
        
    });
    
})();