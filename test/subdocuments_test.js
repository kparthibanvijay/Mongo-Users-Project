const assert = require('assert');
const User = require('../src/user');

describe('subdocuments should save', () => {
    it('sub documents should save', (done) => {
        const user = new User({ name: 'Joe', posts: [{ title: 'first post' }] });

        user.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'first post');
                done();
            });
    });

    it('can add sub documents to an existing record', (done) => {
        const user = new User({ name: 'Joe', posts: [] });
        user.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'post from joe' });
                return user.save();
            })
            .then(() => {
                User.findOne({ name: 'Joe' })
                    .then((user) => {
                        assert(user.posts[0].title === 'post from joe');
                        done();
                    });
            });
    });

    it('can remove subdocument from an existing record', (done) => {
        const user = new User({ name: 'Joe', posts: [{ title: 'my post' }] });

        user.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});