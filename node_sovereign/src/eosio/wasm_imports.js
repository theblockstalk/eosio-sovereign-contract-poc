
module.exports = {
    action_data_size: function() {
        console.log('action_data_size');
        const i32a = 11;
        return i32a;
    },
    eosio_assert: function(i32a, i32b) {
        console.log('eosio_assert');
        console.log(i32a);
        console.log(i32b);
    },
    memset: function(i32a, i32b, i32c) {
        console.log('memset');
        console.log(i32a);
        console.log(i32b);
        console.log(i32c);
        const i32d = 12;
        return i32d;
    },
    read_action_data: function(i32a, i32b) {
        console.log('read_action_data');
        console.log(i32a);
        console.log(i32b);
        const i32c = 13;
        return i32c;
    },
    eosio_assert_code: function(condition /*i32*/, error_code /*i64*/) {
        console.log('eosio_assert_code');
        console.log(condition);
        console.log(error_code);

        const generic_system_error = 2147483647; //actual value is 10000000000000000000ULL;

        if (condition === 0) {
            if (error_code >= generic_system_error) {
                throw new Error("eosio_assert_code called with reserved error code: " + error_code);
            } else {
                throw new Error("assertion failure with error code: " + error_code);
            }
        }
    }
}