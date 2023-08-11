const db = require("../models");
const Blog = db.blogs;
const User = db.users;
const Op = db.Sequelize.Op;

// Create Blog Post
exports.createBlog = async (req, res) => {
  try {
      // Check if user exist in database using the id verified coming from the auth middleware
      const userId = req.user.userId;
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(401).json({ message: "User is not authorized" });
      }
    const blogContent = req.body.blogContent;
    if (!blogContent) {
      res.status(400).send({ message: "content can not be empty" });
      return;
    }
    // Create a new blog post associated with the user
    const newBlog = await Blog.create({
      blogContent,
      userId:user.id // Associate the blog with the user
  });
  // success response
    res.status(200).json({ Message: "Blog successfully created", newBlog});
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Edit Blog Post
exports.updateBlog = async (req, res) => {
  try {
    // check if the user exist
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(401).json({ message: "User not Found" });
    }
    // check if the userId parse equal to blog.userId


    // check for the blog
    const id = req.params.id;
    const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.UserId !== userId) {
            return res.status(401).json({ message: "Unauthorized to update this blog" });
        }

    // update the blog
    const [num] = await Blog.update(req.body, { where: { id: id } });

    if (num === 1) {
      res.status(200).send({ message: "Blog updated successfully" });
    } else {
      res.status(400).send({ message: `Cannot update blog` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Delete Blog Post
exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Blog.destroy({ where: { id: id } });

    if (num === 1) {
      res.status(200).send({ message: "Blog deleted successfully" });
    } else {
      res.status(404).send({ message: `Cannot find or delete blog with id=${id}` });
    }
  } catch (err) {
    res.status(500).send({
        message: err.message,
      });
  }
};
// Read Blog Posts List
exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.viewBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Blog.findByPk(id);

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Cannot find blog with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
