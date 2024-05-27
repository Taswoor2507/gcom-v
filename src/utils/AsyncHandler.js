const AsyncHandler = (handledFunction)=> (req,res,next)=> Promise.resolve(handledFunction(req,res,next).catch(next)
) 

export default AsyncHandler;