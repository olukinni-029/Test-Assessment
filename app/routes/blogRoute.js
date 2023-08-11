module.exports = app => {
    const blogs = require("../controller/blogController.js");
    const {isAuthenticated}=require("../middleware/JwtAuth.js");
    var router = require("express").Router();

    router.post("/",isAuthenticated, blogs.createBlog);

     router.get("/",blogs.getAllBlog);

     router.put("/:id",isAuthenticated,blogs.updateBlog);

    router.get("/:id",blogs.viewBlog);

     router.delete("/:id",blogs.deleteBlog);

    app.use('/api/blogs',router);
};