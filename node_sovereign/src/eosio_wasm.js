const fs = require('fs');
const eosioImports = require('./eosio_imports');

let importObject = {
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
        })
    }
};

Object.keys(eosioImports).forEach(function(key) {
    importObject.env[key] = eosioImports[key];
});

async function wasmModule(filename) {
    const source = fs.readFileSync(filename);

    const typedArray = new Uint8Array(source);

    return await WebAssembly.instantiate(typedArray, importObject)
}

module.exports.wasmModule = wasmModule;