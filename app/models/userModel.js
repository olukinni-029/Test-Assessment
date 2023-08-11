module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

      },
        username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
           isEmail: true, //checks for email format
           allowNull: false
      },
      password:{
        type:Sequelize.STRING,
        allowNull: false
      },
      role:{
        type:Sequelize.STRING,
        defaultValue:"user"
      }
    });
    User.associate = (models) => {
      // A user can have many blogs
      User.hasMany(models.Blog, {
          foreignKey: 'userId', // The foreign key in the Blog model
          onDelete: 'CASCADE', // Optional: Delete associated blogs when a user is deleted
          hooks: true // Optional: Enable hooks for cascading delete
      });
  };
    return User;
  };