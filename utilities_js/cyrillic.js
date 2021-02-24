function tokenize_cyr(word, keep_punctuation) {
    if (keep_punctuation === undefined) {
        keep_punctuation = false
    }

    // hopefully this is all of them. i'm not sure they're even in an order that makes sense.
    // i also originally misread the breve symbols as diereses.
    // i'm leaving the diereses in as comments just in case they need to be put back in for whatever reason.
    var graphemes = [
                     //"\u041D\u0027\u044C\u04F1", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
                     //"\u043D\u0027\u044C\u04F1", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
                     //"\u041D\u0027\u044A\u04F1", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
                     //"\u043D\u0027\u044A\u04F1", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
                     "\u041D\u0027\u044C\u045E", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u041D\u0027\u044A\u045E", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
                     "\u041D\u2019\u044C\u045E", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u041D\u2019\u044A\u045E", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
                     "\u043D\u0027\u044C\u045E", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u043D\u0027\u044A\u045E", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
                     "\u043D\u2019\u044C\u045E", // CYRILLIC SMALL   LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u043D\u2019\u044A\u045E", // CYRILLIC SMALL   LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
                     //"\u04A2\u044C\u04F1", // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
                     //"\u04A3\u044C\u04F1", // CYRILLIC SMALL   LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
                     //"\u04A2\u044A\u04F1", // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
                     //"\u04A3\u044A\u04F1", // CYRILLIC SMALL   LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
                     "\u04A2\u044C\u045E", // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u04A3\u044C\u045E", // CYRILLIC SMALL   LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
                     "\u04A2\u044A\u045E", // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
                     "\u04A3\u044A\u045E", // CYRILLIC SMALL   LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE

                     "\u041D\u0027\u044C", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
                     "\u041D\u0027\u044A", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
                     "\u041D\u2019\u044C", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN
                     "\u041D\u2019\u044A", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
                     "\u043D\u0027\u044C", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
                     "\u043D\u0027\u044A", // CYRILLIC SMALL   LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
                     "\u043D\u2019\u044C", // CYRILLIC SMALL   LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN
                     "\u043D\u2019\u044A", // CYRILLIC SMALL   LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN

                     //"\u041D\u0027\u04F1", // CYRILLIC CAPITAL LETTER EN  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     //"\u043D\u0027\u04F1", // CYRILLIC SMALL   LETTER EN  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     //"\u0413\u0027\u04F1", // CYRILLIC CAPITAL LETTER GHE & APOSTROPHE & SMALL LETTER U with DIERESIS  
                     //"\u0433\u0027\u04F1", // CYRILLIC SMALL   LETTER GHE & APOSTROPHE & SMALL LETTER U with DIERESIS 
                     //"\u041A\u0027\u04F1", // CYRILLIC CAPITAL LETTER KA  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     //"\u043A\u0027\u04F1", // CYRILLIC SMALL   LETTER KA  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     //"\u0425\u0027\u04F1", // CYRILLIC CAPITAL LETTER HA  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     //"\u0445\u0027\u04F1", // CYRILLIC SMALL   LETTER HA  & APOSTROPHE & SMALL LETTER U with DIERESIS
                     "\u041D\u0027\u045E", // CYRILLIC CAPITAL LETTER EN  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u041D\u2019\u045E", // CYRILLIC CAPITAL LETTER EN  & CURLY APOSTROPHE & SMALL LETTER U with BREVE
                     "\u043D\u0027\u045E", // CYRILLIC SMALL   LETTER EN  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u043D\u2019\u045E", // CYRILLIC SMALL   LETTER EN  & CURLY APOSTROPHE & SMALL LETTER U with BREVE
                     "\u0413\u0027\u045E", // CYRILLIC CAPITAL LETTER GHE & APOSTROPHE & SMALL LETTER U with BREVE  
                     "\u0413\u2019\u045E", // CYRILLIC CAPITAL LETTER GHE & CURLY APOSTROPHE & SMALL LETTER U with BREVE  
                     "\u0433\u0027\u045E", // CYRILLIC SMALL   LETTER GHE & APOSTROPHE & SMALL LETTER U with BREVE 
                     "\u0433\u2019\u045E", // CYRILLIC SMALL   LETTER GHE & CURLY APOSTROPHE & SMALL LETTER U with BREVE 
                     "\u041A\u0027\u045E", // CYRILLIC CAPITAL LETTER KA  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u041A\u2019\u045E", // CYRILLIC CAPITAL LETTER KA  & CURLY APOSTROPHE & SMALL LETTER U with BREVE
                     "\u043A\u0027\u045E", // CYRILLIC SMALL   LETTER KA  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u043A\u2019\u045E", // CYRILLIC SMALL   LETTER KA  & CURLY APOSTROPHE & SMALL LETTER U with BREVE
                     "\u0425\u0027\u045E", // CYRILLIC CAPITAL LETTER HA  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u0425\u2019\u045E", // CYRILLIC CAPITAL LETTER HA  & CURLY APOSTROPHE & SMALL LETTER U with BREVE
                     "\u0445\u0027\u045E", // CYRILLIC SMALL   LETTER HA  & APOSTROPHE & SMALL LETTER U with BREVE
                     "\u0445\u2019\u045E", // CYRILLIC SMALL   LETTER HA  & CURLY APOSTROPHE & SMALL LETTER U with BREVE

                     "\u04A2\u044C",       // CYRILLIC CAPITAL LETTER EN  with DESCENDER & SMALL LETTER SOFT SIGN
                     "\u04A2\u044A",       // CYRILLIC CAPITAL LETTER EN  with DESCENDER & SMALL LETTER HARD SIGN
                     "\u04A3\u044C",       // CYRILLIC SMALL   LETTER EN  with DESCENDER & SMALL LETTER SOFT SIGN
                     "\u04A3\u044A",       // CYRILLIC SMALL   LETTER EN  with DESCENDER & SMALL LETTER HARD SIGN

                     //"\u04A2\u04F1",       // CYRILLIC CAPITAL LETTER EN  with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u04A3\u04F1",       // CYRILLIC SMALL   LETTER EN  with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u04F6\u04F1",       // CYRILLIC CAPITAL LETTER GHE with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u04F7\u04F1",       // CYRILLIC SMALL   LETTER GHE with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u049A\u04F1",       // CYRILLIC CAPITAL LETTER KA  with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u049B\u04F1",       // CYRILLIC SMALL   LETTER KA  with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u04B2\u04F1",       // CYRILLIC CAPITAL LETTER HA  with DESCENDER & SMALL LETTER U with DIERESIS
                     //"\u04B3\u04F1",       // CYRILLIC SMALL   LETTER HA  with DESCENDER & SMALL LETTER U with DIERESIS
                     "\u04A2\u045E",       // CYRILLIC CAPITAL LETTER EN  with DESCENDER & SMALL LETTER U with BREVE
                     "\u04A3\u045E",       // CYRILLIC SMALL   LETTER EN  with DESCENDER & SMALL LETTER U with BREVE
                     "\u04F6\u045E",       // CYRILLIC CAPITAL LETTER GHE with DESCENDER & SMALL LETTER U with BREVE
                     "\u04F7\u045E",       // CYRILLIC SMALL   LETTER GHE with DESCENDER & SMALL LETTER U with BREVE
                     "\u049A\u045E",       // CYRILLIC CAPITAL LETTER KA  with DESCENDER & SMALL LETTER U with BREVE
                     "\u049B\u045E",       // CYRILLIC SMALL   LETTER KA  with DESCENDER & SMALL LETTER U with BREVE
                     "\u04B2\u045E",       // CYRILLIC CAPITAL LETTER HA  with DESCENDER & SMALL LETTER U with BREVE
                     "\u04B3\u045E",       // CYRILLIC SMALL   LETTER HA  with DESCENDER & SMALL LETTER U with BREVE

                     "\u041D\u0027",       // CYRILLIC CAPITAL LETTER EN  & APOSTROPHE
                     "\u041D\u2019",       // CYRILLIC CAPITAL LETTER EN  & CURLY APOSTROPHE
                     "\u043D\u0027",       // CYRILLIC SMALL   LETTER EN  & APOSTROPHE
                     "\u043D\u2019",       // CYRILLIC SMALL   LETTER EN  & CURLY APOSTROPHE
                     "\u0413\u0027",       // CYRILLIC CAPITAL LETTER GHE & APOSTROPHE
                     "\u0413\u2019",       // CYRILLIC CAPITAL LETTER GHE & CURLY APOSTROPHE
                     "\u0433\u0027",       // CYRILLIC SMALL   LETTER GHE & APOSTROPHE
                     "\u0433\u2019",       // CYRILLIC SMALL   LETTER GHE & CURLY APOSTROPHE
                     "\u041A\u0027",       // CYRILLIC CAPITAL LETTER KA  & APOSTROPHE
                     "\u041A\u2019",       // CYRILLIC CAPITAL LETTER KA  & CURLY APOSTROPHE
                     "\u043A\u0027",       // CYRILLIC SMALL   LETTER KA  & APOSTROPHE
                     "\u043A\u2019",       // CYRILLIC SMALL   LETTER KA  & CURLY APOSTROPHE
                     "\u0425\u0027",       // CYRILLIC CAPITAL LETTER HA  & APOSTROPHE
                     "\u0425\u2019",       // CYRILLIC CAPITAL LETTER HA  & CURLY APOSTROPHE
                     "\u0445\u0027",       // CYRILLIC SMALL   LETTER HA  & APOSTROPHE
                     "\u0445\u2019",       // CYRILLIC SMALL   LETTER HA  & CURLY APOSTROPHE

                     "\u041B\u044C",       // CYRILLIC CAPITAL LETTER EL & SMALL LETTER SOFT SIGN
                     "\u041B\u044A",       // CYRILLIC CAPITAL LETTER EL & SMALL LETTER HARD SIGN
                     "\u043B\u044C",       // CYRILLIC SMALL   LETTER EL & SMALL LETTER SOFT SIGN
                     "\u043B\u044A",       // CYRILLIC SMALL   LETTER EL & SMALL LETTER HARD SIGN
                     "\u041D\u044C",       // CYRILLIC CAPITAL LETTER EN & SMALL LETTER SOFT SIGN
                     "\u041D\u044A",       // CYRILLIC CAPITAL LETTER EN & SMALL LETTER HARD SIGN
                     "\u043D\u044C",       // CYRILLIC SMALL   LETTER EN & SMALL LETTER SOFT SIGN
                     "\u043D\u044A",       // CYRILLIC SMALL   LETTER EN & SMALL LETTER HARD SIGN
                     //"\u0425\u04F1",       // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with DIERESIS
                     //"\u0445\u04F1",       // CYRILLIC SMALL   LETTER HA & SMALL LETTER U with DIERESIS
                     //"\u041A\u04F1",       // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with DIERESIS
                     //"\u043A\u04F1",       // CYRILLIC SMALL   LETTER KA & SMALL LETTER U with DIERESIS
                     "\u0425\u045E",       // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with BREVE
                     "\u0445\u045E",       // CYRILLIC SMALL   LETTER HA & SMALL LETTER U with BREVE
                     "\u041A\u045E",       // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with BREVE
                     "\u043A\u045E",       // CYRILLIC SMALL   LETTER KA & SMALL LETTER U with BREVE
                     "\u041C\u044C",       // CYRILLIC CAPITAL LETTER EM & SMALL LETTER SOFT SIGN
                     "\u041C\u044A",       // CYRILLIC CAPITAL LETTER EM & SMALL LETTER HARD SIGN
                     "\u043C\u044C",       // CYRILLIC SMALL   LETTER EM & SMALL LETTER SOFT SIGN
                     "\u043C\u044A",       // CYRILLIC SMALL   LETTER EM & SMALL LETTER HARD SIGN

                     "\u0418\u0304",       // CYRILLIC CAPITAL LETTER I with COMBINING MACRON
                     "\u0438\u0304",       // CYRILLIC SMALL   LETTER I with COMBINING MACRON
                     "\u0410\u0304",       // CYRILLIC CAPITAL LETTER A with COMBINING MACRON
                     "\u0430\u0304",       // CYRILLIC SMALL   LETTER A with COMBINING MACRON
                     "\u0041\u0304",       // LATIN    CAPITAL LETTER A with COMBINING MACRON
                     "\u0061\u0304",       // LATIN    SMALL   LETTER A with COMBINING MACRON
                     "\u0423\u0304",       // CYRILLIC CAPITAL LETTER U with COMBINING MACRON
                     "\u0443\u0304",       // CYRILLIC SMALL   LETTER U with COMBINING MACRON
                     "\u042E\u0304",       // CYRILLIC CAPITAL LETTER YU with COMBINING MACRON
                     "\u044E\u0304",       // CYRILLIC SMALL   LETTER YU with COMBINING MACRON
                     "\u042F\u0304",       // CYRILLIC CAPITAL LETTER YA with COMBINING MACRON
                     "\u044F\u0304",       // CYRILLIC SMALL   LETTER YA with COMBINING MACRON

                     //"\u0418\u0308",       // CYRILLIC CAPITAL LETTER I with COMBINING DIERESIS
                     //"\u0438\u0308",       // CYRILLIC SMALL   LETTER I with COMBINING DIERESIS
                     "\u0418\u0306",       // CYRILLIC CAPITAL LETTER I with COMBINING BREVE
                     "\u0438\u0306",       // CYRILLIC SMALL   LETTER I with COMBINING BREVE 

                     "\u04E2",             // CYRILLIC CAPITAL LETTER I with MACRON
                     "\u04E3",             // CYRILLIC SMALL   LETTER I with MACRON
                     "ā",
                     "\u0100",             // LATIN CAPITAL LETTER A with MACRON
                     "\u0101",             // LATIN SMALL   LETTER A with MACRON
                     "\u04EE",             // CYRILLIC CAPITAL LETTER U with MACRON
                     "\u04EF",             // CYRILLIC SMALL   LETTER U with MACRON
                     "\u042E",             // CYRILLIC CAPITAL LETTER YU
                     "\u044E",             // CYRILLIC SMALL   LETTER YU
                     "\u042F",             // CYRILLIC CAPITAL LETTER YA
                     "\u044F",             // CYRILLIC SMALL   LETTER YA

                     "\u0418",             // CYRILLIC CAPITAL LETTER I
                     "\u0438",             // CYRILLIC SMALL   LETTER I
                     "\u0410",             // CYRILLIC CAPITAL LETTER A
                     "\u0430",             // CYRILLIC SMALL   LETTER A
                     "\u0423",             // CYRILLIC CAPITAL LETTER U
                     "\u0443",             // CYRILLIC SMALL   LETTER U
                     "\u042B",             // CYRILLIC CAPITAL LETTER YERU
                     "\u044B",             // CYRILLIC SMALL   LETTER YERU

                     "\u04A2",             // CYRILLIC CAPITAL LETTER EN with DESCENDER
                     "\u04A3",             // CYRILLIC SMALL   LETTER EN with DESCENDER
                     "\u04B2",             // CYRILLIC CAPITAL LETTER HA with DESCENDER
                     "\u04B3",             // CYRILLIC SMALL   LETTER HA with DESCENDER
                     //"\u04E4",             // CYRILLIC CAPITAL LETTER I with DIERESIS
                     //"\u04E5",             // CYRILLIC SMALL   LETTER I with DIERESIS
                     //"\u04F0",             // CYRILLIC CAPITAL LETTER U with DIERESIS
                     //"\u04F1",             // CYRILLIC SMALL   LETTER U with DIERESIS
                     "\u0419",             // CYRILLIC CAPITAL LETTER I with BREVE
                     "\u0439",             // CYRILLIC SMALL   LETTER I with BREVE
                     "\u040E",             // CYRILLIC CAPITAL LETTER U with BREVE
                     "\u045E",             // CYRILLIC SMALL   LETTER U with BREVE
                     "\u04F6",             // CYRILLIC CAPITAL LETTER GHE with DESCENDER
                     "\u04F7",             // CYRILLIC SMALL   LETTER GHE with DESCENDER
                     "\u041A",             // CYRILLIC CAPITAL LETTER KA
                     "\u043A",             // CYRILLIC SMALL   LETTER KA
                     "\u041B",             // CYRILLIC CAPITAL LETTER EL
                     "\u043B",             // CYRILLIC SMALL   LETTER EL
                     "\u041C",             // CYRILLIC CAPITAL LETTER EM
                     "\u043C",             // CYRILLIC SMALL   LETTER EM
                     "\u041D",             // CYRILLIC CAPITAL LETTER EN
                     "\u043D",             // CYRILLIC SMALL   LETTER EN
                     "\u041F",             // CYRILLIC CAPITAL LETTER PE
                     "\u043F",             // CYRILLIC SMALL   LETTER PE
                     "\u049A",             // CYRILLIC CAPITAL LETTER KA with DESCENDER
                     "\u049B",             // CYRILLIC SMALL   LETTER KA with DESCENDER
                     "\u0412",             // CYRILLIC CAPITAL LETTER VE
                     "\u0432",             // CYRILLIC SMALL   LETTER VE
                     "\u0413",             // CYRILLIC CAPITAL LETTER GHE
                     "\u0433",             // CYRILLIC SMALL   LETTER GHE
                     "\u0417",             // CYRILLIC CAPITAL LETTER ZE
                     "\u0437",             // CYRILLIC SMALL   LETTER ZE
                     "\u0420",             // CYRILLIC CAPITAL LETTER ER
                     "\u0440",             // CYRILLIC SMALL   LETTER ER
                     "\u0421",             // CYRILLIC CAPITAL LETTER ES
                     "\u0441",             // CYRILLIC SMALL   LETTER ES
                     "\u0422",             // CYRILLIC CAPITAL LETTER TE
                     "\u0442",             // CYRILLIC SMALL   LETTER TE
                     "\u0424",             // CYRILLIC CAPITAL LETTER EF
                     "\u0444",             // CYRILLIC SMALL   LETTER EF
                     "\u0425",             // CYRILLIC CAPITAL LETTER HA
                     "\u0445",             // CYRILLIC SMALL   LETTER HA
                     "\u0428",             // CYRILLIC CAPITAL LETTER SHA
                     "\u0448",             // CYRILLIC SMALL   LETTER SHA
                     ]

    var punctuation = new Set(["'", '\u2019', '.', ',', '!', '?', ';', ':', '\u2500'])

    var result = []

    var start = 0
    var end = word.length

    while (start < end) {
        var found_grapheme = false
		
        for (var i = 0; i < graphemes.length; i++) {
            var grapheme = graphemes[i]
			
            if (word.slice(start, end).startsWith(grapheme)) {
                result.push(grapheme)
                start += grapheme.length
                found_grapheme = true
                break
            }
        }
		
        if (! found_grapheme) {
            var character = word.substring(start, start+1)
			
                if (isAlpha(character)) {
                    result.push(character)
                } else if (keep_punctuation && punctuation.has(character) || !isNaN(character)) {
                    result.push(character)
                }

                start += 1
        }
    } // End 'while' Loop

    return result
}


// undoes the Cyrillic orthography adjustments described in Jacobson (2001)
function undo_cyrillic_adjustments(graphemes) {

    var lzlls = {
        "\u043B":"l",              // CYRILLIC SMALL LETTER EL
        "\u0437":"z",              // CYRILLIC SMALL LETTER ZE
        "\u043B\u044A":"ll",       // CYRILLIC SMALL LETTER EL & SMALL LETTER HARD SIGN
        "\u043B\u044C":"ll",       // CYRILLIC SMALL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0441":"s",              // CYRILLIC SMALL LETTER ES

        "\u041B":"L",              // CYRILLIC CAPITAL LETTER EL
        "\u0417":"Z",              // CYRILLIC CAPITAL LETTER ZE
        "\u0421":"S",              // CYRILLIC CAPITAL LETTER ES
        "\u041B\u044A":"Ll",       // CYRILLIC CAPITAL LETTER EL & SMALL LETTER HARD SIGN
        "\u041B\u044C":"Ll",       // CYRILLIC CAPITAL LETTER EL & SMALL LETTER SOFT SIGN
    }

    var undo_lzlls = {
        "\u044F\u0304":"\u0430\u0430",  // CYRILLIC SMALL LETTER YA with COMBINING MACRON to 'aa'
        "\u044F":"\u0430",              // CYRILLIC SMALL LETTER YA to 'a'
        "\u044E\u0304":"\u0443\u0443",  // CYRILLIC SMALL LETTER YA with COMBINING MACRON to 'uu'
        "\u044E":"\u0443",              // CYRILLIC SMALL LETTER YU to 'u'
    }

    // moves labialization symbol, i.e. Small Letter U with Breve to post-consonant position
    var undo_labialC = {
        "\u043A":"\u043A\u04F1",             // CYRILLIC SMALL LETTER KA & SMALL LETTER U with DIERESIS
        "\u049B":"\u049B\u04F1",             // CYRILLIC SMALL LETTER KA with DESCENDER & SMALL LETTER U with DIERESIS
        "\u04F7":"\u04F7\u04F1",             // CYRILLIC SMALL LETTER GHE with DESCENDER & SMALL LETTER U with DIERESIS
        "\u0445":"\u0445\u04F1",             // CYRILLIC SMALL LETTER HA & SMALL LETTER U with DIERESIS
        "\u04B3":"\u04B3\u04F1",             // CYRILLIC SMALL LETTER HA with DESCENDER & SMALL LETTER U with DIERESIS
        "\u04A3":"\u04A3\u04F1",             // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER U with DIERESIS
        "\u04A3\u044C":"\u04A3\u044C\u04F1", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
        "\u043A":"\u043A\u045E",             // CYRILLIC SMALL LETTER KA & SMALL LETTER U with BREVE
        "\u049B":"\u049B\u045E",             // CYRILLIC SMALL LETTER KA with DESCENDER & SMALL LETTER U with BREVE
        "\u04F7":"\u04F7\u045E",             // CYRILLIC SMALL LETTER GHE with DESCENDER & SMALL LETTER U with BREVE
        "\u0445":"\u0445\u045E",             // CYRILLIC SMALL LETTER HA & SMALL LETTER U with BREVE
        "\u04B3":"\u04B3\u045E",             // CYRILLIC SMALL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u04A3":"\u04A3\u045E",             // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER U with BREVE
        "\u04A3\u044C":"\u04A3\u044C\u045E", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
    }

    var voiceless_C = [
        // stops
        "\u043F",            // CYRILLIC SMALL LETTER PE
        "\u0442",            // CYRILLIC SMALL LETTER TE
        "\u043A",            // CYRILLIC SMALL LETTER KA
        "\u043A\u045E",      // CYRILLIC SMALL LETTER KA & SMALL LETTER U with BREVE
        "\u049B",            // CYRILLIC SMALL LETTER KA with DESCENDER
        "\u043A\u0027",      // CYRILLIC SMALL LETTER KA & APOSTROPHE
        "\u043A\u2019",      // CYRILLIC SMALL LETTER KA & CURLY APOSTROPHE
        "\u049B\u045E",      // CYRILLIC SMALL LETTER KA with DESCENDER & SMALL LETTER U with BREVE 
        "\u043A\u0027\u045E",// CYRILLIC SMALL LETTER KA & APOSTROPHE & SMALL LETTER U with BREVE

        "\u041F",            // CYRILLIC CAPITAL LETTER PE
        "\u0422",            // CYRILLIC CAPITAL LETTER TE
        "\u041A",            // CYRILLIC CAPITAL LETTER KA
        "\u041A\u045E",      // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with BREVE
        "\u049A",            // CYRILLIC CAPITAL LETTER KA with DESCENDER
        "\u041A\u0027",      // CYRILLIC CAPITAL LETTER KA & APOSTROPHE 
        "\u041A\u2019",      // CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE 
        "\u049A\u045E",      // CYRILLIC CAPITAL LETTER KA with DESCENDER & SMALL LETTER U with BREVE
        "\u041A\u0027\u045E",// CYRILLIC CAPITAL LETTER KA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u041A\u2019\u045E",// CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        // voiceless fricatives
        "\u0444",            // CYRILLIC SMALL LETTER EF
        "\u043B\u044A",      // CYRILLIC SMALL LETTER EL & SMALL LETTER HARD SIGN
        "\u043B\u044C",      // CYRILLIC SMALL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0441",            // CYRILLIC SMALL LETTER ES
        "\u0448",            // CYRILLIC SMALL LETTER SHA
        "\u0445",            // CYRILLIC SMALL LETTER HA
        "\u0445\u045E",      // CYRILLIC SMALL LETTER HA & SMALL LETTER U with BREVE
        "\u04B3",            // CYRILLIC SMALL LETTER HA with DESCENDER
        "\u0445\u0027",      // CYRILLIC SMALL LETTER HA & APOSTROPHE
        "\u0445\u2019",      // CYRILLIC SMALL LETTER HA & CURLY APOSTROPHE
        "\u04B3\u045E",      // CYRILLIC SMALL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u0445\u0027\u045E",// CYRILLIC SMALL LETTER HA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0445\u2019\u045E",// CYRILLIC SMALL LETTER HA & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        "\u0424",            // CYRILLIC CAPITAL LETTER EF
        "\u041B\u044A",      // CYRILLIC CAPITAL LETTER EL & SMALL LETTER HARD SIGN
        "\u041B\u044C",      // CYRILLIC CAPITAL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0421",            // CYRILLIC CAPITAL LETTER ES
        "\u0428",            // CYRILLIC CAPITAL LETTER SHA
        "\u0425",            // CYRILLIC CAPITAL LETTER HA
        "\u0425",            // CYRILLIC CAPITAL LETTER HA
        "\u0425\u045E",      // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with BREVE
        "\u04B2",            // CYRILLIC CAPITAL LETTER HA with DESCENDER
        "\u0425\u0027",      // CYRILLIC CAPITAL LETTER HA & APOSTROPHE
        "\u0425\u2019",      // CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE
        "\u04B2\u04F1",      // CYRILLIC CAPITAL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u0425\u0027\u04F1",// CYRILLIC CAPITAL LETTER HA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0425\u2019\u04F1",// CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE & SMALL LETTER U with BREVE
        "\u0413",            // CYRILLIC CAPITAL LETTER GHE

        // voiceless nasals
        "\u043C\u044A",            // CYRILLIC SMALL LETTER EM & SMALL LETTER HARD SIGN
        "\u043C\u044C",            // CYRILLIC SMALL LETTER EM & SMALL LETTER SOFT SIGN
        "\u043D\u044A",            // CYRILLIC SMALL LETTER EN & SMALL LETTER HARD SIGN
        "\u043D\u044C",            // CYRILLIC SMALL LETTER EN & SMALL LETTER SOFT SIGN
        "\u04A3\u044A",            // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN
        "\u043D\u0027\u044A",      // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
        "\u043D\u2019\u044A",      // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
        "\u04A3\u044C",            // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
        "\u043D\u0027\u044C",      // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u043D\u0027\u044C",      // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE   & SMALL LETTER SOFT SIGN
        "\u04A3\u044A\u045E",      // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u043D\u0027\u044A\u045E",// CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u043D\u2019\u044A\u045E",// CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u04A3\u044C\u045E",      // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u043D\u0027\u044C\u045E",// CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u043D\u2019\u044C\u045E",// CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE

        "\u041C\u044A",            // CYRILLIC CAPITAL LETTER EM & SMALL LETTER HARD SIGN
        "\u041C\u044C",            // CYRILLIC CAPITAL LETTER EM & SMALL LETTER SOFT SIGN
        "\u041D\u044A",            // CYRILLIC CAPITAL LETTER EN & SMALL LETTER HARD SIGN
        "\u041D\u044C",            // CYRILLIC CAPITAL LETTER EN & SMALL LETTER SOFT SIGN
        "\u04A2\u044A",            // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN
        "\u041D\u0027\u044A",      // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
        "\u041D\u2019\u044A",      // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
        "\u04A2\u044C",            // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
        "\u041D\u0027\u044C",      // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u041D\u2019\u044C",      // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u04A2\u044A\u045E",      // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044A\u045E",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044A\u045E",// CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u04A2\u044C\u045E",      // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044C\u045E",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044C\u045E",// CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
    ] 

    // rewrite capital voiceless consonants as their lowercase counterparts
    var lowercase_voicelessC = {
        // stops
        "\u041F":"\u043F",                        // CYRILLIC CAPITAL LETTER PE
        "\u0422":"\u0442",                        // CYRILLIC CAPITAL LETTER TE
        "\u041A":"\u043A",                        // CYRILLIC CAPITAL LETTER KA
        "\u041A\u045E":"\u043A\u045E",            // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with BREVE
        "\u049A":"\u049B",                        // CYRILLIC CAPITAL LETTER KA with DESCENDER
        "\u041A\u0027":"\u043A\u0027",            // CYRILLIC CAPITAL LETTER KA & APOSTROPHE 
        "\u041A\u2019":"\u043A\u2019",            // CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE 
        "\u049A\u045E":"\u049B\u045E",            // CYRILLIC CAPITAL LETTER KA with DESCENDER & SMALL LETTER U with BREVE
        "\u041A\u0027\u045E":"\u043A\u0027",      // CYRILLIC CAPITAL LETTER KA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u041A\u2019\u045E":"\u043A\u2019\u045E",// CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        // voiceless fricatives
        "\u0424":"\u0444",                        // CYRILLIC LETTER EF
        "\u041B\u044A":"\u043B\u044A",            // CYRILLIC CAPITAL LETTER EL & SMALL LETTER HARD SIGN
        "\u041B\u044C":"\u041B\u044C",            // CYRILLIC CAPITAL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0421":"\u0441",                        // CYRILLIC CAPITAL LETTER ES
        "\u0428":"\u0448",                        // CYRILLIC CAPITAL LETTER SHA
        "\u0425":"\u0445",                        // CYRILLIC CAPITAL LETTER HA
        "\u0425\u045E":"\u0445\u045E",            // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with BREVE
        "\u04B2":"\u04B3",                        // CYRILLIC CAPITAL LETTER HA with DESCENDER
        "\u0425\u0027":"\u0445\u0027",            // CYRILLIC CAPITAL LETTER HA & APOSTROPHE
        "\u0425\u2019":"\u0445\u2019",            // CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE
        "\u04B2\u04F1":"\u04B3\u04F1",            // CYRILLIC CAPITAL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u0425\u0027\u04F1":"\u0445\u0027\u04F1",// CYRILLIC CAPITAL LETTER HA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0425\u2019\u04F1":"\u0445\u2019\u04F1",// CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE & SMALL LETTER U with BREVE
        //"\u0413":"\u0443",                      // CYRILLIC CAPITAL LETTER GHE - this is left out in cyrilic_to_latin(), idr why but i assume there's good reason

        // voiceless nasals
        "\u041C\u044A":"\u043C\u044A",                        // CYRILLIC CAPITAL LETTER EM & SMALL LETTER HARD SIGN
        "\u041C\u044C":"\u043C\u044C",                        // CYRILLIC CAPITAL LETTER EM & SMALL LETTER SOFT SIGN
        "\u041D\u044A":"\u043D\u044A",                        // CYRILLIC CAPITAL LETTER EN & SMALL LETTER HARD SIGN
        "\u041D\u044C":"\u043D\u044C",                        // CYRILLIC CAPITAL LETTER EN & SMALL LETTER SOFT SIGN
        "\u04A2\u044A":"\u04A3\u044A",                        // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN
        "\u041D\u0027\u044A":"\u043D\u0027\u044A",            // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
        "\u041D\u2019\u044A":"\u043D\u2019\u044A",            // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
        "\u04A2\u044C":"\u04A3\u044C",                        // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
        "\u041D\u0027\u044C":"\u043D\u0027\u044C",            // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u041D\u2019\u044C":"\u043D\u2019\u044C",            // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u04A2\u044A\u045E":"\u04A3\u044A\u045E",            // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044A\u045E":"\u043D\u0027\u044A\u045E",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044A\u045E":"\u043D\u2019\u044A\u045E",// CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u04A2\u044C\u045E":"\u04A3\u044C\u045E",            // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044C\u045E":"\u043D\u0027\u044C\u045E",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044C\u045E":"\u043D\u2019\u044C\u045E",// CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
    }

    var result = []

    for (var i = 0; i < graphemes.length; i++) {
        var grapheme = graphemes[i]

        // ADJUSTMENT - restore the Cyrillic letter -e to word-initial position before a cluster
        //              of voiceless consonants 
        if (i == 0 && graphemes.length > 1 && voiceless_C.includes(grapheme) && voiceless_C.includes(graphemes[i+1])) {
            if (grapheme in lowercase_voicelessC) {
                result.push("\u042B") // CYRILLIC CAPITAL LETTER YERU
                result.push(lowercase_voicelessC[grapheme])
            }
            else {
                result.push("\u044B") // CYRILLIC SMALL LETTER YERU
                result.push(grapheme)
            }
       }

        // ADJUSTMENT 2: delete the Cyrillic hard or soft sign that is inserted between 'ya'/'yu' and a consonant
        else if (i < graphemes.length - 1 && grapheme == "\u044A" && graphemes[i+1] in undo_lzlls) {
            result.push(graphemes[i+1])
            i++
        }
        else if (i < graphemes.length - 1 && grapheme == "\u044C" && graphemes[i+1] in undo_lzlls) {
            result.push(graphemes[i+1])
            i++
        }

        // ADJUSTMENT 3: rewrite the 'ya', 'yu' Cyrillic representations as 'a' and 'u'
        //               if they follow the Cyrillic representations of 'l', 'z', 'll', 's'
        else if (i < graphemes.length - 1 && grapheme in lzlls && graphemes[i+1] in undo_lzlls) {
            result.push(grapheme, undo_lzlls[graphemes[i+1]])
            i++
        }

        // ADJUSTMENT - move any labialization symbol that appears before the consonant it labializes
        //              to the position after the consonant
        else if (i < graphemes.length - 1 && grapheme == "\u045E" && graphemes[i+1] in undo_labialC) {
            result.push(undo_labialC[graphemes[i+1]])
            i++
        }

        // no applicable adjustments
        else {
            result.push(grapheme)
        }
    }

    return result
}


// transliterates Cyrillic graphemes to Latin graphemes
function cyrillic_to_latin(graphemes) {

    var vowels = {
        "\u0438":"i",               // CYRILLIC SMALL LETTER I
        "\u0430":"a",               // CYRILLIC SMALL LETTER A
        "\u0443":"u",               // CYRILLIC SMALL LETTER U
        "\u044B":"e",               // CYRILLIC SMALL LETTER YERU

        "\u0418":"I",               // I to CYRILLIC CAPITAL LETTER I
        "\u0410":"A",               // A to CYRILLIC CAPITAL LETTER A
        "\u0423":"U",               // U to CYRILLIC CAPITAL LETTER U
        "\u042B":"E",               // E to CYRILLIC CAPITAL LETTER YERU

        "\u0438\u0304":"ii",        // CYRILLIC SMALL LETTER I with COMBINING MACRON
        "ā":"aa",
        "\u0430\u0304":"aa",        // CYRILLIC SMALL LETTER A with COMBINING MACRON
        "\u0061\u0304":"aa",        // LATIN SMALL LETTER A with COMBINING MACRON
        "\u0443\u0304":"uu",        // CYRILLIC SMALL LETTER U with COMBINING MACRON
        "\u04E3":"ii",              // CYRILLIC SMALL LETTER I with MACRON
        "\u04EF":"uu",              // CYRILLIC SMALL LETTER U with MACRON

        "\u04E2":"Ii",              // CYRILLIC CAPITAL LETTER I with MACRON
        "\u0410\u0304":"Aa",        // CYRILLIC CAPITAL LETTER A with MACRON
        "\u04EE":"Uu",              // CYRILLIC CAPITAL LETTER U with MACRON

        "\u044F":"ya",              // CYRILLIC SMALL LETTER YA
        "\u044E":"yu",              // CYRILLIC SMALL LETTER YU

        "\u042F":"Ya",              // CYRILLIC CAPITAL LETTER YA
        "\u042E":"Yu",              // CYRILLIC CAPITAL LETTER YU

        "\u044F\u0304":"yaa",       // CYRILLIC SMALL LETTER YA with MACRON
        "\u044E\u0304":"yuu",       // CYRILLIC SMALL LETTER YU with MACRON

        "\u042F\u0304":"Yaa",       // CYRILLIC CAPITAL LETTER YA with MACRON
        "\u042E\u0304":"Yuu",       // CYRILLIC CAPITAL LETTER YU with MACRON
    }

    var consonants= {
        // stops
        "\u043F":"p",               // CYRILLIC SMALL LETTER PE
        "\u0442":"t",               // CYRILLIC SMALL LETTER TE
        "\u043A":"k",               // CYRILLIC SMALL LETTER KA
        //"\u043A\u04F1":"kw",        // CYRILLIC SMALL LETTER KA & SMALL LETTER U with DIERESIS
        "\u043A\u045E":"kw",        // CYRILLIC SMALL LETTER KA & SMALL LETTER U with BREVE
        "\u049B":"q",               // CYRILLIC SMALL LETTER KA with DESCENDER
        "\u043A\u0027":"q",         // CYRILLIC SMALL LETTER KA & APOSTROPHE
        "\u043A\u2019":"q",         // CYRILLIC SMALL LETTER KA & CURLY APOSTROPHE
        //"\u049B\u04F1":"qw",        // CYRILLIC SMALL LETTER KA with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u043A\u0027\u04F1":"qw",  // CYRILLIC SMALL LETTER KA & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u049B\u045E":"qw",        // CYRILLIC SMALL LETTER KA with DESCENDER & SMALL LETTER U with BREVE 
        "\u043A\u0027\u045E":"qw",  // CYRILLIC SMALL LETTER KA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u043A\u2019\u045E":"qw",  // CYRILLIC SMALL LETTER KA & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        "\u041F":"P",               // CYRILLIC CAPITAL LETTER PE
        "\u0422":"T",               // CYRILLIC CAPITAL LETTER TE
        "\u041A":"K",               // CYRILLIC CAPITAL LETTER KA
        //"\u041A\u04F1":"Kw",        // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with DIERESIS
        "\u041A\u045E":"Kw",        // CYRILLIC CAPITAL LETTER KA & SMALL LETTER U with BREVE
        "\u049A":"Q",               // CYRILLIC CAPITAL LETTER KA with DESCENDER
        "\u041A\u0027":"Q",         // CYRILLIC CAPITAL LETTER KA & APOSTROPHE 
        "\u041A\u2019":"Q",         // CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE 
        //"\u049A\u04F1":"Qw",        // CYRILLIC CAPITAL LETTER KA with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u041A\u0027\u04F1":"Qw",  // CYRILLIC CAPITAL LETTER KA & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u049A\u045E":"Qw",        // CYRILLIC CAPITAL LETTER KA with DESCENDER & SMALL LETTER U with BREVE
        "\u041A\u0027\u045E":"Qw",  // CYRILLIC CAPITAL LETTER KA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u041A\u2019\u045E":"Qw",  // CYRILLIC CAPITAL LETTER KA & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        // voiced fricatives
        "\u0432":"v",              // CYRILLIC SMALL LETTER VE
        "\u043B":"l",              // CYRILLIC SMALL LETTER EL
        "\u0437":"z",              // CYRILLIC SMALL LETTER ZE
        //"\u0438\u0308":"y",        // CYRILLIC SMALL LETTER I with COMBINING DIERESIS
        "\u0438\u0306":"y",        // CYRILLIC SMALL LETTER I with COMBINING BREVE
        "\u0439":"y",              // CYRILLIC SMALL LETTER I with BREVE
        "\u0440":"r",              // CYRILLIC SMALL LETTER ER
        "\u0433":"g",              // CYRILLIC SMALL LETTER GHE
        //"\u04F1":"w",              // CYRILLIC SMALL LETTER U with DIERESIS
        "\u045E":"w",              // CYRILLIC SMALL LETTER U with BREVE
        "\u04F7":"gh",             // CYRILLIC SMALL LETTER GHE with DESCENDER
        "\u0433\u0027":"gh",       // CYRILLIC SMALL LETTER GHE & APOSTROPHE 
        "\u0433\u2019":"gh",       // CYRILLIC SMALL LETTER GHE & CURLY APOSTROPHE 
        //"\u04F7\u04F1":"ghw",      // CYRILLIC SMALL LETTER GHE with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u0433\u0027\u04F1":"ghw",// CYRILLIC SMALL LETTER GHE & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04F7\u045E":"ghw",      // CYRILLIC SMALL LETTER GHE with DESCENDER & SMALL LETTER U with BREVE
        "\u0433\u0027\u045E":"ghw",// CYRILLIC SMALL LETTER GHE & APOSTROPHE & SMALL LETTER U with BREVE 
        "\u0433\u2019\u045E":"ghw",// CYRILLIC SMALL LETTER GHE & CURLY APOSTROPHE & SMALL LETTER U with BREVE 

        "\u0412":"V",              // CYRILLIC CAPITAL LETTER VE
        "\u041B":"L",              // CYRILLIC CAPITAL LETTER EL
        "\u0417":"Z",              // CYRILLIC CAPITAL LETTER ZE
        //"\u0418\u0308":"Y",        // CYRILLIC CAPITAL LETTER I with COMBINING DIERESIS
        "\u0418\u0306":"Y",        // CYRILLIC CAPITAL LETTER I with COMBINING BREVE
        "\u04E4":"Y",              // CYRILLIC CAPITAL LETTER I with DIERESIS
        "\u0419":"Y",              // CYRILLIC CAPITAL LETTER I with BREVE
        "\u0420":"R",              // CYRILLIC CAPITAL LETTER ER
        "\u0413":"G",              // CYRILLIC CAPITAL LETTER GHE
        //"\u04F0":"W",              // CYRILLIC CAPITAL LETTER U with DIERESIS
        "\u040E":"W",              // CYRILLIC CAPITAL LETTER U with BREVE
        "\u04F6":"Gh",             // CYRILLIC CAPITAL LETTER GHE with DESCENDER
        "\u0413\u0027":"Gh",       // CYRILLIC CAPITAL LETTER GHE & APOSTROPHE
        "\u0413\u2019":"Gh",       // CYRILLIC CAPITAL LETTER GHE & CURLY APOSTROPHE
        //"\u04F6\u04F1":"Ghw",      // CYRILLIC CAPITAL LETTER GHE with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u0413\u0027\u04F1":"Ghw",// CYRILLIC CAPITAL LETTER GHE & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04F6\u045E":"Ghw",      // CYRILLIC CAPITAL LETTER GHE with DESCENDER & SMALL LETTER U with BREVE
        "\u0413\u0027\u045E":"Ghw",// CYRILLIC CAPITAL LETTER GHE & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0413\u2019\u045E":"Ghw",// CYRILLIC CAPITAL LETTER GHE & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        // voiceless fricatives
        "\u0444":"f",               // CYRILLIC SMALL LETTER EF
        "\u043B\u044A":"ll",        // CYRILLIC SMALL LETTER EL & SMALL LETTER HARD SIGN
        "\u043B\u044C":"ll",        // CYRILLIC SMALL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0441":"s",               // CYRILLIC SMALL LETTER ES
        "\u0448":"rr",              // CYRILLIC SMALL LETTER SHA
        "\u0445":"gg",              // CYRILLIC SMALL LETTER HA
        //"\u0445\u04F1":"wh",        // CYRILLIC SMALL LETTER HA & SMALL LETTER U with DIERESIS
        "\u0445\u045E":"wh",        // CYRILLIC SMALL LETTER HA & SMALL LETTER U with BREVE
        "\u04B3":"ghh",             // CYRILLIC SMALL LETTER HA with DESCENDER
        "\u0445\u0027":"ghh",       // CYRILLIC SMALL LETTER HA & APOSTROPHE
        "\u0445\u2019":"ghh",       // CYRILLIC SMALL LETTER HA & CURLY APOSTROPHE
        //"\u04B3\u04F1":"ghhw",      // CYRILLIC SMALL LETTER HA with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u0445\u0027\u04F1":"ghhw",// CYRILLIC SMALL LETTER HA & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04B3\u045E":"ghhw",      // CYRILLIC SMALL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u0445\u0027\u045E":"ghhw",// CYRILLIC SMALL LETTER HA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0445\u2019\u045E":"ghhw",// CYRILLIC SMALL LETTER HA & CURLY APOSTROPHE & SMALL LETTER U with BREVE
        //"\u0443":"h",               // CYRILLIC SMALL LETTER GHE - idr why this was excluded but it's handled in spellcheck_cyr()

        "\u0424":"F",               // CYRILLIC CAPITAL LETTER EF
        "\u041B\u044A":"Ll",        // CYRILLIC CAPITAL LETTER EL & SMALL LETTER HARD SIGN
        "\u041B\u044C":"Ll",        // CYRILLIC CAPITAL LETTER EL & SMALL LETTER SOFT SIGN
        "\u0421":"S",               // CYRILLIC CAPITAL LETTER ES
        "\u0428":"Rr",              // CYRILLIC CAPITAL LETTER SHA
        "\u0425":"Gg",              // CYRILLIC CAPITAL LETTER HA
        "\u0425":"Gg",              // CYRILLIC CAPITAL LETTER HA
        //"\u0425\u04F1":"Wh",        // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with DIERESIS
        "\u0425\u045E":"Wh",        // CYRILLIC CAPITAL LETTER HA & SMALL LETTER U with BREVE
        "\u04B2":"Ghh",             // CYRILLIC CAPITAL LETTER HA with DESCENDER
        "\u0425\u0027":"Ghh",       // CYRILLIC CAPITAL LETTER HA & APOSTROPHE
        "\u0425\u2019":"Ghh",       // CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE
        //"\u04B2\u04F1":"Ghhw",      // CYRILLIC CAPITAL LETTER HA with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u0425\u0027\u04F1":"Ghhw",// CYRILLIC CAPITAL LETTER HA & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04B2\u04F1":"Ghhw",      // CYRILLIC CAPITAL LETTER HA with DESCENDER & SMALL LETTER U with BREVE
        "\u0425\u0027\u04F1":"Ghhw",// CYRILLIC CAPITAL LETTER HA & APOSTROPHE & SMALL LETTER U with BREVE
        "\u0425\u2019\u04F1":"Ghhw",// CYRILLIC CAPITAL LETTER HA & CURLY APOSTROPHE & SMALL LETTER U with BREVE
        "\u0413":"H",               // CYRILLIC CAPITAL LETTER GHE

        // voiced nasals
        "\u043C":"m",              // CYRILLIC SMALL LETTER EM
        "\u043D":"n",              // CYRILLIC SMALL LETTER EN
        "\u04A3":"ng",             // CYRILLIC SMALL LETTER EN with DESCENDER
        "\u043D\u0027":"ng",       // CYRILLIC SMALL LETTER EN & APOSTROPHE
        "\u043D\u2019":"ng",       // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE
        //"\u04A3\u04F1":"ngw",      // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u043D\u0027\u04F1":"ngw",// CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04A3\u045E":"ngw",      // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER U with BREVE 
        "\u043D\u0027\u045E":"ngw",// CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER U with BREVE
        "\u043D\u2019\u045E":"ngw",// CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        "\u041C":"M",              // CYRILLIC CAPITAL LETTER EM
        "\u041D":"N",              // CYRILLIC CAPITAL LETTER EN
        "\u04A2":"Ng",             // CYRILLIC CAPITAL LETTER EN with DESCENDER
        "\u041D\u0027":"Ng",       // CYRILLIC CAPITAL LETTER EN & APOSTROPHE
        "\u041D\u2019":"Ng",       // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE
        //"\u04A2\u04F1":"Ngw",      // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER U with DIERESIS
        //"\u041D\u0027\u04F1":"Ngw",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER U with DIERESIS
        "\u04A2\u045E":"Ngw",      // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER U with BREVE 
        "\u041D\u0027\u045E":"Ngw",// CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER U with BREVE
        "\u041D\u2019\u045E":"Ngw",// CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER U with BREVE

        // voiceless nasals
        "\u043C\u044A":"mm",                // CYRILLIC SMALL LETTER EM & SMALL LETTER HARD SIGN
        "\u043C\u044C":"mm",                // CYRILLIC SMALL LETTER EM & SMALL LETTER SOFT SIGN
        "\u043D\u044A":"nn",                // CYRILLIC SMALL LETTER EN & SMALL LETTER HARD SIGN
        "\u043D\u044C":"nn",                // CYRILLIC SMALL LETTER EN & SMALL LETTER SOFT SIGN
        "\u04A3\u044A":"ngng",              // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN
        "\u043D\u0027\u044A":"ngng",        // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
        "\u043D\u2019\u044A":"ngng",        // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
        "\u04A3\u044C":"ngng",              // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
        "\u043D\u0027\u044C":"ngng",        // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u043D\u0027\u044C":"ngng",        // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE   & SMALL LETTER SOFT SIGN
        //"\u04A3\u044A\u04F1":"ngngw",       // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
        //"\u043D\u0027\u044A\u04F1":"ngngw", // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
        //"\u04A3\u044C\u04F1":"ngngw",       // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
        //"\u043D\u0027\u044C\u04F1":"ngngw", // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
        "\u04A3\u044A\u045E":"ngngw",       // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u043D\u0027\u044A\u045E":"ngngw", // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u043D\u2019\u044A\u045E":"ngngw", // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u04A3\u044C\u045E":"ngngw",       // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u043D\u0027\u044C\u045E":"ngngw", // CYRILLIC SMALL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u043D\u2019\u044C\u045E":"ngngw", // CYRILLIC SMALL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE

        "\u041C\u044A":"Mm",                // CYRILLIC CAPITAL LETTER EM & SMALL LETTER HARD SIGN
        "\u041C\u044C":"Mm",                // CYRILLIC CAPITAL LETTER EM & SMALL LETTER SOFT SIGN
        "\u041D\u044A":"Nn",                // CYRILLIC CAPITAL LETTER EN & SMALL LETTER HARD SIGN
        "\u041D\u044C":"Nn",                // CYRILLIC CAPITAL LETTER EN & SMALL LETTER SOFT SIGN
        "\u04A2\u044A":"Ngng",              // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN
        "\u041D\u0027\u044A":"Ngng",        // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN
        "\u041D\u2019\u044A":"Ngng",        // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN
        "\u04A2\u044C":"Ngng",              // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
        "\u041D\u0027\u044C":"Ngng",        // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN
        "\u041D\u2019\u044C":"Ngng",        // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN
        //"\u04A2\u044A\u04F1":"Ngngw",       // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
        //"\u041D\u0027\u044A\u04F1":"Ngngw", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with DIERESIS
        //"\u04A2\u044C\u04F1":"Ngngw",       // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
        //"\u041D\u0027\u044C\u04F1":"Ngngw", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
        "\u04A2\u044A\u045E":"Ngngw",       // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044A\u045E":"Ngngw", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044A\u045E":"Ngngw", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER HARD SIGN & SMALL LETTER U with BREVE
        "\u04A2\u044C\u045E":"Ngngw",       // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u0027\u044C\u045E":"Ngngw", // CYRILLIC CAPITAL LETTER EN & APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
        "\u041D\u2019\u044C\u045E":"Ngngw", // CYRILLIC CAPITAL LETTER EN & CURLY APOSTROPHE & SMALL LETTER SOFT SIGN & SMALL LETTER U with BREVE
    }

    var result = []

    for (var i = 0; i < graphemes.length; i++) {
        var grapheme = graphemes[i]

        if (grapheme in vowels) {
            result.push(vowels[grapheme])
        } else if (grapheme in consonants) {
            result.push(consonants[grapheme])
        } else {
            result.push(grapheme)
        }
    }

    // TODO: will need to change this back so latin output undoubles
    //word = tokens_to_string(undouble(result))
    word = tokens_to_string(result)

    return spellcheck_cyr(word)
}


// applies the Latin orthography's undoubling rules described in Jacobson (2001)
function undouble(graphemes) {

    var doubled_fricative    = new Set(['ll', 'rr', 'gg', 'ghh', 'ghhw'])
    var doubled_nasal     = new Set(['nn', 'mm', 'ngng', 'ngngw'])

    var doubleable_fricative = new Set(['l', 'r', 'g', 'gh', 'ghw'])

    var undoubleable_unvoiced_consonant = new Set(['p', 't', 'k', 'kw', 'q', 'qw', 'f', 's', 'wh'])

    var undouble={'ll'  : 'l',
                  'rr'  : 'r',
                  'gg'  : 'g',
                  'ghh' : 'gh',
                  'ghhw': 'ghw',
                  'nn'  : 'n',
                  'mm'  : 'm',
                  'ngng' : 'ng',
                  'ngngw': 'ngw'}

    var result = graphemes.slice(0) // copy the list of graphemes

    var i = 0

    while (i+1 < result.length) {
        var first = result[i]
        var second = result[i+1]
	
        // Rule 1a
        if (doubled_fricative.has(first) && undoubleable_unvoiced_consonant.has(second)) {
            result[i] = undouble[first]
            i += 2
        }
        // Rule 1b
        else if (undoubleable_unvoiced_consonant.has(first) && doubled_fricative.has(second)) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 2
        else if (undoubleable_unvoiced_consonant.has(first) && doubled_nasal.has(second)) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 3a
        else if (doubled_fricative.has(first) && (doubled_fricative.has(second) || doubled_nasal.has(second))) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 3b
        else if ((doubled_fricative.has(first) || doubled_nasal.has(first)) && second=='ll') {
            result[i] = undouble[first]
            i += 2
        }
        else {
            i += 1	
        }
    } // end 'while' Loop
	
    return result
}


function spellcheck_cyr(word) {

    var rewriteH = {"aagaaleketiiq":"aahaaleketiiq",
                    "aagaangwliq":"aahaangwliq",
                    "agaa":"ahaa",
                    "agaam":"ahaam",
                    "agaamangam":"ahaamangam",
                    "agaaw":"ahaaw",
                    "agay":"ahay",
                    "gaam":"haam",
                    "gaamangam":"haamangam",
                    "gaanta":"haanta",
                    "gaatwarae":"haatwarare",
                    "gaaw":"haaw",
                    "gay":"hay",
                    "geng":"heng",
                    "guk":"huk",
                    "guusae":"huusae",
                    "guuy":"huuy",
                    "iьi":"ihi",
                    "iьiьiьiy":"ihihihiy",
                    "iьiьiьiyagh":"ihihihiyagh",
                    "iьik":"ihik",
                    // "sааpghanghilnguq":"saaphanghilnguq",
                    "uuьuk":"uuhuk",
                    "uuьuuk":"uuhuuk",
                    "wuguguguguu":"wuhuhuhuhuu",
                    }

    if (word in rewriteH) {
        return tokenize_cyr(rewriteH[word])
    } else {
        return tokenize_cyr(word)
    }
}
