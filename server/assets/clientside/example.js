
$(function(){
	icevw.adquire({
		url:"example.zip",
		"uid":"10",
		"app":"vox.example.test"
	},function(er,d){
		if(er){return console.error(er)}
		console.log(d)

		// En este punto se adquirió el permiso ...
		icevw.func("novos.arguments")(function(er,data){
			if(er){return console.error(er)}
			console.log(data);
		});


	});	
});
