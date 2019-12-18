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
