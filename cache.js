const client = require('./redis-client');

function cacheMiddleware(req, res, next) {
    const { param } = req.params;

    client.get(param, (err, data) => {
        if (err) throw new Error("Error while getting redis cache !!");

        if (data) {
            console.log("Found cache !! serving cache ...", data)
            try {
                return res.json({ "somejson": data});
            } catch(e) {
                console.log(`error sending response ${e}`);
            }
        } else {
            next();
        }
    });
}

module.exports = cacheMiddleware;