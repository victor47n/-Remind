const crypto = require ('crypto');

module.exports = function generateUniqueId(){
    return crypto.randomBytes(20).toString('hex');
}