function InvocationError(message, innerException, fileName, lineNumber) {
    var err = new Error();
	var stack="";
	if(innerException){
		this.innerException=innerException;
		if(!message){
			message=this.innerException.Message||this.innerException.message;

		}
		fileName=fileName|| innerException.Source;
		stack= "\n" +(this.innerException.StackTraceString||this.innerException.stack||"");

	}
	this.stack=stack;
    if (err.stack) {
        // remove one stack level:
        if (typeof(Components) != 'undefined') {
            // Mozilla:
            stack = stack.substring(stack.indexOf('\n')+1);
        }
        else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
            // Google Chrome/Node.js:
			//this.stack = stack.substring(stack.indexOf('\n')+1);
            stack = err.stack.replace(/\n[^\n]*/,'');
        }
        else {
            stack = "";
        }
		this.stack += "\n" +stack;
    }
    this.message    = message    === undefined ? err.message    : message;

    this.fileName   = fileName   === undefined ? err.fileName   : fileName;
    this.lineNumber = lineNumber === undefined ? err.lineNumber : lineNumber;
	//vw.info(this.stack);

}

InvocationError.prototype = new Error();
InvocationError.prototype.constructor = InvocationError;
InvocationError.prototype.name = 'InvocationError';
module.exports=InvocationError;
