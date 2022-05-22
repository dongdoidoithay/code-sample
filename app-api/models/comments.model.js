module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("comments", {
      idDoc: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING
      },
      comment: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      },
      url: {
        type: DataTypes.STRING
      },
      idComment: {
        type: DataTypes.STRING,
        primaryKey: true
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
  
    return comments;
};