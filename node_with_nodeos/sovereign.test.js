const assert = require('assert');
const eoslime = require('eoslime').init('local');
const eos = eoslime.Provider.eos;

const CONTRACT_WASM_PATH = '../build/sovereign.wasm';
const CONTRACT_ABI_PATH = '../build/sovereign.abi';

describe('sovereign', function () {
    // Increase mocha(testing framework) time, otherwise tests fails
    this.timeout(15000);

    let contractAccount;
    let myAccount;
    
    before(async () => {
        let accounts = await eoslime.Account.createRandoms(1);
        myAccount = accounts[0];
    });

    beforeEach(async () => {
        contractAccount = await eoslime.Contract.deploy(CONTRACT_WASM_PATH, CONTRACT_ABI_PATH);
    });

    it('Should execute hi()', async () => {        
        const tx = await contractAccount.hi();
        
        console.log(tx);
    });
});