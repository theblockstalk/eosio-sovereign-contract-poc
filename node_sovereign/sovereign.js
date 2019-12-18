const wasm = require('./eosio_wasm.js');

const CONTRACT_WASM_PATH = '../build/sovereign.wasm';
const CONTRACT_ABI_PATH = '../build/sovereign.abi';

module.exports.hi = async function () {
    const mod = await wasm.wasmModule(CONTRACT_WASM_PATH);
    console.log(mod);
    console.log(mod.instance.exports);
}