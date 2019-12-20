console.log("loading sovereign.js")
// browserify().transform("babelify", {presets: ["es2015"]});


import { contract } from './eosio/contract';
// const contract = require('./eosio/contract');
// const name = require('./eosio/name');

// const CONTRACT_WASM_PATH = '../build/sovereign.wasm'; // i64 types are not supported!
// TypeError: wasm function signature contains illegal type

const CONTRACT_WASM_PATH = '../build/sovereign2.wasm'; // i64 types converted to i32
const CONTRACT_ABI_PATH = '../build/sovereign.abi';

const hi = async function () {
    const sovereign_contract = await contract.contract(CONTRACT_WASM_PATH, CONTRACT_ABI_PATH);
    
    // const sovereign_name = name("sovereign");
    
    // await sovereign_contract.instance.exports.apply(
    //     name("sovereign"),
    //     name("dablockstalk"),
    //     name("hi")
    // );
    console.log(CONTRACT_WASM_PATH)
}

async function my_onload() {
    console.log("here we are");
    await hi();
}