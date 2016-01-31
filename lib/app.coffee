vwserver= require "vw-server"
port= 49672
global.app=module.exports= app= new vwserver
	"workercount":0,
	"path": __dirname+"/..",
	"theme": "server"


#console.log process.argv
if app.isworker
	## Register functions
	require "./server"
else
	# pass





app.nogui=true
app.start port
if app.ismaster
	vw.log "ICEVW ha sido iniciado. Puerto #{port}"
