cp= require "child_process"
require "./errorconfig"
InvocationError=require "../InvocationError"
class Child
	constructor: (uniqid,path)->
		@bufA=''
		@uid=uniqid
		@path=path
		@callbacks={}
		Child.d[uniqid]=@
	remove: ()->
		delete Child.d[@uid]

	setCallback: (callback,id)->
		@callbacks[id]= callback

	send: (obj)->
		str=JSON.stringify(obj)+"\n"
		@p.stdin.write str

	execute: (method,args, callback)->
		self=this
		self.datareceived=true
		if method=="??"
			return
		id=(Child.id++)
		arg=
			"arguments":args,
			"method":method,
			"commandid":id

		self.setCallback callback,id
		self.send arg



	init: (callback)->
		try
			arg=process.argv
			self=this
			self.inited=true
			file= __dirname+"/childclient.coffee"
			@p=p=cp.spawn(arg[0], [arg[1],  file, @path])
			p.stdin.setEncoding "utf8"
			p.stdout.on "data", (data)->
				self.handleResponse(data);
			p.stderr.on "data", (data)->
				vw.error data.toString()

			@t= setInterval ()->
				if self.datareceived
					self.datareceived=false
				else
					# Cerrar el proceso ...
					# Esto ocurre cuando lleva tiempo inactivo 1 MINUTO ...
					self.p.kill()
					clearInterval self.t
					vw.warning "El proceso con uid:#{self.uid} fue terminado por inactividad"
					self.remove()

			, 30000
			self.datareceived=true

			# process.openStdin()
			callback()
		catch e
			return callback e

	handleResponse: (buf)->
		self=this
		str=buf.toString("utf8")
		p=(str)->
			return undefined if !str
			res=null
			try
				res=JSON.parse str
			catch e
				vw.log str
				return

			return if not res?.response
			# vw.log res
			id=res.commandid
			f=self.callbacks[id]
			self.callbacks[id]=undefined
			er=undefined
			val=undefined
			if res.error
				er=new InvocationError(null,res.error)

			val= res.value

			if typeof f == "function"

				f er,val
			else
				console.log("No fue suministrado un callback para el comando " +id)

		if str.indexOf "\n" < 0
			self.bufA+=str

		else if self.bufA.length>0
			str=(self.bufA+=str)
			self.bufA=''


		lines=str.split("\n")
		lines.forEach p


Child.apicall= (req, res, callback)->
	try
		self=this
		data=if req.method=="GET" then req.query else req.body
		if not data.uid
			throw new Error("Debe especificar el uid de la aplicación")
		uid=data.uid
		child=Child.get uid
		if not child.inited
			Child.d[uid]=undefined
			throw new Error("El uid de la aplicación no es válido")
		child.execute data.method, if data.arguments then JSON.parse(data.arguments) else null, callback
	catch e
		return callback e

Child.id=0
Child.d={}
Child.get= (uniqid,path)->
	if not e=Child.d[uniqid]
		e= new Child(uniqid,path)
	return e



module.exports= Child
