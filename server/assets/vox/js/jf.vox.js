$(function(){
   
   var jf=window.JF;
   var vox= window.vox = window.vox||{};
   
   
   
   
   var vox_platform= function(){
       
       var self= this;
       var f= self.$={};
       f.hovercards={};
       f.ajaxloading= 0;
       f.ajaxObjects={};
       
       $.fn.vox_ajaxsend= function(callback, callbackEr){
           
           if(f.queueI){
               clearTimeout(f.queueI);
               f.queueI=undefined;
           }
           
           this.each(function(){
               var g= $(this);
               
               if(g.is(".ajax-loading")){
                   g= g.find(".ajax");
               }
               f.sendAjax(g, callback, callbackEr);
           });
           
           // NO ENVÍA DE UNA VEZ ...
           f.queueI= setTimeout(function(){
                jf.platform.finalizeQueue();    
           }, 300);
           
       }
       
       $.fn.vox_getajaxloading= function(){
           var o;
           this.each(function(){
               var g= $(this);
               var k= g.attr("vox-ajax-loading-id");
               if(!k){
                   console.log(g.parents(".from-ajax-loading"));
                   k= g.parents(".from-ajax-loading").eq(0).attr("vox-ajax-loading-id");
               }
               if(k){
                   if(!o){
                       o= $("#"+k);
                   }
                   else{
                       o= o.add($("#"+k));
                   }
               }
           });
           return o;
       }
       
       
       self.uniqid= function(prefix, more_entropy) {
          //  discuss at: http://phpjs.org/functions/uniqid/
          // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          //  revised by: Kankrelune (http://www.webfaktory.info/)
          //        note: Uses an internal counter (in php_js global) to avoid collision
          //        test: skip
          //   example 1: uniqid();
          //   returns 1: 'a30285b160c14'
          //   example 2: uniqid('foo');
          //   returns 2: 'fooa30285b1cd361'
          //   example 3: uniqid('bar', true);
          //   returns 3: 'bara20285b23dfd1.31879087'
        
          if (typeof prefix === 'undefined') {
            prefix = '';
          }
        
          var retId;
          var formatSeed = function(seed, reqWidth) {
            seed = parseInt(seed, 10)
              .toString(16); // to hex str
            if (reqWidth < seed.length) {
              // so long we split
              return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) {
              // so short we pad
              return Array(1 + (reqWidth - seed.length))
                .join('0') + seed;
            }
            return seed;
          };
        
          // BEGIN REDUNDANT
          if (!this.php_js) {
            this.php_js = {};
          }
          // END REDUNDANT
          if (!this.php_js.uniqidSeed) {
            // init seed with big random int
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
          }
          this.php_js.uniqidSeed++;
        
          // start with prefix, add current milliseconds hex string
          retId = prefix;
          retId += formatSeed(parseInt(new Date()
            .getTime() / 1000, 10), 8);
          // add seed hex string
          retId += formatSeed(this.php_js.uniqidSeed, 5);
          if (more_entropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10)
              .toFixed(8)
              .toString();
          }
        
          return retId;
        }
       
       f.sendAjax= function(a, callback, callbackEr){
           var lo=a.parents(".ajax-loading").eq(0);
           var vox_data=a.data("vox");
		   
		   
           if(vox_data){
			   if(!vox_data.multiple){
				   if(vox_data.loading){				   
					   return; // Ya enviado ...
				   }
			   }
			   
				if(vox_data.timeout){
                   clearTimeout(vox_data.timeout);
                   vox_data.timeout=undefined;
				}
			   
				if(vox_data.cancelprev){
					if(vox_data.ajax){
						try{
							vox_data.ajax.abort();
							vox_data.ajax=undefined;
						}
						catch(e){
							console.error(e);
						}
					}
				}
               
               
           }
           else{
               vox_data= {
                   loading:true,
                   callback:callback,
				   multiple: lo.attr("vox-multiple") !== undefined,
				   cancelprev: lo.attr("vox-cancelprev")!== undefined
               };
               a.data("vox", vox_data);
           }
           
           var largeLoading= lo.attr("vox-large-loading")!=undefined;
           jf.platform.queue_formRequest(a.find("form,.form").eq(0), vox_data, function(data){
                   
               // En este caso el data es HTML ...
               var d= $("<div>");
               d.html(data);
               var code= d.find(".code");
               var r= d.find(">*");
               
               if(lo.attr("vox-replace")!=undefined){
                   if(lo.data("vox-ajaxobjects")){
                       lo.data("vox-ajaxobjects").remove();
                   }
               }
               
               if(!lo.attr("id")){
                   lo.attr("id", "vox-ajax-loading-" + jf.platform.uniqid() + f.ajaxloading);
                   f.ajaxloading++;
               }
               
               r.addClass("from-ajax-loading");
               r.attr("vox-ajax-loading-id", lo.attr("id"));
               
               
               
               
               // Filtrar los que se reemplazan ...
               r.filter(".vox-replace").each(function(){
                    var p= lo.parent();
                    var q= $(this);
                    var idf= q.attr("vox-identifier");
                    var ob= p.find(">*[vox-identifier="+idf+"]");
                    ob.remove();
               });
               
               if(lo.attr("vox-prev")!=undefined){
                    r.insertBefore(lo);
               }
               else{
                    r.insertAfter(lo);
               }
               lo.hide();
               lo.data("vox-ajaxobjects", r);
               //f.ajaxObjects[lo.attr("id")]= r;
               
               if(code.length>0){
                    try{
                        
                        var thisF= eval(code.text());
                        console.log(thisF);
                        thisF(lo, r, code);
                    }
                    catch(e){
                       console.log("Error ejecutando código fuente del ajax");
                       console.error(er);
                   }
               }
               if(!jf.platform.queryData.debug){
                   code.remove();
               }
               
               vox_data.loading= false;
               self.start(r);
               if(callback){
                   try{
                        callback();  
                   }
                   catch(e){
                       console.log("Error ejecutando el callback de los objetos ajax send");
                       console.error(er);
                   }
               }
               
               
               
               if(lo.attr("vox-timeout")){
                   var voxt= parseInt(lo.attr("vox-timeout"));
                   if(voxt>0){
                       vox_data.timeout= setTimeout(function(){
                            a.vox_ajaxsend();   
                       }, voxt);
                   }
               }
           }, function(er){
               if(callbackEr){
                   callbackEr(er);
               }
           });
       }
       
       f.started= [];
       self.started= function(d){
           f.started.push(d);
       }
       
       self.ui= function(){
           $(document).click(function(e){
               var p= $(e.target);
               var nf= $(".notification-container");
               if(!p.is(".notifications, .notifications *, .notification-open, .notification-open *")){
                   nf.slideUp();
               }
           });
       }
       
       
       self.start= function(context){
           var obj;
           
           obj= context?context.find("form, .form"):$("form, .form");
           obj.each(function(){
                var g= $(this); 
                if(!g.attr("id")){
                    g.attr("id", "form-"+ jf.platform.uniqid());
                    g.attr("name", "form-"+ jf.platform.uniqid());
                    
                    var sp= g.find("span.input");
                    sp.each(function(){
                        var t2= $(this);
                        var t1= $("<input>");
                        t1.attr("name", t2.attr("name"));
                        t1.val(t2.attr("value"));
                        g.append(t1);
                    });
                }
           });
           
           obj=context?context.find("a.load-more, .load-more"):$("a.load-more, .load-more a");
           obj.click(function(){
                var a= $(this);
                if(!a.is(".load-more")){
                    a= a.parents(".load-more").eq(0);
                }
				
                var lo;
				if(a.attr("vox-ajax-loading")){
					lo= $(a.attr("vox-ajax-loading"));
				}
				else{
					lo=a.parent().find(">.ajax-loading[vox-load-more]");
				}
                lo.show();
                lo.vox_ajaxsend();
           });
           
           
           
           
           obj=context?context.find(".ajax-loading"):$(".ajax-loading");
           obj= obj.not("[vox-noauto]").find(".ajax");
           obj.vox_ajaxsend();
           
           
           obj=context?context.find(".a-like"):$(".a-like");
           obj.click(function(){
               
               
               var e= $(this);
               var url= e.attr("data-like");
               jf.platform.get(url, null, function(){
                   
                   var po=e.parents(".post-options").eq(0);
                   /*
                   var ajax= po.parent().parent().find(".ajax-loading");
                   ajax.show();
                   ajax.find("a.ajax").vox_ajaxsend();
                   */
                   
                   var ajax= po.vox_getajaxloading();
                   ajax.show();
                   ajax.vox_ajaxsend();
                   
                   po.remove();
                   
                   
               }, function(er){
                   console.error("Error al dar me gusta");
                   console.error(er);
               });
               
           });
           
           
           
           
           
           
           obj= context?context.find("[vox-type=geolocation]"):$("[vox-type=geolocation]");
           self.getGeolocation(obj);
           
           
           f.started.forEach(function(d){
               d(context);
           });
           
       }
       
       self.getGeolocation= function(l){
           self.geolocation(function(location){
               
                l.each(function(){
                   var o= $(this);
                   var n= o.attr("vox-name");   
                   var d=location.coords[n];
                   o.val(d);
               });    
           });
       }
       $.fn.getGeolocation= function(){
           self.getGeolocation(this);
       }
       
       self.geolocation= function(sucess, error){
           if(navigator.geolocation){
               navigator.geolocation.getCurrentPosition(function(data){
                   if(sucess){
                       sucess(data);
                   }
               }, function(er){
                   if(error){
                       error(er);
                   }
                   else{
                       console.log("Error en localización");
                       console.error(er);
                   }
               });
           }
       }
       
       
      
       
   }
   vox.server= new vox_platform();
   vox.server.ui();
   vox.server.start();

});