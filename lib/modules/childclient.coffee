icew=undefined
require "./errorconfig"

class Icevw
	constructor: ()->
		@objs={}
	register: (name,obj)->
		@objs[name]= obj

	## LOs métodos son siempre asíncronos ...
	execute: (cmd)->
		name=cmd.method
		self=this
		[objname,method]=name.split(".")
		obj2=@objs[objname]
		if not obj2 or not obj2[method]
			@write new Error("No se encontró un método registrado para #{name}"),null, cmd
		try
			args= cmd.arguments or []
			m=obj2[method]
			if m.async
				args.push (er,data)->
					if er
						return self.write er,null,cmd
					return self.write null,data,cmd

				m.apply obj2, args
			else
				try
					value=m.apply obj2, args
					return self.write null,value,cmd
				catch e
					self.write e,null,cmd

		catch error
			@write error,null,cmd


	write: (er,data,cmd)->
		r={}
		if er
			r.error=er
		else
			r.value=data
		r.response=true
		r.commandid= cmd.commandid
		process.stdout.write(JSON.stringify(r)+"\n")


bufA=''
stdin= process.openStdin()
stdin.on "data", (buf)->

	p=(str)->
		res=undefined
		try
			res=JSON.parse str
		catch error
			return
		icevw.execute res


	str=buf.toString()
	if str.indexOf "\n" < 0
		bufA+=str

	else if bufA.length>0
		str=(bufA+=str)
		bufA=''

	lines=str.split("\n")
	lines.forEach p

global.icevw=module.exports=icevw=new Icevw()








lapp=process.argv[3]
require lapp
