// James! 29-01-2016
// Archivo cliente iceVw
// Necesita jQuery
$(function(){
	var url="http://localhost:49672";
	var icevw,uniqid,icevwo={};
	var icevwfunc= function(name){
		this.name=name;
	}

	var hab=function(){
		if(hab.hab){
			return;
		}
		// Este código hace que la aplicación se mantenga abierta ...
		var jfunc=function(){
			icevw.post("api/call", {
				"method":"??",
				"uid": icevw.uid
			},function(){
				setTimeout(jfunc, 15000);
			},function(er){
				console.log("Ocurrió un error al tratar de mantener activo el proceso ICEVW");
				console.error(er);
				setTimeout(jfunc, 15000);
			});
			hab.hab=true;
		};
		setTimeout(jfunc, 15000);
	}
	uniqid=icevwo.uniqid= function (prefix, more_entropy) {
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



	icevw= function(){
		this.url=url;
		this.uid= uniqid();
		this.iframe=$("<iframe>");
		this.iframe.hide();
		this.funcs={};
		this.funcsd={};
		this.iframe.css("border","none");
		$("body").append(this.iframe);
		this.callbacks={};
		var self=this;
		window.addEventListener("message",function(event){
			console.log(event);
			if(event.origin==url){
				var data=JSON.parse(event.data);
				if(data.type=="icevw.notauthorized"){
					var er=new Error(data.error);
					er.type=data.type;
					self.iframe.hide();
					return this.callback(er);
				}
				else if(data.type=="icevw.adquireerror"){
					var er=data.error;
					if(!er.message){
						er=new Error(er);
					}
					er.type=data.type;
					self.iframe.hide();
					return this.callback(er);
				}
				else if(data.type=="icevw.adquiredandloaded"){
					self.iframe.hide();

					hab();
					return this.callback(undefined, data.data);
				}
			}
		});
	}

	icevw.prototype.get=function(url,data,suceso,error,abort,literal){
		return this.request("get",url,data,suceso,error,abort,literal);
	}
	icevw.prototype.post=function(url,data,suceso,error,abort,literal){
		return this.request("post",url,data,suceso,error,abort,literal);
	}

	icevw.prototype.request= function(method, url, data, suceso, error, abort, literal){
		if(url.substring(0,7)!="http://"&&url.substring(0,8)!="https://"&&url.substring(0,5)!="ws://"){
			url=icevw.url + "/"+url;
		}

		return $.ajax({
			url:url,
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


	icevwfunc.prototype.func= function(){
		var self=this;
		return function(){
			var args= Array.prototype.slice.call(arguments, 0, arguments.length-1);
			var callback= arguments[arguments.length-1];
			icevw.post(url+"/api/call", {
				"method":self.name,
				"arguments": args,
				"uid":icevw.uid
			}, function(data){
				return callback(undefined,data);
			}, function(er){
				return callback(er);
			});
		}
	}





	icevw.prototype.adquire= function(pars,callback){
		// app=> path:string, app:string, url:string, uid:string
		var self= this;
		icevw.post(self.url + "/api/enabled",{
			"domain":location.origin
		},function(){

			var url= pars.url||"";
			if(url.substring(0,7)!="http://"&&url.substring(0,8)!="https://"&&url.substring(0,5)!="ws://"){
				url=location.origin + "/"+url;
			}
			var spars=[];
			spars.push("domain=" + encodeURIComponent(location.origin));
			spars.push("&");
			spars.push("url=" + encodeURIComponent(url));
			spars.push("&");
			spars.push("uid=" + self.uid);
			spars.push("&");
			spars.push("app=" + pars.app);


			var iframe= self.iframe;
			iframe.attr("src",self.url+"/require?"+spars.join(""));
			iframe.css("width","100%");
			iframe.css("height","100%");
			iframe.css("position","fixed");
			iframe.css("top","0");
			iframe.css("left","0");
			iframe.css("z-index","99999");
			iframe.show();
			this.callback=callback;

		}, function(er){
			if(er){
				return callback(er);
			}
		});
	}


	// Ejecutar una función ...
	icevw.prototype.func= function(name){
		var e;
		if(e=this.funcs[name]){
			return e;
		}
		var e1;
		this.funcsd[name]=e1= new icevwfunc(name);
		this.funcs[name]=e=e1.func();
		return e;
	}


	window.icevw=icevw=new icevw();
});
