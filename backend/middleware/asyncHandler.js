
// when promise is resolved, it will call next piece of middleware
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

export default asyncHandler