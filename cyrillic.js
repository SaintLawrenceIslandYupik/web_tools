function tokenize_cyrillic(word, keep_punctuation) {
    if (keep_punctuation === undefined) {
        keep_punctuation = false
    }

    var graphemes = ["\u0438", "\u0430", "\u0443", "\u044B",    // Vowels (Lowercased)
                     "\u0418", "\u0410", "\u0423", "\u042B",    // Vowels (Uppercased)
                     "\u043F", "\u0442", "\u043A", "\u043A\u04F1", "\u049B", "\u049B\u04F1",    // Stops (L)
                     "\u041F", "\u0422", "\u041A", "\u041A\u04F1", "\u049A", "\u049A\u04F1",    // Stops (U)
                     "\u0432", "\u043B", "\u0437", "\u04E5", "\u0440", "\u0433", "\u04F1", "\u04F7", "\u04F7\u04F1",    // Voiced fricatives (L)
                     "\u0412", "\u041B", "\u0417", "\u04E4", "\u0420", "\u0413", "\u04F0", "\u04F6", "\u04F6\u04F1",    // Voiced fricatives (U)
                     "\u0444", "\u043B\u044C", "\u0441", "\u0448", "\u0445", "\u0445\u04F1", "\u04B3", "\u04B3\u04F1", "\u0433",    // Voiceless fricatives (L)
                     "\u0444", "\u041B\u044C", "\u0421", "\u0428", "\u0425", "\u0425\u04F1", "\u04B2", "\u04B2\u04F1", "\u0413",    // Voiceless fricatives (U)
                     "\u043C", "\u043D", "\u04A3", "\u04A3\u04F1",    // Voiced nasals (L)
                     "\u041C", "\u041D", "\u04A2", "\u04A2\u04F1",    // Voiced nasals (U)
                     "\u043C\u044C", "\u043D\u044C", "\u04A3\u044C", "\u04A3\u044C\u04F1",    // Voiceless nasals (L)
                     "\u041C\u044C", "\u041D\u044C", "\u04A2\u044C", "\u04A2\u044C\u04F1"]    // Voiceless nasals (U)

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



/**
// Transliterates Cyrillic graphemes to Latin graphemes
function cyrillic_to_latin(graphemes) {

    var shortVowels = {
        "\u0438":"i",                // CYRILLIC SMALL LETTER I 
        "\u0430":"a",                // CYRILLIC SMALL LETTER A
        "\u0443":"u",                // CYRILLIC SMALL LETTER U
        "\u044B":"e",                // CYRILLIC SMALL LETTER YERU

        "\u0418":"I",                // I to CYRILLIC CAPITAL LETTER I
        "\u0410":"A",                // A to CYRILLIC CAPITAL LETTER A
        "\u0423":"U",                // U to CYRILLIC CAPITAL LETTER U
        "\u042B":"E",                // E to CYRILLIC CAPITAL LETTER YERU
    }

    var consonants= {
        // Stops                                                                                                                      
        "\u043F":"p",               // CYRILLIC SMALL LETTER PE
        "\u0442":"t",               // CYRILLIC SMALL LETTER TE
        "\u043A":"k",               // CYRILLIC SMALL LETTER KA
        "\u043A\u04F1":"kw",        // CYRILLIC SMALL LETTER KA and SMALL LETTER U with DIERESIS
        "\u049B":"q",               // CYRILLIC SMALL LETTER KA with DESCENDER
        "\u049B\u04F1":"qw",        // CYRILLIC SMALL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS 

        "\u041F":"P",               // CYRILLIC CAPITAL LETTER PE
        "\u0422":"T",               // CYRILLIC CAPITAL LETTER TE
        "\u041A":"K",               // CYRILLIC CAPITAL LETTER KA
        "\u041A\u04F1":"Kw",        // CYRILLIC CAPITAL LETTER KA and SMALL LETTER U with DIERESIS
        "\u049A":"Q",               // CYRILLIC CAPITAL LETTER KA with DESCENDER
        "\u049A\u04F1":"Qw",        // CYRILLIC CAPITAL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS

        // Voiced fricatives                                                                                                          
        "\u0432":"v",              // CYRILLIC SMALL LETTER VE
        "\u043B":"l",              // CYRILLIC SMALL LETTER EL
        "\u0437":"z",              // CYRILLIC SMALL LETTER ZE
        "\u04E5":"y",              // CYRILLIC SMALL LETTER I with DIERESIS
        "\u0440":"r",              // CYRILLIC SMALL LETTER ER
        "\u0433":"g",              // CYRILLIC SMALL LETTER GHE
        "\u04F1":"w",              // CYRILLIC SMALL LETTER U with DIERESIS 
        "\u04F7":"gh",             // CYRILLIC SMALL LETTER GHE with DESCENDER
        "\u04F7\u04F1":"ghw"       // CYRILLIC SMALL LETTER GHE with DESCENDER and SMALL LETTER U with DIERESIS 

        "\u0412":"V",              // CYRILLIC CAPITAL LETTER VE
        "\u041B":"L",              // CYRILLIC CAPITAL LETTER EL
        "\u0417":"Z",              // CYRILLIC CAPITAL LETTER ZE
        "\u04E4":"Y",              // CYRILLIC CAPITAL LETTER I with DIERESIS
        "\u0420":"R",              // CYRILLIC CAPITAL LETTER ER
        "\u0413":"G",              // CYRILLIC CAPITAL LETTER GHE
        "\u04F0":"W",              // CYRILLIC CAPITAL LETTER U with DIERESIS 
        "\u04F6":"Gh",             // CYRILLIC CAPITAL LETTER GHE with DESCENDER
        "\u04F6\u04F1":"Ghw",      // CYRILLIC CAPITAL LETTER GHE with DESCENDER

        // Voiceless fricatives                                                                                                       
        "\u0444":"f",             // CYRILLIC SMALL LETTER EF
        "\u043B\u044C":"ll",      // CYRILLIC SMALL LETTER EL and SMALL LETTER SOFT SIGN
        "\u0441":"s",             // CYRILLIC SMALL LETTER ES
        "\u0448":"rr",            // CYRILLIC SMALL LETTER SHA
        "\u0445":"gg",            // CYRILLIC SMALL LETTER HA
        "\u0445\u04F1":"wh",      // CYRILLIC SMALL LETTER HA and SMALL LETTER U with DIERESIS
        "\u04B3":"ghh",           // CYRILLIC SMALL LETTER HA with DESCENDER
        "\u04B3\u04F1":"ghhw",    // CYRILLIC SMALL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS
        "\u0433":"h",             // CYRILLIC SMALL LETTER GHE

        "\u0444":"F",             // CYRILLIC CAPITAL LETTER EF
        "\u041B\u044C":"Ll",      // CYRILLIC CAPITAL LETTER EL and SMALL LETTER SOFT SIGN
        "\u0421":"S",             // CYRILLIC CAPITAL LETTER ES
        "\u0428":"Rr",            // CYRILLIC CAPITAL LETTER SHA 
        "\u0425":"Gg",            // CYRILLIC CAPITAL LETTER HA 
        "\u0425":"Gg",            // CYRILLIC CAPITAL LETTER HA 
        "\u0425\u04F1":"Wh",      // CYRILLIC CAPITAL LETTER HA and SMALL LETTER U with DIERESIS 
        "\u04B2":"Ghh",           // CYRILLIC CAPITAL LETTER HA with DESCENDER 
        "\u04B2\u04F1":"Ghhw",    // CYRILLIC CAPITAL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS 
        "\u0413":"H",             // CYRILLIC CAPITAL LETTER GHE

        // Voiced nasals                                                                                                              
        "\u043C":"m",              // CYRILLIC SMALL LETTER EM
        "\u043D":"n",              // CYRILLIC SMALL LETTER EN
        "\u04A3":"ng",             // CYRILLIC SMALL LETTER EN with DESCENDER
        "\u04A3\u04F1":"ngw",      // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER U with DIERESIS

        "\u041C":"M",              // CYRILLIC CAPITAL LETTER EM
        "\u041D":"N",              // CYRILLIC CAPITAL LETTER EN
        "\u04A2":"Ng",             // CYRILLIC CAPITAL LETTER EN with DESCENDER
        "\u04A2\u04F1":"Ngw",      // CYRILLIC CAPITAL LETTER EN with DESCENDER and SMALL LETTER U with DIERESIS

        // Voiceless nasals                                                                                                           
        "\u043C\u044C":"mm",          // CYRILLIC SMALL LETTER EM and SMALL LETTER SOFT SIGN
        "\u043D\u044C":"nn",          // CYRILLIC SMALL LETTER EN and SMALL LETTER SOFT SIGN
        "\u04A3\u044C":"ngng",        // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER SOFT SIGN
        "\u04A3\u044C\u04F1":"ngngw", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS

        "\u041C\u044C":"Mm",          // CYRILLIC CAPITAL LETTER EM and SMALL LETTER SOFT SIGN
        "\u041D\u044C":"Nn",          // CYRILLIC CAPITAL LETTER EN and SMALL LETTER SOFT SIGN
        "\u04A2\u044C":"Ngng",        // CYRILLIC CAPITAL LETTER EN with DESCENDER and SMALL LETTER SOFT SIGN
        "\u04A2\u044C\u04F1":"Ngngw", // CYRILLIC CAPITAL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
    }   

    var result = []

    for (var i = 0; i < graphemes.length; i++) {
        var grapheme = graphemes[i]

        if (grapheme in shortVowels) {
            result.push(shortVowels[grapheme])
        } else if (grapheme in consonants) {
            result.push(consonants[grapheme])
        } else {
            result.push(grapheme)
        }
    }

    return result
}
*/
