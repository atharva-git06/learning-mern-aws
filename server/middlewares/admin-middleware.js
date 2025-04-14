const adminMiddleware = async (req,res,next) => {


    try {

        const isAdmin = req.user.isAdmin;
    if(!isAdmin){
        res.status(403).json({msg:"user is not an admin"});
    }
    next();
        
    } catch (error) {
        next(error);
    }
    
}

module.exports = adminMiddleware;