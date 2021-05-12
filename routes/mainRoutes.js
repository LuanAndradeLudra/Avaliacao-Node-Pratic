const Express = require("express");
const router = new Express.Router();
const axios = require("axios");
const PostsModel = require("../models/PostsModel");
const PostsController = require("../controllers/PostsController");

router.get("/", (req, res) => {

    var url = "https://jsonplaceholder.typicode.com/posts";

    axios.get(url)
        .then(function (response) {

            var page = req.query.page != undefined ? req.query.page : 1;

            var pModel = new PostsModel(response.data, page);

            var pController = new PostsController(pModel);

            var postsData = pController.getPosts();

            res.render("index", {
                posts: postsData.posts,
                next: postsData.next,
                before: postsData.before,
                page: parseInt(page),
            })
        })
        .catch(function (error) {
            console.log(`Erro ao consumir Api ${url} \n ${error}`);
        });
});

router.get("/post/:id", (req, res) => {

    let id = req.params.id;

    if (isNaN(id)){
        res.redirect("/");
    } else {

        var url = "https://jsonplaceholder.typicode.com/posts/" + id;

    axios.get(url)
        .then(function (response) {
            var post = response.data;
            url = "https://jsonplaceholder.typicode.com/posts/";
            axios.get(url)
                .then(function (response) {

                    var posts = response.data;
                    posts = posts.slice(0, 4);
                    
                    res.render("post", {
                        post: post,
                        posts: posts,
                    })
                })
                .catch(function (error) {
                    console.log(`Erro ao consumir Api ${url} \n ${error}`);
                });
        })
        .catch(function (error) {
            console.log(`Erro ao consumir Api ${url} \n ${error}`);
        });
    }
});

router.get("*", (req, res) => {
    res.status(404).render("404");
});

module.exports = router;