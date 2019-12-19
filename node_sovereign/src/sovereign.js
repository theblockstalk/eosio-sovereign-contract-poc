const contract = require('./eosio_contract');

// const CONTRACT_WASM_PATH = '../build/sovereign.wasm'; // i64 types are not supported!
// TypeError: wasm function signature contains illegal type

const CONTRACT_WASM_PATH = '../build/sovereign2.wasm'; // i64 types converted to i32
const CONTRACT_ABI_PATH = '../build/sovereign.abi';

module.exports.hi = async function () {
    const sovereign_contract = await contract.contract(CONTRACT_WASM_PATH, CONTRACT_ABI_PATH);
    console.log(sovereign_contract);

    const res = await sovereign_contract.hi();
    console.log(res);
}