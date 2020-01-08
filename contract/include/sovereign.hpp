#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT sovereign : public contract {
  public:
    using contract::contract;

    ACTION hi();

  private:
    // TABLE messages {
    //   name    user;
    //   checksum256 hash;
    //   time_point last_updated;
    //   auto primary_key() const { return user.value; }
    // };
    // typedef multi_index<name("messages"), messages> messages_table;
};

/*
// Can be used to manually override the dispacher

extern "C" {
    void apply(uint64_t receiver, uint64_t code, uint64_t action) {
        if( code == receiver ) {
          switch(action) {
            case name("hi").value: 
              execute_action(name(receiver), name(code), &sovereign::hi); 
              break;
            default:
              print("did not execute defined action");
              break;
          }
        }
    }
};
*/