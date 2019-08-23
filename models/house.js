module.exports = function (sequelize, DataTypes) {
  var House = sequelize.define("House", {
    houseName: {
      type: DataTypes.STRING,
 
    },
    user:{
      type: DataTypes.STRING,
 
    }
  });

  return House;
};
