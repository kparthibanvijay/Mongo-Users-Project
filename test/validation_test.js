const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires user name', (done) => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();

        //console.log(validationResult.errors.name.message);
        const { message } = validationResult.errors.name;
        assert(message === 'user name is required');
        done();
    });

    it('required user name longer than 2 characters', (done) => {
        const user = new User({ name: 'J' });
        const validationResult = user.validateSync();

        //console.log(validationResult.errors.name.message);
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 char');
        done();
    });


    it('invalid user should not be saved', (done) => {
        const user = new User({ name: 'JL' });

        user.save()
            .catch((validatiorResult) => {
                const { message } = validatiorResult.errors.name;

                assert(message === 'Name must be longer than 2 char');
                done();
            });
    });
});