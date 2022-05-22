module.exports = (sequelize, DataTypes) => {
    const detail_documents = sequelize.define("detail_documents", {
      slug: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      idDetail: {
        type: DataTypes.STRING
      },
      idDoc: {
        type: DataTypes.STRING
      },
      nameChapter: {
        type: DataTypes.TEXT
      },
      nameSeoChapter: {
        type: DataTypes.TEXT
      },
      nameDoc: {
        type: DataTypes.TEXT
      },
      view: {
        type: DataTypes.TEXT
      },
      value: {
        type: DataTypes.FLOAT
      },
      date: {
        type: DataTypes.DATE
      },
      url: {
        type: DataTypes.STRING
      },
      urlDowload: {
        type: DataTypes.STRING
      },
      source: {
        type: DataTypes.TEXT
      }
    },{
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
      // your other configuration here
    
    });
  
    return detail_documents;
};