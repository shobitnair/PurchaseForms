const sqlite3 = require('sqlite3').verbose();

const sq = new sqlite3.Database('./store.db' , sqlite3.OPEN_READWRITE , (err) => {
    if(err) console.log(err.message);
    else console.log('success on sqlite3 db');
})


module.exports = {sq}
