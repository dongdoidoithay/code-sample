module.exports = (sequelize, DataTypes) => {
    const documents_trend = sequelize.define("documents_trend", {
      idDocTrend: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      idDoc: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      }
    },{
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
      // your other configuration her
    });
    return documents_trend;
};