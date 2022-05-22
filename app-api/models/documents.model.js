module.exports = (sequelize, DataTypes) => {
    const documents = sequelize.define("documents", {
      idDoc: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nameOther: {
        type: DataTypes.TEXT
      },
      name: {
        type: DataTypes.STRING
      },
      nameSeo: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      desc: {
        type: DataTypes.TEXT
      },
      auth: {
        type: DataTypes.STRING
      },
      genres: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.STRING
      },
      view: {
        type: DataTypes.INTEGER
      },
      art: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      },
      type: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.STRING
      },
      rate: {
        type: DataTypes.STRING
      },
      postedBy:{
        type: DataTypes.STRING
      },
      serialization:{
        type: DataTypes.STRING
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
    return documents;
};