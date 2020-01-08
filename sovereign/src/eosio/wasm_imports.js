// nodes definitions in
// https://github.com/EOSIO/eos/blob/master/libraries/chain/wasm_interface.cpp

module.exports = {
    action_data_size: function() {
        console.log('action_data_size');
        return 10 /*int i32*/;
    },
    eosio_assert: function(condition /*bool i32*/, msg /*null_terminated_ptr i32*/) {
        console.log('eosio_assert');
        console.log(condition);
        console.log(msg);
    },
    memset: function(dest /*array_ptr<char> i32*/, value /*int i32*/, length /*size_t i32*/) {
        console.log('memset');
        console.log(dest);
        console.log(value);
        console.log(length);
        return 12 /*char* i32*/;
    },
    read_action_data: function(memory /*array_ptr<char> i32*/, buffer_size /*size_t i32*/) {
        console.log('read_action_data');
        console.log(memory);
        console.log(buffer_size);
        return 10 /*int i32*/;
    },
    eosio_assert_code: function(condition /*bool i32*/, error_code /*uint64_t i64*/) {
        console.log('eosio_assert_code');
        console.log(condition);
        console.log(error_code);

        const generic_system_error = BigInt(10000000000000000000);

        if (condition === 0) {
            if (error_code >= generic_system_error) {
                throw new Error("eosio_assert_code called with reserved error code: " + error_code);
            } else {
                throw new Error("assertion failure with error code: " + error_code);
            }
        }
    },
    prints: function(str /*null_terminated_ptr i32*/) {
        console.log("prints");
        console.log(str);
    }
}