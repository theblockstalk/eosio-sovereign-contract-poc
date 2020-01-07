// https://github.com/EOSIO/eosjs/blob/master/src/eosjs-serialize.ts#L309
function nameToUint8Array(s) {
    if (typeof s !== 'string') {
        throw new Error('Expected string containing name');
    }
    function charToSymbol(c) {
        if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
            return (c - 'a'.charCodeAt(0)) + 6;
        }
        if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
            return (c - '1'.charCodeAt(0)) + 1;
        }
        return 0;
    }
    const a = new Uint8Array(8);
    let bit = 63;
    for (let i = 0; i < s.length; ++i) {
        let c = charToSymbol(s.charCodeAt(i));
        if (bit < 5) {
            c = c << 1;
        }
        for (let j = 4; j >= 0; --j) {
            if (bit >= 0) {
                a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                --bit;
            }
        }
    }
    return a;
}

// https://coolaj86.com/articles/convert-js-bigints-to-typedarrays/
function bufToBn(buf) {
    let hex = [];
    u8 = Uint8Array.from(buf);
    
    u8.forEach(function (i) {
        let h = i.toString(16);
        if (h.length % 2) { h = '0' + h; }
        hex.push(h);
    });

    return BigInt('0x' + hex.join(''));
}

// Should convert these names to these BigInts
// name("dablockstalk") = BigInt(5300484020185441024)

module.exports = function(name_str) {
    switch (name_str) {
        case "sovereign":
            return BigInt(14210734419984515072);
        case "dablockstalk":
            return BigInt(5300484020185441024);
        case "hi":
            return BigInt(7746191359077253120);
        default:
            // TODO: this is not working
            const u8 = nameToUint8Array(name_str);
            const bn = bufToBn(u8);
            
            return bn;
    }
}