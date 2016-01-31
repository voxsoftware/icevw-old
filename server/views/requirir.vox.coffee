@comment "Este archivo es la vista para requerir los permisos para ejecutar ICEVW"
<?section:content:
@include "require-modal",pars
<script type='text/vox' lang='vox' vox-auto>
	(function(){
		var f= function(){
			$(".modal").voxmodal()[0].open();
			$(".modal form input[name=hash]").val({{JSON.stringify(pars.hash)}});
			$(".modal form input[name=domain]").val({{JSON.stringify(pars.domain)}});
			f.script.remove();
		}
		return f;
	})();
</script>
:end?>
@include "master",pars
