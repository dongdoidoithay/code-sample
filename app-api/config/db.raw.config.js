module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456aA@",
    DB: "db_kumaraw",
    dialect: "mysql",
    pool: {
      max: 500,
      min: 0,
      acquire: 90000,
      idle: 900000
    }
  };