module.exports = function (sequelize, DataTypes) {

    var Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,20]
            }
        },
        hash:DataTypes.STRING,
        salt:DataTypes.STRING,
        characterName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          house:{
              type: DataTypes.STRING,
              allowNull: false,
          },
          characterImage:{
              type: DataTypes.INTEGER,
              allowNull: false
          },
          strength:{
              type: DataTypes.INTEGER,
              allowNull: false,
            defaultValue: '100'
          }
    })

    return Users

}
