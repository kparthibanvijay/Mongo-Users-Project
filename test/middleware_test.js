const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const { PromiseProvider } = require('mongoose');

describe('middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'first blog', content: 'some junk' });

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('deleting user should delete blogpost from that user as well', () => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});