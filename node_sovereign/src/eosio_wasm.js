const fs = require('fs');
const eosioImports = require('./eosio_imports');

let importObject = {
    env: {
        memoryBase: 0,
        // tableBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        // table: new WebAssembly.Table({
        //     initial: 0,
        //     element: 'anyfunc'
        // })
    }
};

Object.keys(eosioImports).forEach(function(key) {
    importObject.env[key] = eosioImports[key];
});

async function wasm_module(filename) {
    const source = fs.readFileSync(filename);
    const typedArray = new Uint8Array(source);

    const module =  await WebAssembly.instantiate(typedArray, importObject);
    return module;
}

module.exports.wasm_module = wasm_module;