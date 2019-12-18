const wasm = require('./eosio_wasm');

const CONTRACT_WASM_PATH = '../build/sovereign.wasm'; // i64 types are not supported!
// TypeError: wasm function signature contains illegal type

const CONTRACT_ABI_PATH = '../build/sovereign.abi';

module.exports.hi = async function () {
    const mod = await wasm.wasmModule(CONTRACT_WASM_PATH);
    console.log(mod);
    const res = await mod.instance.exports.apply();
    console.log(res);
}