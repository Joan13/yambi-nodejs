import Sequelize from "sequelize";

export const sequelize = new Sequelize("yb_center", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port: 8889,
    dialectOptions: {
        charset: 'utf8mb4'
      },
});

sequelize
	.sync()
	.then((result) => console.log(result))
	.catch((error) => console.log(error));