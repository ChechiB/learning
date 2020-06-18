var crypto = require('crypto');

const generateHash = (player_name)=>{
    console.log("player_name",player_name);
    
    return crypto.createHash('md5').update(player_name).digest('hex');
}

module.exports = {
    generateHash
}