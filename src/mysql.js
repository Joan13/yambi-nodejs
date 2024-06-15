import mysql from 'mysql';
export const connection = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	// port: "8888",
	database: "yb_center",
	// socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});