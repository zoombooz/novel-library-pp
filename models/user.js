'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile, {
        foreignKey : 'ProfileId'
      })

      User.belongsToMany(models.Book, {
        through : 'UserReadBooks'
      })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Username tidak boleh kosong"
        },
        notEmpty : {
          msg : "Username tidak boleh empty"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password tidak boleh kosong"
        },
        notEmpty : {
          msg : "Password tidak boleh empty"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Email tidak boleh kosong"
        },
        notEmpty : {
          msg : "Email tidak boleh empty"
        }
      }
    },
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate : (instance, options) => {
        instance.role = "user"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};