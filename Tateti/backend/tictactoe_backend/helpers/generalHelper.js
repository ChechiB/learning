var crypto = require('crypto');

let hash = function(player_name){
    return crypto.createHash('md5').update(player_name).digest('hex');
}

module.export = {
    hash
}