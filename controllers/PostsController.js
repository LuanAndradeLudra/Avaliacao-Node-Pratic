const Utils = require("../src/Utils");

class PostsController {

    constructor(pModel) {
        this.pModel = pModel;
    }

    getOffset(page) {
        return this.pModel.page == 1 ? 0 : parseInt(this.pModel.page - 1) * 10;
    }

    getPosts() {
        var offset = this.getOffset(this.pModel.page);
        var next = offset + 10 >= Utils.objSize(this.pModel.posts) ? false : true;
        var before = this.pModel.page > 1 ? true : false;
        var posts = this.pModel.posts.slice(offset, offset + 10);

        return {
            posts: posts,
            next: next,
            before: before,
        }
    }

}

module.exports = PostsController;