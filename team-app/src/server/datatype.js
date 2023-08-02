const jwt = require('jsonwebtoken')

function json2json(json){
    var result = {};
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result[key] = (json[key]);
    });
    return result;
}

module.exports = {
    json2json
}