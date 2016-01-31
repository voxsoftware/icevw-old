
jsonresponse= require "./jsonresponse"
app=require "./app"
router=app.getRouter()
###
async=(require "fake-async").create()
async.setevalfunction (str)->
	return eval str
###


## Versión de icevw  ...
## James! 29-01-2016
router.all "/api/version", (req,res)->
	jsonresponse res, require "./version"

router.all "/api/enable", (req,res)->
	adquire=require "./modules/adquire"
	adquire.enable req,res,jsonresponse.func(res)


router.all "/api/load", (req,res)->
	reqapp=require "./modules/requireapp"
	reqapp.load req,res,jsonresponse.func(res)

router.all "/api/call", (req,res)->
	child=require "./modules/child"
	child.apicall req,res,jsonresponse.func(res)


router.all "/api/enabled", (req,res)->
	adquire=require "./modules/adquire"
	adquire.enabled req,res,jsonresponse.func(res)
