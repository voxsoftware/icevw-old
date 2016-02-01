# El MD5Hash es necesario para hacer las llamadas...
md5= require "md5"
uniqid= require "uniqid"
async=(require "fake-async").create()
async.setevalfunction (str)->
	return eval str




class Adquire
	enable: (req,res,callback)->
		try
			data=if req.method=="GET" then req.query else req.body
			if not data.domain
				throw new Error("Debe especificar el dominio")
			if not req.session[data.domain]
				req.session[data.domain]={}
			if req.session[data.domain].md5hash!=data.hash
				throw new Error("El token de comprobación no es válido")

			req.session[data.domain].enabled= true
			callback undefined,
				"enabled":true,
				"hash":req.session[data.domain].md5hash
		catch e
			return callback e


	enabled: (req,res,callback)->
		try
			data=if req.method=="GET" then req.query else req.body
			vw.info "Dominio", data.domain
			if not data.domain
				throw new Error("Debe especificar el dominio")
			if not req.session[data.domain]
				req.session[data.domain]={}
			hash=req.session[data.domain].hash= uniqid()
			req.session[data.domain].md5hash= md5 hash
			vw.log req.session
			callback undefined,
				"enabled":false,
				"domain":data.domain
				
		catch e
			return callback e


module.exports= new Adquire()
