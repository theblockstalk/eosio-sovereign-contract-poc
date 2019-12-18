const assert = require('assert');
const sovereign = require('./sovereign.js');

describe('sovereign', function () {
    // Increase mocha(testing framework) time, otherwise tests fails
    this.timeout(15000);

    let contractAccount;
    let myAccount;
    
    before(async () => {
        
    });

    beforeEach(async () => {
    });

    it('Should execute hi()', async () => {        
        const tx = await sovereign.hi();
        
        console.log(tx);
    });
});