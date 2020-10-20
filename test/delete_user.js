const assert = require('assert');
const User = require('../src/user');


describe('Deleting a user', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.deleteOne().then(() => {
            User.findOne({ name: 'Joe' }).then((user) => {
                assert(user === null);
                done();
            })
        });
    });

    // remove a bunch a record matching criteria
    it('class instance remove', (done) => { 
        User.deleteMany({ name: 'Joe' }).then(() => {
            User.findOne({ name: 'Joe' }).then((user) => {
                assert(user === null);
                done();
            })
        });
    });


    it('model instance findOneAndRemove', (done) => { 
        User.findOneAndRemove({name: 'Joe'}).then(() => {
            User.findOne({ name: 'Joe' }).then((user) => {
                assert(user === null);
                done();
            })
        });
    });


    it('model instance findByIdAndRemove', (done) => { 
        User.findByIdAndDelete(joe._id).then(() => {
            User.findOne({ name: 'Joe' }).then((user) => {
                assert(user === null);
                done();
            })
        });
    });
});