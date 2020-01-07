const fs = require('fs');
const contract = require('./eosio/contract');
const name = require('./eosio/name');

const CONTRACT_WASM_FILE = fs.readFileSync('../build/sovereign.wasm');
const CONTRACT_ABI_FILE = fs.readFileSync('../build/sovereign.abi');

module.exports.hi = async function () {
    console.log("hi");
    const sovereign_contract = await contract.contract(CONTRACT_WASM_FILE, CONTRACT_ABI_FILE);
    
    console.log("calling apply function");

    const receiver = name("sovereign");
    const code = name("dablockstalk");
    const action = name("hi")
    console.log(receiver, code, action);
    await sovereign_contract.instance.exports.apply(receiver, code, action);
    console.log("apply function called");
}