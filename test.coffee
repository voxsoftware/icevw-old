child=require "./lib/modules/child"
ch= new child "A1", __dirname+"/test2"
ch.init ()->
	ch.execute "novos.james", undefined, (er,data)->
		return vw.error er.stack if er
		vw.info args
