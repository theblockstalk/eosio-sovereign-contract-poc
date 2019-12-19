const fs = require('fs');
const eosio_wasm = require('./eosio_wasm');


async function contract(wasm_file, abi_file) {
    const wasm_module = await eosio_wasm.wasm_module(wasm_file);
    const abi_source = fs.readFileSync(abi_file);
    const abi = JSON.parse(abi_source);

    let contract = {};
    for (let action of abi.actions) {
        contract[action.name] = async function() {
            const res = await wasm_module.instance.exports.apply(receiver = "sovereign", code = "dablockstalk", action = "hi");
            // receiver - always == self (the contract’s account)
            // code - account that sent the action
            // action - name of the action to execute
            return res;
        }
    }
}

module.exports.contract = contract;