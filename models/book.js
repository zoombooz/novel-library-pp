'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async getTotalBooks(){
      let total = await Book.count()
      return total
    }

    static associate(models) {
      // define association here
      Book.belongsTo(models.Author, {
        foreignKey : 'AuthorId'
      })

      Book.belongsToMany(models.User, {
        through : 'UserReadBooks'
      })

      
    }
  }
  Book.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Title tidak boleh kosong"
        },
        notEmpty : {
          msg : "Title tidak boleh kosong"
        }
      }
    },
    description: {
      type : DataTypes.BLOB,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Description tidak boleh kosong"
        },
        notEmpty : {
          msg : "Description tidak boleh kosong"
        },minLength(value) {
          if (value.length < 50) {
            throw new Error('Desription minimal berjumlah 50 karakter');
          }
        }
      }
    },
    text: {
      type : DataTypes.BLOB,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Text tidak boleh kosong"
        },
        notEmpty : {
          msg : "Text tidak boleh kosong"
        },minLength(value) {
          if (value.length < 100) {
            throw new Error('Text minimal berjumlah 100 karakter');
          }
        }
      }
    },
    genre: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Genre tidak boleh kosong"
        },
        notEmpty : {
          msg : "Genre tidak boleh kosong"
        }
      }
    },
    image: {
      type : DataTypes.BLOB,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Image tidak boleh kosong"
        },
        notEmpty : {
          msg : "Image tidak boleh kosong"
        }
      }
    },
    AuthorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Author tidak boleh kosong"
        },
        notEmpty : {
          msg : "Author tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};