/**
 * Created by user on 2017/9/20.
 */
var crypto = require('crypto');

module.exports = {
    MD5_SUFFIX : 'Heroin',
    md5: function(str){
        var obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');   //16进制
    }
};