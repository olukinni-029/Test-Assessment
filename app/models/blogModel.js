
module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
      blogContent: {
        type: Sequelize.STRING
      },
      userId:{
        type:Sequelize.INTEGER
      }

    });

    Blog.associate = (models) => {
      // A blog belongs to a user
      Blog.belongsTo(models.User, {
          foreignKey: 'userId', // The foreign key in the Blog model
          allowNull: false // Optional: Enforce that a blog must belong to a user
      });
  };
    return Blog;
  };