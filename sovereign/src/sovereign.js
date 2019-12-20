const fs = require('fs');
const contract = require('./eosio/contract');
const name = require('./eosio/name');

// const CONTRACT_WASM_PATH = '../build/sovereign.wasm'; // i64 types are not supported!
// TypeError: wasm function signature contains illegal type

const CONTRACT_WASM_FILE = fs.readFileSync('../build/sovereign.wasm');; // i64 types converted to i32
const CONTRACT_ABI_FILE = fs.readFileSync('../build/sovereign.abi');

module.exports.hi = async function () {
    console.log("hi");
    const sovereign_contract = await contract.contract(CONTRACT_WASM_FILE, CONTRACT_ABI_FILE);
    console.log(sovereign_contract);
    const sovereign_name = name("sovereign");
    console.log("calling apply function");
    await sovereign_contract.instance.exports.apply(
        name("sovereign"),
        name("dablockstalk"),
        name("hi")
    );
    console.log("apply function called");
}