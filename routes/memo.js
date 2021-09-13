const mysql = require("mysql");


let datab = require('../config/db');

class Memo {


    static create (content, callback){

		datab.query('INSERT INTO mydb.Memo SET memo = ?',request.session.memo, function(error, result, fields) {
            
            if (error) throw error;
            callback(result);
        });
}

}


module.exports = Memo