(function(){
    
    var jf= window.JF= window.JF || {};
    var jf_platform= function(){
        
        var self= this;
        var f= self.$={};
        self.initialPath= "/";
        self.groupQueue=true;
        
        
        var s=location.search.substring(1);
        var s= s.split("&");
        var h= {};
        for(var i=0;i<s.length;i++){
            if(s[i]){
                var h2= s[i].split("=");
                h[h2[0]]= h2[1];
            }
        }
        self.queryData= h;
        if(h.debug){
            self.groupQueue=false;
        }
        
        self.start= function(){
            
            $("form").each(function(){
                
                var f= $(this);
                var s= f.find(".sxl-button[type=submit]");
                if(s.length>0){
                    
                    if(s.attr("jf-submit-proccess")==undefined){
                        
                       s.attr("jf-submit-proccess","jf-submit-proccess");
                       if(s.is("a")){
                           s.click(function(){
                               return f.submit();
                           });
                       }
                    }
                    
                }
                
            }); 
            
            
        }
        
        self.finalizeQueue= function(){
            if(self.groupQueue){
                return self.specialQueue();
            }
            else{
                return self.queue();
            }
        }
        
        self.get= function(url, data, suceso, error, abort){
            return self.request("get", self.initialPath + url, data, suceso, error, abort);
        }
        
        self.post= function(url, data, suceso, error, abort){
            return self.request("post", self.initialPath + url, data, suceso, error, abort);
        }
        
        self.serialize= function(form){
            if(form.get(0).tagName!="FORM"){
                var f0= $("<form>");
                var d0=form.find("*");
                f0.append(d0.clone());
                form= f0;
            }
            return form.serialize();
        }
        
        self.serializeArray= function(form){
            if(form.get(0).tagName!="FORM"){
                var f0= $("<form>");
                var d0=form.find("*");
                f0.append(d0.clone());
                form= f0;
            }
            return form.serializeArray();
        }
        self.formRequest= function(form, suceso, error, abort){
            // FORM debe ser un objeto jQuery form ...
            var data=self.serialize(form);
            
            var method= "GET";
            if(form.attr("method")!==undefined){
                method=form.attr("method");
            }
            var url= form.attr("action");
            return self.request(method, self.initialPath + url, data, suceso, error, abort);
            
        }
        
        
        f.queue= [];
        self.queue_formRequest= function(form, voxdata, suceso, error, abort){
            
			if(typeof voxdata == "object"){
				if(voxdata.cancelprev){
					voxdata.ajax= self.formRequest(form, suceso, error, abort);
					return; 
				}
			}
		
			f.queue.push({
                form:form,
                suceso:suceso,
                error:error, 
                abort:abort,
                large:voxdata
            });
        }
        
        self.specialQueue= function(){
            
            if(f.queue.length<2){
                return self.queue();
            }
            
            var global=[];
            var g= function(form, suceso, error, abort){
                // FORM debe ser un objeto jQuery form ...
                var odata=self.serializeArray(form);
                var data={};
                for(var i=0;i<odata.length;i++){
                    data[odata[i].name] = odata[i].value;
                }
                
                var method= "GET";
                if(form.attr("method")!==undefined){
                    method=form.attr("method");
                }
                var url= form.attr("action");
                var o={
                    url:self.initialPath + url,
                    data:data,
                    method:method
                }
                global.push(o);
            }
            
            
            var d= f.queue;
            f.queue= [];
            var newd=[];
            d.forEach(function(o){
                //console.log(o);
                if(o.large){
                    setTimeout(function(){
                        self.formRequest(o.form, o.suceso, o.error, o.abort);    
                    }, 400);
                    
                }
                else{
                    newd.push(o);
                    g(o.form, o.suceso, o.error, o.abort);
                }
            });
            
            
            d= newd;
            
            if (global.length<1) {
                return; 
            }
            // ENVIAR SOLICITUD ...
            var sendData= JSON.stringify(global);
            var url= (jf.path||"/") + "platform/jsonresponses";
            sendData= "data=" + encodeURI(sendData);
            
            var s1= function(data){
                var i=0;
                data.forEach(function(data2){
                    
                    var error= data2?data2.error:null;
                    var op= error?"error":"suceso";
                    if(error){
                        data2= error;
                    }
                    if(d[i][op]){
                        try{
                            d[i][op](data2);
                        }
                        catch(e){
                            console.log("Excepción en ajax");
                            console.error(e);
                        }
                    }
                    i++;
                });
            }
            
            var e1= function(er){
                d.forEach(function(o){
                    if(o.error){
                        try{
                            o.error(er);
                        }
                        catch(e){
                            console.log("Excepción en ajax");
                            console.error(e);
                        }
                    }
                });
            }
            
            var a1= function(er){
                d.forEach(function(o){
                    if(o.abort){
                        try{
                            o.abort(er);
                        }
                        catch(e){
                            console.log("Excepción en ajax");
                            console.error(e);
                        }
                    }
                });
            }
            
            self.request("POST", url, sendData, s1, e1, a1, true);
            
        }
        
        
        self.queue= function(){
            var d= f.queue;
            f.queue= [];
            
            d.forEach(function(o){
                self.formRequest(o.form, o.suceso, o.error, o.abort);
            });
        }
        
        self.request= function(method, url, data, suceso, error, abort, literal){
            
            return $.ajax({
                url:location.origin + url,
                type:method,
                data:data,
                processData:literal?false:true,
                error:function(a,b,er){
                    if(b=="abort"){
                        if(abort){
                            abort();
                        }
                        return;
                    }
                    
                    
                    if(error){
                        error(new Error(er));
                    }
                },
                
                success:function(data){
                    
                    var xerror= data?data.error:null;
                    if(xerror){
                        if(error){
                            error(xerror);
                        }
                        return ;
                    }
                    
                    
                    if(suceso){
                        suceso(data);
                    }
                    
                }
                
            });
        }
        
        self.uniqid= function (prefix, more_entropy) {
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
                if (reqWidth < seed.length) { // so long we split
                  return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) { // so short we pad
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
              if (!this.php_js.uniqidSeed) { // init seed with big random int
                this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
              }
              this.php_js.uniqidSeed++;
            
              retId = prefix; // start with prefix, add current milliseconds hex string
              retId += formatSeed(parseInt(new Date()
                .getTime() / 1000, 10), 8);
              retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
              if (more_entropy) {
                // for more entropy we add a float lower to 10
                retId += (Math.random() * 10)
                  .toFixed(8)
                  .toString();
              }
            
              return retId;
            }
        
    }
    
    jf.platform = new jf_platform();
    $(function(){
        jf.platform.start();    
    });
    
    
})();