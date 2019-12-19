Copy testing.ini to "~/.local/share/eosio/nodeos/config/testing.ini"

## Start nodes
                nodeos --config testing.ini --delete-all-blocks >> nodeos.log 2>&1 &

## Stop nodes
                pkill nodeos