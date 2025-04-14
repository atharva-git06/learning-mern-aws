const validate = (schema) => async (req,res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
         next();

    } catch (error) {
        console.log("this is validate error", error);
        const msg = "some message";
        const status = 422;
        const extraDetails = error.errors[0].message;
        console.log(msg);
       // res.status(500).json({message:msg});
        const err = {
          status,msg, extraDetails 
        };
        next(err);
    }
}

module.exports = validate;