const eosio_wasm = require('./wasm');


async function contract(wasm_file, abi_file) {
    const wasm_module = await eosio_wasm.wasm_module(wasm_file);

    return wasm_module;
    // const abi = JSON.parse(abi_file);
    
    // let contract = {};
    // for (let action of abi.actions) {
    //     contract[action.name] = async function() {
    //         await wasm_module.instance.exports.apply(receiver = "sovereign", code = "dablockstalk", action = "hi");
    //         // receiver - always == self (the contract’s account)
    //         // code - account that sent the action
    //         // action - name of the action to execute
    //     }
    // }

    // return contract;
}

module.exports.contract = contract;