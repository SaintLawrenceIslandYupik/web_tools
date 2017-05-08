function tokenize_cyr(word, keep_punctuation) {
    if (keep_punctuation === undefined) {
        keep_punctuation = false
    }

    var graphemes = ["\u04A2\u044C\u04F1", "\u04A3\u044C\u04F1", "\u04A2\u044C", "\u04A3\u044C", "\u04A2\u04F1", "\u04A3\u04F1",
                     "\u04B2\u04F1", "\u04B3\u04F1", "\u04F6\u04F1", "\u04F7\u04F1", "\u041A\u04F1", "\u043A\u04F1",
                     "\u041B\u044C", "\u043B\u044C", "\u041D\u044C", "\u043D\u044C", "\u0425\u04F1", "\u0445\u04F1",
                     "\u041C\u044C", "\u043C\u044C", "\u049A\u04F1", "\u049B\u04F1",
                     "\u0430\u0304",
                     "\u04A2", "\u04A3", "\u04B2", "\u04B3", "\u04E4", "\u04E5", "\u04F0", "\u04F1", "\u04F6", "\u04F7",
                     "\u041A", "\u043A", "\u041B", "\u043B", "\u041C", "\u043C", "\u041D", "\u043D", "\u041F", "\u043F",
                     "\u042B", "\u044B", "\u049A", "\u049B",
                     "\u0410", "\u0430", "\u0412", "\u0432", "\u0413", "\u0433", "\u0417", "\u0437", "\u0418", "\u0438",
                     "\u0420", "\u0440", "\u0421", "\u0441", "\u0422", "\u0442", "\u0423", "\u0443", "\u0424", "\u0444",
                     "\u0425", "\u0445", "\u0428", "\u0448",
                     "\u04E2", "\u04E3", "\u0100", "\u0101", "\u04EE", "\u04EF",
                     "\u044E\u0304", "\u044F\u0304", "\u042E", "\u044E", "\u042F", "\u044F"]

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


// Undoes the Cyrillic orthography adjustments
function undo_cyrillic_adjustments(graphemes) {

    var lzlls = { 
        "\u043B":"l",              // CYRILLIC SMALL LETTER EL
        "\u0437":"z",              // CYRILLIC SMALL LETTER ZE
        "\u043B\u044C":"ll",       // CYRILLIC SMALL LETTER EL and SMALL LETTER SOFT SIGN
        "\u0441":"s",              // CYRILLIC SMALL LETTER ES

        "\u041B":"L",              // CYRILLIC CAPITAL LETTER EL
        "\u0417":"Z",              // CYRILLIC CAPITAL LETTER ZE
        "\u0421":"S",              // CYRILLIC CAPITAL LETTER ES
        "\u041B\u044C":"Ll",       // CYRILLIC CAPITAL LETTER EL and SMALL LETTER SOFT SIGN
    }  

    var undo_lzlls = {
        "\u044F":"\u0430",         // CYRILLIC SMALL LETTER YA to 'a'
        "\u044E":"\u0443",         // CYRILLIC SMALL LETTER YU to 'u'
    }

    // Moves labialization symbol, i.e. Small Letter U with Dieresis to post-consonant position
    var undo_labialC = {
        "\u043A":"\u043A\u04F1",             // CYRILLIC SMALL LETTER KA and SMALL LETTER U with DIERESIS
        "\u049B":"\u049B\u04F1",             // CYRILLIC SMALL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS 
        "\u04F7":"\u04F7\u04F1",             // CYRILLIC SMALL LETTER GHE with DESCENDER and SMALL LETTER U with DIERESIS 
        "\u0445":"\u0445\u04F1",             // CYRILLIC SMALL LETTER HA and SMALL LETTER U with DIERESIS
        "\u04B3":"\u04B3\u04F1",             // CYRILLIC SMALL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS
        "\u04A3":"\u04A3\u04F1",             // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER U with DIERESIS
        "\u04A3\u044C":"\u04A3\u044C\u04F1", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
                                             // & SMALL LETTER U with DIERESIS
    }

    var result = []

    for (var i = 0; i < graphemes.length; i++) {
        var grapheme = graphemes[i]

        // ADJUSTMENT 2: Delete the Cyrillic soft sign that is inserted between 'ya'/'yu' and a consonant
        if (i < graphemes.length - 1 && grapheme == "\u044C" && graphemes[i+1] in undo_lzlls) {
            result.push(graphemes[i+1])
            i++
        }

        // ADJUSTMENT 3: The 'ya', 'yu' Cyrillic representations are rewritten as 'a'
        // and 'u' if they follow the Cyrillic representations of 'l', 'z', 'll', 's'
        else if (i < graphemes.length - 1 && grapheme in lzlls && graphemes[i+1] in undo_lzlls) {
            result.push(grapheme, undo_lzlls[graphemes[i+1]])
            i++
        }
       
        // ADJUSTMENT - A labialization symbol that appears before the consonant
        // it labializes is moved to a position after the consonant
        else if (i < graphemes.length - 1 && grapheme == "\u04F1" && graphemes[i+1] in undo_labialC) {
            result.push(undo_labialC[graphemes[i+1]])
            i++
        }

        // No adjustments applicable
        else {
            result.push(grapheme)
        }
    }

    return result
}


// Transliterates Cyrillic graphemes to Latin graphemes
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

        "\u04E3":"ii",              // CYRILLIC SMALL LETTER I with MACRON 
        "\u0430\u0304":"aa",        // CYRILLIC SMALL LETTER A with MACRON 
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
        "\u04F7\u04F1":"ghw",       // CYRILLIC SMALL LETTER GHE with DESCENDER and SMALL LETTER U with DIERESIS 

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

        if (grapheme in vowels) {
            result.push(vowels[grapheme])
        } else if (grapheme in consonants) {
            result.push(consonants[grapheme])
        } else {
            result.push(grapheme)
        }
    }

    return result
}


// Applies the Latin orthographic undoubling rules, i.e. undoubles the graphemes that are underlyingly voiceless
function undouble(graphemes) {

    var doubled_fricative    = new Set(['ll', 'rr', 'gg', 'ghh', 'ghhw'])

    var doubleable_fricative = new Set(['l', 'r', 'g', 'gh', 'ghw'])
    var doubleable_nasal     = new Set(['n', 'm', 'ng', 'ngw'])

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

    var result = graphemes.slice(0) // Copy the list of graphemes

    var i = 0

    while (i+1 < result.length) {
        var first = result[i]
        var second = result[i+1]
	
        // Rule 1a                                                                                                                        
        if (doubleable_fricative.has(first) && undoubleable_unvoiced_consonant.has(second)) {
            result[i] = undouble[first]
            i += 2
        }
        // Rule 1b                                                                                                                        
        else if (undoubleable_unvoiced_consonant.has(first) && doubleable_fricative.has(second)) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 2                                                                                                                         
        else if (undoubleable_unvoiced_consonant.has(first) && doubleable_nasal.has(second)) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 3a                                                                                                                        
        else if (doubled_fricative.has(first) && (doubleable_fricative.has(second) || doubleable_nasal.has(second))) {
            result[i+1] = undouble[second]
            i += 2
        }
        // Rule 3b                                                                                                                        
        else if ((doubleable_fricative.has(first) || doubleable_nasal.has(first)) && second=='ll') {
            result[i] = double[first]
            i += 2
        } 
        else {
            i += 1	
        }
    } // End 'while' Loop
	
    return result
}
