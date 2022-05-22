const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging:false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

db.cl_auths = require("./cl_auths.model.js")(sequelize, Sequelize);
db.cl_genres = require("./cl_genres.model.js")(sequelize, Sequelize);
db.cl_status = require("./cl_status.model.js")(sequelize, Sequelize);
db.cl_arts = require("./cl_arts.model.js")(sequelize, Sequelize);
db.cl_years = require("./cl_years.model.js")(sequelize, Sequelize);
db.cl_types = require("./cl_types.model.js")(sequelize, Sequelize);
db.cl_posteds = require("./cl_posteds.model.js")(sequelize, Sequelize);
db.cl_serializations = require("./cl_serializations.model.js")(sequelize, Sequelize);

db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.detail_documents = require("./detail_documents.model.js")(sequelize, Sequelize);
db.documents = require("./documents.model.js")(sequelize, Sequelize);
db.documents_trend = require("./documents_trend.model.js")(sequelize, Sequelize);


db.documents.hasMany(db.detail_documents, {foreignKey: 'idDoc'})
db.detail_documents.belongsTo(db.documents, {foreignKey: 'idDoc'})

db.documents.hasMany(db.documents_trend, {foreignKey: 'idDoc'})
db.documents_trend.belongsTo(db.documents, {foreignKey: 'idDoc'})

/* db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});
 */
module.exports = db;
