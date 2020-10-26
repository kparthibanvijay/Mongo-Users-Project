const assert = require('assert');
const User = require('../src/user')

describe('Reading users out of the database', () => {
    let joe, maria, zach, terry;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        zach = new User({ name: 'Maria' });
        maria = new User({ name: 'Zach' });
        terry = new User({ name: 'Terry' });
        Promise.all([joe.save(), maria.save(), zach.save(), terry.save()])
            .then(() => done());
    });

    it('find all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                console.log(users);

                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });

    it('can skip and limit resultset', (done)=>{
        User.find({})
            .sort({name: 1}) // sort by name, 1 means ascending, -1 decending
            .skip(1)
            .limit(2)
            .then((users)=>{
                assert(users.length === 2);
                assert(users[0].name === 'Maria');

                assert(users[1].name === 'Terry');
                done();
            });
    });
});