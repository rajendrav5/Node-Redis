const fetch = require("node-fetch");

async function callAPI(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return res.json();
}

module.exports = callAPI;