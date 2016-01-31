cluster=require "cluster"


if cluster.isMaster
	if vw.registerApp
	  vw.getApplicationsByName "voxsoftware.icevw version=1", (err, apps)->

	    if apps.length>0
	      pid= apps[0].pid
	      vw.info("La aplicación ya se está ejecutando en el proceso: " + pid)
	      process.exit 0

	    vw.registerApp "voxsoftware.icevw version=1", false, ()->
	      require "./app.coffee"

	else
	  require "./app.coffee"
else
	require "./app.coffee"
