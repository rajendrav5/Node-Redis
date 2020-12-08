const express = require('express');
const cacheMiddleware = require('./cache');
const client = require('./redis-client');
const callAPI = require('./api');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/getalphas/:param', cacheMiddleware, (req, res) => {
    const { param } = req.params;
    
    callAPI(param).then((data) => {
        console.log("End point resolved,", data);
        
        // setting data to Redis layer..
        client.set(param, JSON.stringify(data));
        
        res.json(data);
    });
});

app.use('/flushalphas', (req, res) => {
    try {
        client.flushall();
    } catch(e) {
        console.log("Problem while flushing caching ...", e);
        return res.json({"cacheFlush": false});
    }
    return res.json({"cacheFlush": true});
});

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});