const assert = require('assert');
const User = require('../src/user')

describe('Creating records', ()=>{
    it('saves a user', (done)=>{
        const joe = new User({name: 'Joen'});
        joe.save()
            .then(()=>{
                // has user saved successfully
                assert(!joe.isNew);
                done();
            });
    });
});