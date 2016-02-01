

#jsonresponse= require "./jsonresponse"

app=require "./app"
router=app.getRouter()

###
async=(require "fake-async").create()
async.setevalfunction (str)->
	return eval str
###

## Adquirir permisos para ejecutar ICEVW

router.all "/test", (req,res)->
	app.theme.section "example",req,res


router.all "/require", (req,res)->

	data=if req.method=="GET" then req.query else req.body
	if not data.domain
		res.statusCode =500
		res.write "Debe especificar el dominio en el API"
		res.end()
		return
	dominio=data.domain
	vw.info dominio
	vw.log req.session
	if not req.session[dominio] or not req.session[dominio].md5hash
		adquire=require "./modules/adquire"
		adquire.enabled req,res, ()->
			data.hash=req.session[dominio].md5hash
			app.theme.section "requirir",req,res,data

		###
		res.statusCode =500
		res.write "El API no ha sido llamado de manera correcta"
		res.end()
		return
		###

	else
		data.hash=req.session[dominio].md5hash
		app.theme.section "requirir",req,res,data
