exports.auth = (req,res,next) => {
    let accessToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('token=')){


        accessToken = req.headers.authorization.split('token=')[1];
        if(accessToken !== undefined){
            req.tokenInfo = {
                accessToken: accessToken
            }

            return next();
        }

    }else{
        console.error("AccessToken not found");
        return res.status(403).json({
            error: "UnAuthorized",
            message: "AccessToken not found!"
        });
    }


}

