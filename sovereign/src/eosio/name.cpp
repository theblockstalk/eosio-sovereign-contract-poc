constexpr explicit name( std::string_view str )
      :value(0)
      {
         if( str.size() > 13 ) {
            eosio::check( false, "string is too long to be a valid name" );
         }
         if( str.empty() ) {
            return;
         }

         auto n = std::min( (uint32_t)str.size(), (uint32_t)12u );
         for( decltype(n) i = 0; i < n; ++i ) {
            value <<= 5;
            value |= char_to_value( str[i] );
         }
         value <<= ( 4 + 5*(12 - n) );
         if( str.size() == 13 ) {
            uint64_t v = char_to_value( str[12] );
            if( v > 0x0Full ) {
               eosio::check(false, "thirteenth character in name cannot be a letter that comes after j");
            }
            value |= v;
         }
      }

      /**
       *  Converts a %name Base32 symbol into its corresponding value
       *
       *  @param c - Character to be converted
       *  @return constexpr char - Converted value
       */
      static constexpr uint8_t char_to_value( char c ) {
         if( c == '.')
            return 0;
         else if( c >= '1' && c <= '5' )
            return (c - '1') + 1;
         else if( c >= 'a' && c <= 'z' )
            return (c - 'a') + 6;
         else
            eosio::check( false, "character is not in allowed character set for names" );

         return 0; // control flow will never reach here; just added to suppress warning
      }