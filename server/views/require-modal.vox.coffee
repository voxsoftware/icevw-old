<?section:a:
<a href="#!" class="waves-effect gray hover text-white button"></a>
:end?>
<?section:as:
<?
num=Math.random()*100|0
for i in [0...num]
	vox.section "a"
?>
:end?>

<div style='position:fixed;top:-100000px;'>
{{vox.section('as')}}
</div>
<div class='modal-back black'></div>
<div class='modal-container flow-text'>
    <div class='modal s10 ml7 m8 shadow-3' data-escape-disabled='true' data-closeonouterclick-disabled='true'>

        <div class='modal-content'>
            <!--<h4>ICEVW</h4>-->

			<div class='' style='padding:70px 40px;padding-bottom:40px'>
				<div class='text-center logo'>
					<span class='text-cyan'>ICE</span><span class='text-pink'>VW<span style='font-size:0.3em;vertical-align:top;'>™</span></span>
				</div>
				<div class='container fluid text-center  text-gray darken-2 load ' style='font-size:1.3em;display:none;'>
					<br><br>
					<i class='fa fa-spin fa-spinner'></i> Cargando
				</div>
			</div>

			<p class='text-justify'>
				La página web <b class='text-pink'>{!pars.domain!}</b> quiere ejecutar ICEVW.
				Esto le permitirá acceder a los recursos de su equipo.
				Por favor haga clic en permitir solo si confía en esta página.
			</p>

		</div>
        <div class="modal-footer text-right">
			<form style='display:none;' action="{!global.app.url('api/enable')!}" method='POST'>
				<input value="" name='hash'/>
				<input name='domain'/>
			</form>
            <a href="#!" class="waves-effect cyan hover text-white button">Permitir
				<vox-bindevent vox-name='click'>
					<script type='text/vox' lang='vox'>
						(function(){
							JF.platform.formRequest($(".modal form"),function(data){
								window.parent.postMessage(JSON.stringify({
									"type":"icevw.adquired",
									"data": data
								}), location.origin);


								$(".modal .load").show();
								//#$(".modal a").attr("disabled","disabled");
								//#$(".modal a").addClass("gray");
								$(".modal a").hide();
								//#return;

								// # Load app
								var parameters= {{JSON.stringify(pars)}};
								JF.platform.post("/api/load", parameters, function(data){

									window.parent.postMessage(JSON.stringify({
										"type":"icevw.adquiredandloaded",
										"data":data
									}), location.origin);

								},function(er){
									window.parent.postMessage(JSON.stringify({
										"type":"icevw.adquireerror",
										"error":er
									}), location.origin);
								});


							}, function(er){
								window.parent.postMessage(JSON.stringify({
									"type":"icevw.adquireerror",
									"error":er
								}), location.origin);
							});
						})
					</script>
				</vox-bindevent>
			</a>
            <a href="#!" data-action='close' class="waves-effect pink hover text-white button">No ejecutar
				<vox-bindevent vox-name='click'>
					<script type='text/vox' lang='vox'>
						(function(){
							$(".modal").voxmodal()[0].close();
							window.parent.postMessage(JSON.stringify({
								"type":"icevw.notauthorized",
								"error":"No fue autorizado para ejecutar ICEVW"
							}), location.origin);
						})
					</script>
				</vox-bindevent>
			</a>
        </div>
    </div>
</div>
