# POC sovereign private EOSIO smart contract that runs the browser and not in nodeos

## How it works
This shows a proof of concept of an EOSIO smart contract that can be executed in a sovereign environment (Chrome web browser) and not by an EOSIO node.

This project has several elements:
- /contract: an EOSIO smart contract called "sovereign"
- /contract_test: a few unit tests for the EOSIO smart contract using the eoslimes test framework in
- /eosio: configuration file for running nodeos in development mode, for use with the unit tests
- /sovereign: a web page that will execute the sovereign smart contract in the browser WebAssembly module

## Support
Should work on supported Linux OS that has eosio installed.

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
This enables support for 64 bit inputs and outputs in the browser to WebAssembly using BigInts

4. Open index.html and observe
Open the web console and check the output

## Run with VS Code

You can do the above 4 steps using the projects VS code files.

You can then use the VS Code debugger, set breakpoints and inspect variables. Very handy!

1. Open the repository in VS Code
2. Run the `Build wasm and abi` task
3. Run the `Create bundle.js` task
4. Launch the `Launch index.html` debug launch
5. Open `chrome://flags/#enable-experimental-webassembly-features` in a new window an enable.
6. Relaunch the `Launch index.html` debug launch