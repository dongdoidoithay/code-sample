module.exports = (sequelize, DataTypes) => {
    const cl_posteds = sequelize.define("cl_posteds", {
        id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      nameSeo: {
        type: DataTypes.STRING
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
  
    return cl_posteds;
};