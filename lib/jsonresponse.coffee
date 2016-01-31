jsonresponse = (res, data) ->
  res.writeHead 200, 'Content-type': 'application/json; Charset=utf8'
  data=JSON.stringify(data,null, 4)
  if not data
  	data= ""
  res.write data
  res.end()
  return

jsonresponse.func=(res)->
	return (er,data)->
		return jsonresponse.error(res,er) if er
		return jsonresponse(res,data)


jsonresponse.error = (res, error) ->
  jsonresponse res, error: error

module.exports = jsonresponse
