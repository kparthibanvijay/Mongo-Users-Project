const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
    it('virtual types should work', (done) => {
        const user = new User({name: 'Joe', posts: [{title: 'test post'}]});

        user.save()
            .then(()=>User.findOne({name: 'Joe'}))
            .then((user)=> {
                assert(user.postCount === 1);
                done();
            });
    });
});