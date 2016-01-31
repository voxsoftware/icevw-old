
/*!
 * Waves v0.7.2
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],function(){return b.apply(a)}):"object"==typeof exports?module.exports=b.call(a):a.Waves=b.call(a)}("object"==typeof global?global:this,function(){"use strict";function a(a){return null!==a&&a===a.window}function b(b){return a(b)?b:9===b.nodeType&&b.defaultView}function c(a){var b=typeof a;return"function"===b||"object"===b&&!!a}function d(a){return c(a)&&a.nodeType>0}function e(a){var b=m.call(a);return"[object String]"===b?l(a):c(a)&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&a.hasOwnProperty("length")?a:d(a)?[a]:[]}function f(a){var c,d,e={top:0,left:0},f=a&&a.ownerDocument;return c=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=b(f),{top:e.top+d.pageYOffset-c.clientTop,left:e.left+d.pageXOffset-c.clientLeft}}function g(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function h(a,b,c){if(c){c.classList.remove("waves-rippling");var d=c.getAttribute("data-x"),e=c.getAttribute("data-y"),f=c.getAttribute("data-scale"),h=c.getAttribute("data-translate"),i=Date.now()-Number(c.getAttribute("data-hold")),j=350-i;0>j&&(j=0),"mousemove"===a.type&&(j=150);var k="mousemove"===a.type?2500:o.duration;setTimeout(function(){var a={top:e+"px",left:d+"px",opacity:"0","-webkit-transition-duration":k+"ms","-moz-transition-duration":k+"ms","-o-transition-duration":k+"ms","transition-duration":k+"ms","-webkit-transform":f+" "+h,"-moz-transform":f+" "+h,"-ms-transform":f+" "+h,"-o-transform":f+" "+h,transform:f+" "+h};c.setAttribute("style",g(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},k)},j)}}function i(a){if(q.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(c.classList.contains("waves-effect")&&!(c instanceof SVGElement)){b=c;break}c=c.parentElement}return b}function j(a){q.registerEvent(a);var b=i(a);if(null!==b)if("touchstart"===a.type&&o.delay){var c=!1,d=setTimeout(function(){d=null,o.show(a,b)},o.delay),e=function(e){d&&(clearTimeout(d),d=null,o.show(a,b)),c||(c=!0,o.hide(e,b))},f=function(a){d&&(clearTimeout(d),d=null),e(a)};b.addEventListener("touchmove",f,!1),b.addEventListener("touchend",e,!1),b.addEventListener("touchcancel",e,!1)}else o.show(a,b),n&&(b.addEventListener("touchend",o.hide,!1),b.addEventListener("touchcancel",o.hide,!1)),b.addEventListener("mouseup",o.hide,!1),b.addEventListener("mouseleave",o.hide,!1)}var k=k||{},l=document.querySelectorAll.bind(document),m=Object.prototype.toString,n="ontouchstart"in window,o={duration:750,delay:200,show:function(a,b,c){if(2===a.button)return!1;b=b||this;var d=document.createElement("div");d.className="waves-ripple waves-rippling",b.appendChild(d);var e=f(b),h=a.pageY-e.top,i=a.pageX-e.left,j="scale("+b.clientWidth/100*3+")",k="translate(0,0)";c&&(k="translate("+c.x+"px, "+c.y+"px)"),"touches"in a&&a.touches.length&&(h=a.touches[0].pageY-e.top,i=a.touches[0].pageX-e.left),d.setAttribute("data-hold",Date.now()),d.setAttribute("data-x",i),d.setAttribute("data-y",h),d.setAttribute("data-scale",j),d.setAttribute("data-translate",k);var l={top:h+"px",left:i+"px"};d.classList.add("waves-notransition"),d.setAttribute("style",g(l)),d.classList.remove("waves-notransition"),l["-webkit-transform"]=j+" "+k,l["-moz-transform"]=j+" "+k,l["-ms-transform"]=j+" "+k,l["-o-transform"]=j+" "+k,l.transform=j+" "+k,l.opacity="1";var m="mousemove"===a.type?2500:o.duration;l["-webkit-transition-duration"]=m+"ms",l["-moz-transition-duration"]=m+"ms",l["-o-transition-duration"]=m+"ms",l["transition-duration"]=m+"ms",d.setAttribute("style",g(l))},hide:function(a,b){b=b||this;for(var c=b.getElementsByClassName("waves-rippling"),d=0,e=c.length;e>d;d++)h(a,b,c[d])}},p={input:function(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");c.className=a.className+" waves-input-wrapper",a.className="waves-button-input",b.replaceChild(c,a),c.appendChild(a);var d=window.getComputedStyle(a,null),e=d.color,f=d.backgroundColor;c.setAttribute("style","color:"+e+";background:"+f),a.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(a){var b=a.parentNode;if("i"!==b.tagName.toLowerCase()||!b.classList.contains("waves-effect")){var c=document.createElement("i");b.replaceChild(c,a),c.appendChild(a)}}},q={touches:0,allowEvent:function(a){var b=!0;return/^(mousedown|mousemove)$/.test(a.type)&&q.touches&&(b=!1),b},registerEvent:function(a){var b=a.type;"touchstart"===b?q.touches+=1:/^(touchend|touchcancel)$/.test(b)&&setTimeout(function(){q.touches&&(q.touches-=1)},500)}};return k.init=function(a){var b=document.body;a=a||{},"duration"in a&&(o.duration=a.duration),"delay"in a&&(o.delay=a.delay),n&&(b.addEventListener("touchstart",j,!1),b.addEventListener("touchcancel",q.registerEvent,!1),b.addEventListener("touchend",q.registerEvent,!1)),b.addEventListener("mousedown",j,!1)},k.attach=function(a,b){a=e(a),"[object Array]"===m.call(b)&&(b=b.join(" ")),b=b?" "+b:"";for(var c,d,f=0,g=a.length;g>f;f++)c=a[f],d=c.tagName.toLowerCase(),-1!==["input","img"].indexOf(d)&&(p[d](c),c=c.parentElement),c.className+=" waves-effect"+b},k.ripple=function(a,b){a=e(a);var c=a.length;if(b=b||{},b.wait=b.wait||0,b.position=b.position||null,c)for(var d,g,h,i={},j=0,k={type:"mousedown",button:1},l=function(a,b){return function(){o.hide(a,b)}};c>j;j++)if(d=a[j],g=b.position||{x:d.clientWidth/2,y:d.clientHeight/2},h=f(d),i.x=h.left+g.x,i.y=h.top+g.y,k.pageX=i.x,k.pageY=i.y,o.show(k,d),b.wait>=0&&null!==b.wait){var m={type:"mouseup",button:1};setTimeout(l(m,d),b.wait)}},k.calm=function(a){a=e(a);for(var b={type:"mouseup",button:1},c=0,d=a.length;d>c;c++)o.hide(b,a[c])},k.displayEffect=function(a){console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"),k.init(a)},k});
//# sourceMappingURL=waves.min.js.map


(function(){
    Array.prototype.each= Array.prototype.forEach;
    $(function(){
        Waves.attach('.button');
        Waves.init();
    });
    
    document.createElement("vox-css");
    document.createElement("vox-action");
    document.createElement("vox-object");
    document.createElement("vox-item");
    document.createElement("vox-bindevent");
    
    var vox= window.vox= window.vox||{};
    
    var platform= function(){
        var self= this;
        var f={};
        
        self.scrollObject= $(window);
        self.attachOuterClick= function(obj, pars){
            
            var self= pars.self;
            var isOpened= pars.active || function(){return true;}
            
            var y= function(ev){
                if(!isOpened()){
                    return;
                }
                
                
                var e= $(ev.target);
                if((ev.target!= obj.get(0)) && (obj.find(e).length==0)){
                
                    if(pars.processEvent){
                        ev=pars.processEvent(ev);
                    }
                    self.trigger("outerclick", ev);
                    if(ev.defaultPrevented){
                        return; 
                    }
                    if(pars.callback){
                        pars.callback(ev);
                    }
                }
                
            }
            $(document).bind("click", y);
            
        }
        
        self.attachEvents= function(events, pars){
            
            var self= pars.self;
            var isOpened= pars.active || function(){return true;}
            
            var y= function(ev){
                if(!isOpened()){
                    return;
                }
                if(pars.processEvent){
                    ev=pars.processEvent(ev);
                }
                self.trigger(ev.type, ev);
                if(ev.defaultPrevented){
                    return; 
                }
                if(pars.callback){
                    pars.callback(ev);
                }
            }
            $(document).bind(events, y);
            
        };
        
        self.transition= function(obj, values, effect, time, cb){
            var callback= cb?cb:function(){};
            var st=[];
            for(var i in values){
                st.push(i);
            }
            
            obj.css("transition-property", st.join(","));
            if(time){
                var timec= (time/1000);
                timec= timec.toString() + "s";
                obj.css("transition-duration", timec);    
            }
            if(effect){
                obj.addClass(effect);
            }
            
            if(st.length==0){
                callback();
            }
            obj.css(values);
            
            obj.addClass("transitioned");
            
            setTimeout(function(){
                obj.removeClass("transitioned");
                if(effect){
                    obj.removeClass(effect);
                }
                callback();
            }, time);
        }
        
        self.animate= function(obj, effect, time, cb){
            
            callback= function(){
                if(hide){
                    obj.hide();
                }
                obj.removeClass(effect);
                if(cb){
                    cb();
                }
            }
            
            var hide;
            if(effect.toLowerCase().indexOf("out")>=0){
                
                hide= true;
                // Es efecto de salida ...
                if(!obj.is(":visible")){
                    return callback();
                }
            }
            else{
                if(obj.is(":visible")){
                    return callback();
                }
            }
            
            
            if(!obj.hasClass("animated")){
                obj.addClass("animated");    
            }
            if(obj.data("last-effect")){
                obj.removeClass(obj.data("last-effect"));
            }
            obj.removeClass(effect);
            obj.show();
            obj.addClass(effect);
            obj.data("last-effect", effect);
            
            if(!time){
                time= parseFloat(obj.css("animation-duration"));
                if(!time){
                    time= parseFloat(obj.css("-webkit-animation-duration"));    
                }
            }
            else{
                var s=(time/1000).toString() + "s";
                time /= 1000;
                obj.css({
                    "-webkit-animation-duration":s,
                    "animation-duration": s
                });
            }
            
            time= (time*1000) + 1;
            setTimeout(callback, time);
            
        }
        
        f.processRow= function(obj){
            obj.each(function(){
                var j= $(this);
                var col= j.find(">*");
                var cols=[];
                for(var i=0;i<col.length;i++){
                    cols.push(col.eq(i));
                }
                col.remove();
                for(var i=0;i<cols.length;i++){
                    j.append(cols[i]);
                }    
            });
        };
        
        if (document.createEvent) {
    		self.createEvent = function(name){
    	        var evt = document.createEvent("Event");
    	        evt.initEvent(name, true, true);
    	        return evt;
    	    }
    
        } else if (document.createEventObject) { 
        	// MSIE (NOT WORKING)
        	self.createEvent = function(name){
    	        var evt = document.createEventObject("Event");
    	        evt.type= name;
    	        return evt;
    	    }
            
        }
        
        f.bodySize= function(){
            var w= parseInt($(window).width());
            var s;
            
            if(w<560){
                s= "s";
            }
            else if(w<800){
                s= "sl";
            }
            else if(w<1024){
                s= "m";
            }
            else if(w<1200){
                s= "ml";
            }
            else{
                s= "l";
            }
            var b=$("body");
            b.removeClass("size-s");
            b.removeClass("size-sl");
            b.removeClass("size-m");
            b.removeClass("size-ml");
            b.removeClass("size-l");
            b.addClass("size-"+ s);
        }
        
        f.processScript= function(script){
            script.each(function(){
                try{
                    var s= $(this); 
                    var p= s.attr("vox-name")|| "value";
                    var f= eval(s.text());
                    f.script= s;

                    if(p){
                        s.parent().data(p, f);    
                    }
                    
                    if(s.attr("vox-auto")!=undefined){
                        f(s);
                    }
                }
                catch(e){
                    console.log("Error al procesar script");
                    console.error(e);
                }
            });
        }
        f.processObjects= function(obj2){
            obj2.each(function(){
                
                var obj= $(this);
                if(obj.find("vox-object").length>0){
                   f.processObjects(obj.find("vox-object"));
                }
                var o={};
                if(obj.data("vox-processed")){
                    return;
                }
                obj.find(">vox-item").each(function(){
                    var g= $(this);
                    var n= g.attr("vox-name");
                    if(n){
                        o[n]= g.data("value");
                    }
                });    
                var v=obj.attr("vox-name") || "value";
                obj.parent().data(v, o);
                obj.data("vox-processed", true);
                
            });
        }
        
        
        f.processAction= function(obj){
            obj.each(function(){
                var c= $(this);
                var s= c.attr("vox-selector");
                var v= c.data("value");
                var p= c.parent();
                
                var u= function(k){
                    k.each(function(){
                       v($(this));
                    });
                }
                u(p.find(s));
                
                vox.mutation.watchAppend(p, function(ev){
                    u(ev.jTarget);
                }, s);
                
            });
        }
        f.processCss= function(css){
            css.each(function(){
                var c= $(this);
                if(c.attr("vox-type")=="class"){
                    var s= c.attr("vox-selector");
                    var v= c.data("value");
                    
                    var p= c.parent();
                    p.find(s).addClass(v);
                    
                    vox.mutation.watchAppend(p, function(ev){
                        ev.jTarget.addClass(v);
                    }, s);
                }
                else if(c.attr("vox-type")=="style"){
                    var s= c.attr("vox-selector");
                    var v= c.data("value");
                    
                    var p= c.parent();
                    p.find(s).css(v);
                    
                    vox.mutation.watchAppend(p, function(ev){
                        ev.jTarget.css(v);
                    }, s);
                }
            });
        }
        
        self.merge= function(obj1, obj2){
            return $.merge(obj1, obj2);
        }
        
        f.processChipAction= function(obj){
            obj.click(function(){
                $(this).parents(".chip").eq(0).remove();
            });
        }
        
        f.processBindEvent= function(obj2){
            console.log(obj2);
			obj2.each(function(){
				var obj= $(this);
				var name= obj.attr("vox-name");
                console.log(name);
				obj.parent().bind(name, function(ev){
					var fu= obj.data("value");
					if(fu.call){
						fu(ev);
					}
				});
			});
            
        }
        
        self.start= function(){
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processRow(ev.jTarget);
            } , ".row");
            f.processRow($(".row"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processScript(ev.jTarget);
            } , "script[lang=vox]");
            f.processScript($("script[lang=vox]"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processObjects(ev.jTarget);
            } , "vox-object");
            f.processObjects($("vox-object"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processCss(ev.jTarget);
            } , "vox-css");
            f.processCss($("vox-css"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processAction(ev.jTarget);
            } , "vox-action");
            f.processAction($("vox-action"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processChipAction(ev.jTarget);
            } , ".chip .action");
            f.processChipAction($(".chip .action"));
            
            vox.mutation.watchAppend($("body"),function(ev){
                return f.processBindEvent(ev.jTarget);
            } , "vox-bindevent");
            f.processBindEvent($("vox-bindevent"));
            
            var re= function(){
                if(re.y){
                    clearTimeout(re.y);
                    re.y=undefined;
                }
                re.y= setTimeout(function(){
                    $(".window-height").height($(window).height());
                }, 100);
                f.bodySize();
            }
            $(window).resize(re);
            re();
            
        }
    }
    
    var mutation= function(){
        var self= this;
        var f={};
        
        self.watchAppend= function(obj, callback2, filter){
            var callback=function(ev){
                var j1= ev.jTarget.not("[vox-watched]");
                var j2= ev.jTarget.is("[vox-watched]");
                
                ev.moved= true;
                ev.jTarget= j2;
                if(j2.length>0){
                    callback2(ev);
                }
                
                ev.moved= false;
                ev.jTarget= j1;
                if(j1.length>0){
                    callback2(ev);
                }
                
                j1.attr("vox-matched","");
            };
            obj.bind("DOMNodeInserted", function(ev){
                var inserted= $(ev.target);
                var v=true;
                
                if(filter){
                    var all= inserted.find("*");
                    all= all.filter(filter);
                    
                    if(all.length>0){
                        ev.jTarget= all;
                        callback(ev);
                    }
                }  
                
                
                if(filter){
                    if(!inserted.is(filter)){
                        v=false;
                    }
                }
                
                if(v){
                    ev.jTarget= inserted;
                    callback(ev);
                }
                
            });
        }
        
    }
    
    
    vox.platform= new platform();
    vox.mutation= new mutation();
    
    $.fn.voxanimate= function(effect, time, callback){
        vox.platform.animate(this, effect, time, callback);
    }
    $.fn.voxtransition= function(values,effect, time, callback){
        vox.platform.transition(this, values, effect, time, callback);
    }
    $(function(){
        if (window.voxpreinit) {
            window.voxpreinit();
        }
        vox.platform.start();    
    });
    
    
})();


