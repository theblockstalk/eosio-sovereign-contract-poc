const wasm = require('./eosio_wasm.js');

const CONTRACT_WASM_PATH = '../build/sovereign.wasm';
const CONTRACT_ABI_PATH = '../build/sovereign.abi';

module.exports.hi = async function () {
    const mod = await wasm.wasmModule(CONTRACT_WASM_PATH);
    console.log(mod);
    const res = await mod.instance.exports.apply();
    console.log(res);
}