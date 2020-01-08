# POC sovereign EOSIO smart contract that runs the browser

## This project
This shows a proof of concept of an EOSIO smart contract that can be executed in a sovereign environment (Chrome web browser) and not by an EOSIO node.

This project has several elements:
- /contract: an EOSIO smart contract called "sovereign"
- /contract_test: a few unit tests for the EOSIO smart contract using the eoslimes test framework in
- /eosio: configuration file for running nodeos in development mode, for use with the unit tests
- /sovereign: a web page that will execute the sovereign smart contract in the browser WebAssembly module

## Prerequesits
The sovereign contract run the browser should run on any Linux based OS.

Building the contract request that eosio.cdt is installed.
https://github.com/EOSIO/eosio.cdt/releases

## Run

1. Build the contract
```
eosio-cpp -I contract/include -R resource -o build/sovereign.wasm -contract sovereign ./contract/src/sovereign.cpp --abigen
```

2. Create the webpack for the web page
This will create bundle.js that is the script run by sovereign/index.html
```
cd sovereign
npm run build
```

3. Open Chrome and turn on the WebAssembly experimental flag
Open `chrome://flags/#enable-experimental-webassembly-features` in a new window an enable.
This enables support for 64 bit inputs and outputs in the browser to WebAssembly using BigInts. Without this, the wasm code will not run.

4. Open index.html and observe
Open the web console and check the output.

## Run with VS Code

You can do the above 4 steps using the projects VS code files.

You can then use the VS Code debugger, set breakpoints and inspect variables. Very handy!

1. Open the repository in VS Code
2. Run the `Build wasm and abi` task
3. Run the `Create bundle.js` task
4. Launch the `Launch index.html` debug launch
5. Open `chrome://flags/#enable-experimental-webassembly-features` in a new tab an enable.
6. Relaunch the `Launch index.html` debug launch

## What's happening

The sovereign.wasm file is read, and then passed to a new WebAssembly module.
`WebAssembly.instantiate(typedArray, importObject);`

An object of options is also provided with the wasm file with the format:
```
let importObject = {
    env: {
        memoryBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        eosio_assert_code(condition, error_code) {
          ...
        },
        prints(str) {
          ...
        }
        ...
    }
};
```
This import object has a few parts.
1. The WebAssembly `memory` is used to pass the data from the transaction into the contract.
2. There are several functions like `eosio_assert_code` and `prints` that are defined in the wasm interface in nodeos. These are called "intrinsics" in eosio or "exports" in WebAssemby code lingo. These functions allow the contract to call _out of_ the contract (into nodeos). This is done for lots and lots of things, such as the sha256 hash, or read/writing to the multi_index_tables. You can see all the wasm intrinsics in nodeos here:

https://github.com/EOSIO/eos/blob/master/libraries/chain/wasm_interface.cpp

Once the WebAssembly module is instantiated it can then be executed. This is done by calling the `apply` function:

`sovereign_contract.instance.exports.apply(receiver, code, action);`

This apply function is the only way to call _in to_ the contract from the outside. While you cannot see it implemented in the contracts sovereign.hpp or sovereign.cpp file, this function is created by the eosio.cdt compiler. You can see what this function looks like in the comment in sovereign.hpp (note that this is approximately but not exactly what the EOSIO_DISPATCH macro expands to):

https://github.com/theblockstalk/eosio-sovereign-contract-poc/blob/master/contract/include/sovereign.hpp#L24

The apply function is called, and as it is called, you can see in the console that several of the "intrinsics" are called. Notably, the prints intrinsic is call which is what should happen when hi() is executed.

*TODO:*

The hi() action uses multi_index_table API to store some data in the messages table. During the contract execution an intrisic is executed which stores the data in a javascript object. When the contract finishes executing, a hash of the transaction input, and a hash of the data in the multi_index table in the javascript object in put onto a public eosio blockchain of choice. The data can be shared by multiple parties who can use the hash on chain to verify its integrity and thus validate the sovereign contracts current state and all state change.

## What are the applications
Running a contract locally has lots of interesting applications:
1. Private (the sovereign data is only shared to relevant counterparties) smart contracts that can be prooved on a public chain.
2. Public (the sovereign data is made public off-chain) smart contracts run off chain that can be prooved on a public chain, this is a valid scalability and UX improvement strategy.
3. Sovereign data, for example with sovereign identity data (the user is the primary in control of his/her data).

## What's the work required
This proof of concept scratches the surface of the work required to build this. It shows its possible to run a contract in a sovereign environment. Being able to run contracts in their browser (only Chrome currently does, and only in experimental mode) would allow this technology to be easily accessible to billions of devices with no extra software installation required, which is very powerful.

There are a few strategies to build something robust enough to be used in production:
1. Complete all of the eosio "intrisics" in a javascript package. Advantages: this can then be run be any devices that have compatible browsers, Disadvantages: lots of intrinsics to implement, Javascript is not particularly portable so different parties may have different contract execution results.
2. Create a standalone application, that uses large parts of the nodeos codebase to run the contract. This could then be integrated into eosio wallets to provide a sovereign contract execution environment. This may be possible with a nodeos plugin. Advantages: can use a lot of code from nodeos, Disadvantages: users need to install new software and the new software may only be compatible on machines that support nodeos (only 4 currently)
3. Compile the program from strategy (2) into a wasm file, and run it through the browser and let the contract's wasm instance communicate with the intrinsics wasm instance.
