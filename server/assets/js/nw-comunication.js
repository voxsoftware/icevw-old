(function(){
	
	var nw= function(){
		var self= this;
		var f= self.$={};
		f.funcs= {};
		
		self.task= function(data, suceso, error){
			
			//var currentWindow= .get();
			var globalWindow= window.globalWindow;
			nw.id++;
			globalWindow.window.postMessage(JSON.stringify({
				id:nw.id,
				code:data
			}), "file:///");
			f.funcs[nw.id]= {
				suceso:suceso,
				error:error
			};
			
		}
		
		
		window.addEventListener("message", function(ev){
			//console.log(ev.data);
			var data= JSON.parse(ev.data);
			var id= data.id;
			
			
			var g=f.funcs[id];
			if(g){
				if(!data.success){
					if(g.error){
						g.error(data.error);
					}
				}
				else{
					if(g.suceso){
						g.suceso(data.data);
					}
				}
			}
			
		}, false);

		
		
	}
	nw.id= 0;
	window.nwPlatform= new nw();
})();