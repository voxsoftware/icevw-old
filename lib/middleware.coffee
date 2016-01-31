
app= require "./app"
session = require('express-session')
FileStore = require('vw-session-file-store')(session)
router= app.getRouter()
path=process.env.HOME || process.env.USERPROFILE
path += "/.icevw"
fs=require "fs-extra"
if not fs.existsSync path
	fs.mkdirSync path
path += "/sessions"
if not fs.existsSync path
	fs.mkdirSync path


SES = session
	store: new FileStore({
		"path": path,
		"fallbackSessionFn": (sesionid)->
			arg=
				"cookie":{}

			fs.writeFileSync path+"/#{sesionid}.json", JSON.stringify(arg)
			return arg
	}),
	secret: '49671234',
	resave: true,
	ttl: 6000000000,
	saveUninitialized: true,
	cookie:{
		maxAge: 6000000000
	}



router.use SES
