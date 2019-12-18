const fs = require('fs');

let importObject = {
    imports: {
        imported_func: arg => console.log(arg)
    },
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
        }),
    }
};

const eosioImports = ["action_data_size", "eosio_assert", "memset", "read_action_data", "eosio_assert_code"];

for (let eosioImport of eosioImports) {
    importObject.env[eosioImport] = function() { console.log(eosioImport) };
}

async function wasmModule(filename) {
    const source = fs.readFileSync(filename);

    const typedArray = new Uint8Array(source);

    return await WebAssembly.instantiate(typedArray, importObject)
}

module.exports.wasmModule = wasmModule;