const mysql = require("mariadb/callback");
require("dotenv").config();

let portDB = process.env.PORT_DB;
console.log("PORT ENV VARIABLE:", portDB);
if (portDB === undefined) {
    process.exit();
}

var db_config = {
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,

    port: portDB,
    trace: true,
};
 
let db = mysql.createConnection(db_config);

const handleDisconnect = () => {
    db = mysql.createConnection(db_config);
    db.connect((err) => {
        // The server is either down
        if (err) {
            // or restarting (takes a while sometimes).
            console.log("error when connecting to db:", err);
            console.log("& restarting");
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
        else {
            console.log("Connected to Mysql DB!");
        }
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    db.on("error", (err) => {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log(`err.code : PROTOCOL_CONNECTION_LOST appeard\n`);
            // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else {
            // connnection idle timeout (the wait_timeout
            console.log(`db.on("error") else called & err : ${err}\n`);
            throw err; // server variable configures this)
        }
    });
};

module.exports = {
    db: db,
    DBConnect: handleDisconnect,
};
