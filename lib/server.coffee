app=require "./app"
app.prepareHttpServer ()->
	require "./middleware"
	require "./gui"
	require "./api"
