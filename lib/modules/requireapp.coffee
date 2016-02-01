
###
@author James Suárez
29-01-2016
Este módulo se encarga de cargar la aplicación
###
path=process.env.HOME || process.env.USERPROFILE
path += "/.icevw"
fs= require "fs-extra"
uniqid=require "uniqid"
decompress = require('decompress-zip')
request= require "request"
Child= require "./child"
if not fs.existsSync path
	fs.mkdirSync path

class Requireapp

	download: (app,url,callback)->
		c=undefined
		try


			id=uniqid()
			tpath= path + "/#{id}"
			file= path + "/#{id}.zip"
			rpath= path + "/#{app}"

			c=(er,d)->
				if er

					try
						fs.removeSync tpath
					catch error
						vw.warning error

					try
						fs.unlinkSync file
					catch error
						vw.warning error

					return callback er
				else
					try
						fs.unlinkSync file
					catch error
						vw.warning error

					
					fs.move tpath,rpath,(er)->
						return callback er if er
						return callback undefined, d


			vw.log url
			r=request.get { url: url, timeout: 60000}, (er,response,body)->
				return c er if er

				if response.statusCode==404
					return c new Error("La url de la aplicación no es válida")

				# Descomprimir ....
				unzipper = new decompress(file)
				unzipper.on "error", (er)->
					return c er

				unzipper.on 'extract', (log)->
					vw.log rpath
					return c undefined, rpath

				unzipper.extract
					"path":tpath

			r.pipe fs.createWriteStream(file)

		catch e
			if c
				return c e
			return callback e




	# Este módulo lo que hace es cargar la aplicación ya sea que se encuentre ya en el equipo
	# o descargando desde la URL ...
	load: (req, res, callback)->
		try
			self=this
			data=if req.method=="GET" then req.query else req.body
			if not data.app
				throw new Error "Debe especificar el id de la aplicación"

			if not data.url
				throw new Error "Debe especificar la url de la aplicación"

			if not data.uid
				throw new Error "El API no es compatible. Debe especificar un id alfanúmerico"

			dir= path + "/" + data.app

			## La aplicación está lista ...
			f= (er)->
				return callback er if er
				child=Child.get data.uid, dir
				child.init (er)->
					return callback er if er
					callback undefined,true

			vw.info fs.existsSync dir
			if not fs.existsSync dir
				self.download data.app,data.url,f
			else
				f()


		catch e
			return callback e

module.exports= new Requireapp()
