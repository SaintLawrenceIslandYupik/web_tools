

function isAlpha(character) {
	if (character.toLowerCase() != character.toUpperCase()) {
		return true
	} else {
		return false
	}
}

function tokenize(word, keep_apostrophes) {

	if (keep_apostrophes === undefined) {
		keep_apostrophes = false
	}

	var graphemes = ['ngngw', 'ghhw', 'ngng', 'ghh', 'ghw', 'ngw', 'gg', 'gh', 'kw', 'll', 'mm', 'ng', 'nn', 'qw', 'rr', 'wh', 'a', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z']

	var result = []

	var end = word.length

	while (end > 0) {
	
		var found_grapheme = false
		
		for (var i = 0; i < graphemes.length; i++) {
			var grapheme = graphemes[i]
			
			if (word.slice(0, end).endsWith(grapheme)) {
			
				result.unshift(grapheme)
				end -= grapheme.length
				found_grapheme = true
				break
			
			}

		}
		
		if (! found_grapheme) {
		
			var character = word.substring(end-1, end)
			
			if (isAlpha(character)) {
				result.unshift(character)
			} else if (keep_apostrophes && (character==="'" || character==="\u2019")) {
				result.unshift(character)
			} 
		
			end -= 1
			
		}
	
	}

    return result
}


function tokens_to_string(tokens) {
	
	var s=""
	for (var i=0; i<tokens.length; i++) {
		s += tokens[i]
		//s += " "
	}
	
	return s
}


function tokenize_to_string(word) {
	var tokens = graphemes2phonemes_nagai2001(undouble(tokenize(word.toLowerCase(), false)))
	
	var s=""
	for (var i=0; i<tokens.length; i++) {
		s += tokens[i]
		s += " "
	}
	
	return s
}


function undouble(graphemes) {

    var doubled_fricative=new Set(['ll', 'rr', 'gg', 'ghh', 'ghhw'])

    var doubleable_fricative=new Set(['l', 'r', 'g', 'gh', 'ghw'])
    var doubleable_nasal=new Set(['n', 'm', 'ng', 'ngw'])

    var undoubleable_unvoiced_consonant=new Set(['p', 't', 'k', 'kw', 'q', 'qw', 'f', 's', 'wh'])

    var double={'l'  : 'll',
                'r'  : 'rr',
                'g'  : 'gg',
                'gh' : 'ghh',
                'ghw': 'ghhw',
                'n'  : 'nn',
                'm'  : 'mm',
                'ng' : 'ngng',
                'ngw': 'ngngw'}

	var result = graphemes.slice(0) // Copy the list of graphemes

	var i = 0
	
	while (i+1 < result.length) {
	
		var first = result[i]
		var second = result[i+1]
	
        // Rule 1a                                                                                                                        
        if (doubleable_fricative.has(first) && undoubleable_unvoiced_consonant.has(second)) {
            result[i] = double[first]
            i += 2
		}
        // Rule 1b                                                                                                                        
        else if (undoubleable_unvoiced_consonant.has(first) && doubleable_fricative.has(second)) {
            result[i+1] = double[second]
            i += 2
		}
        // Rule 2                                                                                                                         
        else if (undoubleable_unvoiced_consonant.has(first) && doubleable_nasal.has(second)) {
            result[i+1] = double[second]
            i += 2
		}
        // Rule 3a                                                                                                                        
        else if (doubled_fricative.has(first) && (doubleable_fricative.has(second) || doubleable_nasal.has(second))) {
            result[i+1] = double[second]
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
	
	}
	
	return result

}


function graphemes_to_phonemes_ipa(graphemes) {

    var ipa = {
            // Vowels                                                                                                                     
            "i":"\u0069",                // LATIN SMALL LETTER I
            "a":"\u0251",                // LATIN SMALL LETTER ALPHA
            "u":"\u0075",                // LATIN SMALL LETTER U
            "e":"\u0259",                // LATIN SMALL LETTER SCHWA

            // Stops                                                                                                                      
            "p" :"\u0070",               // LATIN SMALL LETTER P
            "t" :"\u0074",               // LATIN SMALL LETTER T
            "k" :"\u006B",               // LATIN SMALL LETTER K
            "kw":"\u006B\u02B7",         // LATIN SMALL LETTER K                           with MODIFIER LETTER SMALL W
            "q" :"\u0071",               // LATIN SMALL LETTER Q
            "qw":"\u0071\u02B7",         // LATIN SMALL LETTER Q                           with MODIFIER LETTER SMALL W

            // Voiced fricatives                                                                                                          
            "v"  :"\u0076",              // LATIN SMALL LETTER V
            "l"  :"\u006C",              // LATIN SMALL LETTER L
            "z"  :"\u007A",              // LATIN SMALL LETTER Z
            "y"  :"\u006A",              // LATIN SMALL LETTER J
            "r"  :"\u027B",              // LATIN SMALL LETTER TURNED R WITH HOOK
            "g"  :"\u0263",              // LATIN SMALL LETTER GAMMA
            "w"  :"\u0263\u02B7",        // LATIN SMALL LETTER GAMMA                       with MODIFIER LETTER SMALL W
            "gh" :"\u0281",               // LATIN LATTER SMALL CAPITAL INVERTED R
            "ghw":"\u0281\u02B7",         // LATIN LATTER SMALL CAPITAL INVERTED R          with MODIFIER LETTER SMALL W

            // Voiceless fricatives                                                                                                       
            "f"   :"\u0066",             // LATIN SMALL LETTER F
            "ll"  :"\u026C",             // LATIN SMALL LETTER L WITH BELT
            "s"   :"\u0073",             // LATIN SMALL LETTER S
            "rr"  :"\u0282",             // LATIN SMALL LETTER S WITH HOOK
            "gg"  :"\u0078",             // LATIN SMALL LETTER X
            "wh"  :"\u0078\u02B7",       // LATIN SMALL LETTER X                           with MODIFIER LETTER SMALL W
            "ghh" :"\u03C7",             // GREEK SMALL LETTER CHI
            "ghhw":"\u03C7\u02B7",       // GREEK SMALL LETTER CHI                         with MODIFIER LETTER SMALL W
            "h"   :"\u0068",             // LATIN SMALL LETTER H

            // Voiced nasals                                                                                                              
            "m"  :"\u006D",              // LATIN SMALL LETTER M
            "n"  :"\u006E",              // LATIN SMALL LETTER N
            "ng" :"\u014B",              // LATIN SMALL LETTER ENG
            "ngw":"\u014B\u02B7",        // LATIN SMALL LETTER ENG                          with MODIFIER LETTER SMALL W

            // Voiceless nasals                                                                                                           
            "mm":"\u006D\u0325",         // LATIN SMALL LETTER M   with COMBINING RING BELOW
            "nn":"\u006E\u0325",         // LATIN SMALL LETTER N   with COMBINING RING BELOW
            "ngng":"\u014B\u030A",        // LATIN SMALL LETTER ENG with COMBINING RING ABOVE
            "ngngw":"\u014B\u030A\u02B7", // LATIN SMALL LETTER ENG with COMBINING RING ABOVE and MODIFIER LETTER SMALL W
          }

    var result = []

	for (var i=0; i<graphemes.length; i++) {
		var grapheme = graphemes[i]
		
		if (grapheme in ipa) {
			result.push(ipa[grapheme])
		} else if (isAlpha(grapheme)) {
			result.push(grapheme)
		}
	}
	
	return result
}



function graphemes_to_phonemes_krauss1975(graphemes) {

    var krauss1975 = {
            // Vowels                                                                                                                     
            "i":"\u0069",                // LATIN SMALL LETTER I
            "a":"\u0061",                // LATIN SMALL LETTER A
            "u":"\u0075",                // LATIN SMALL LETTER U
            "e":"\u0259",                // LATIN SMALL LETTER SCHWA

            // Stops                                                                                                                      
            "p" :"\u0070",               // LATIN SMALL LETTER P
            "t" :"\u0074",               // LATIN SMALL LETTER T
            "k" :"\u006B",               // LATIN SMALL LETTER K
            "kw":"\u006B\u02B7",         // LATIN SMALL LETTER K                             with MODIFIER LETTER SMALL W
            "q" :"\u0071",               // LATIN SMALL LETTER Q
            "qw":"\u0071\u02B7",         // LATIN SMALL LETTER Q                             with MODIFIER LETTER SMALL W

            // Voiced fricatives                                                                                                          
            "v"  :"\u0076",              // LATIN SMALL LETTER V
            "l"  :"\u006C",              // LATIN SMALL LETTER L
            "z"  :"\u007A",              // LATIN SMALL LETTER Z
            "y"  :"\u0079",              // LATIN SMALL LETTER Y
            "r"  :"\u0072",              // LATIN SMALL LETTER R
            "g"  :"\u0263",              // LATIN SMALL LETTER GAMMA
            "w"  :"\u0263\u02B7",        // LATIN SMALL LETTER GAMMA                         with MODIFIER LETTER SMALL W
            "gh" :"\u0263\u0323",        // LATIN SMALL LETTER GAMMA with COMBINING DOT BELOW
            "ghw":"\u0263\u0323\u02B7",  // LATIN SMALL LETTER GAMMA with COMBINING DOT BELOW and MODIFIER LETTER SMALL W

            // Voiceless fricatives                                                                                                       
            "f"   :"\u0066",             // LATIN SMALL LETTER F
            "ll"  :"\u026C",             // LATIN SMALL LETTER L WITH BELT
            "s"   :"\u0073",             // LATIN SMALL LETTER S
            "rr"  :"\u0072\u0325",       // LATIN SMALL LETTER R   with COMBINING RING BELOW
            "gg"  :"\u0078",             // LATIN SMALL LETTER X
            "wh"  :"\u0078\u02B7",       // LATIN SMALL LETTER X                             with MODIFIER LETTER SMALL W
            "ghh" :"\u0078\u0323",       // LATIN SMALL LETTER X   with COMBINING DOT BELOW
            "ghhw":"\u0078\u0323\u02B7", // LATIN SMALL LETTER X   with COMBINING DOT BELOW   and MODIFIER LETTER SMALL W
            "h"   :"\u0068",             // LATIN SMALL LETTER H

            // Voiced nasals                                                                                                              
            "m"  :"\u006D",              // LATIN SMALL LETTER M
            "n"  :"\u006E",              // LATIN SMALL LETTER N
            "ng" :"\u014B",              // LATIN SMALL LETTER ENG
            "ngw":"\u014B\u02B7",        // LATIN SMALL LETTER ENG                          with MODIFIER LETTER SMALL W

            // Voiceless nasals                                                                                                           
            "mm":"\u006D\u0325",          // LATIN SMALL LETTER M   with COMBINING RING BELOW
            "nn":"\u006E\u0325",          // LATIN SMALL LETTER N   with COMBINING RING BELOW
            "ngng":"\u014B\u0325",        // LATIN SMALL LETTER ENG with COMBINING RING BELOW
            "ngngw":"\u014B\u0325\u02B7", // LATIN SMALL LETTER ENG with COMBINING RING BELOW and MODIFIER LETTER SMALL W
          }

    var result = []

	for (var i=0; i<graphemes.length; i++) {
		var grapheme = graphemes[i]
		
		if (grapheme in krauss1975) {
			result.push(krauss1975[grapheme])
		} else if (isAlpha(grapheme)) {
			result.push(grapheme)
		}
	}
	
	return result
}

function graphemes_to_phonemes_nagai2001(graphemes) {

    var nagai2001 = {
            // Vowels                                                                                                                     
            "i":"\u0069",                // LATIN SMALL LETTER I
            "a":"\u0061",                // LATIN SMALL LETTER A
            "u":"\u0075",                // LATIN SMALL LETTER U
            "e":"\u0259",                // LATIN SMALL LETTER SCHWA

            // Stops                                                                                                                      
            "p" :"\u0070",               // LATIN SMALL LETTER P
            "t" :"\u0074",               // LATIN SMALL LETTER T
            "k" :"\u006B",               // LATIN SMALL LETTER K
            "kw":"\u006B\u02B7",         // LATIN SMALL LETTER K                             with MODIFIER LETTER SMALL W
            "q" :"\u0071",               // LATIN SMALL LETTER Q
            "qw":"\u0071\u02B7",         // LATIN SMALL LETTER Q                             with MODIFIER LETTER SMALL W

            // Voiced fricatives                                                                                                          
            "v"  :"\u0076",              // LATIN SMALL LETTER V
            "l"  :"\u006C",              // LATIN SMALL LETTER L
            "z"  :"\u007A",              // LATIN SMALL LETTER Z
            "y"  :"\u0079",              // LATIN SMALL LETTER Y
            "r"  :"\u0072",              // LATIN SMALL LETTER R
            "g"  :"\u0263",              // LATIN SMALL LETTER GAMMA
            "w"  :"\u0263\u02B7",        // LATIN SMALL LETTER GAMMA                         with MODIFIER LETTER SMALL W
            "gh" :"\u0263\u0307",        // LATIN SMALL LETTER GAMMA with COMBINING DOT ABOVE
            "ghw":"\u0263\u0307\u02B7",  // LATIN SMALL LETTER GAMMA with COMBINING DOT ABOVE and MODIFIER LETTER SMALL W

            // Voiceless fricatives                                                                                                       
            "f"   :"\u0066",             // LATIN SMALL LETTER F
            "ll"  :"\u026C",             // LATIN SMALL LETTER L WITH BELT
            "s"   :"\u0073",             // LATIN SMALL LETTER S
            "rr"  :"\u0072\u0325",       // LATIN SMALL LETTER R   with COMBINING RING BELOW
            "gg"  :"\u0078",             // LATIN SMALL LETTER X
            "wh"  :"\u0078\u02B7",       // LATIN SMALL LETTER X                             with MODIFIER LETTER SMALL W
            "ghh" :"\u0078\u0323",       // LATIN SMALL LETTER X   with COMBINING DOT BELOW
            "ghhw":"\u0078\u0323\u02B7", // LATIN SMALL LETTER X   with COMBINING DOT BELOW   and MODIFIER LETTER SMALL W
            "h"   :"\u0068",             // LATIN SMALL LETTER H

            // Voiced nasals                                                                                                              
            "m"  :"\u006D",              // LATIN SMALL LETTER M
            "n"  :"\u006E",              // LATIN SMALL LETTER N
            "ng" :"\u014B",              // LATIN SMALL LETTER ENG
            "ngw":"\u014B\u02B7",        // LATIN SMALL LETTER ENG                          with MODIFIER LETTER SMALL W

            // Voiceless nasals                                                                                                           
            "mm":"\u006D\u0325",          // LATIN SMALL LETTER M   with COMBINING RING BELOW
            "nn":"\u006E\u0325",          // LATIN SMALL LETTER N   with COMBINING RING BELOW
            "ngng":"\u014B\u030A",        // LATIN SMALL LETTER ENG with COMBINING RING ABOVE
            "ngngw":"\u014B\u030A\u02B7", // LATIN SMALL LETTER ENG with COMBINING RING ABOVE and MODIFIER LETTER SMALL W
          }

    var result = []

	for (var i=0; i<graphemes.length; i++) {
		var grapheme = graphemes[i]
		if (grapheme in nagai2001) {
			result.push(nagai2001[grapheme])
		} else if (isAlpha(grapheme)) {
			result.push(grapheme)
		}
	}
	
	return result
}

function latin_to_cyrillic(graphemes) {
    
    var shortVowels = {
            "i":"\u0438",                // CYRILLIC SMALL LETTER I 
            "a":"\u0430",                // CYRILLIC SMALL LETTER A
            "u":"\u0443",                // CYRILLIC SMALL LETTER U
            "e":"\u044B",                // CYRILLIC SMALL LETTER YERU
    }

    var longVowels = {
            "i":"\u04E3",               // CYRILLIC SMALL LETTER I with MACRON
            "a": "\u0101",              // CYRILLIC SMALL LETTER A with MACRON
            "u": "\u04EF",              // CYRILLIC SMALL LETTER U with MACRON
    }
 
    var consonants= {
            // Stops                                                                                                                      
            "p" :"\u043F",               // CYRILLIC SMALL LETTER PE
            "t" :"\u0442",               // CYRILLIC SMALL LETTER TE
            "k" :"\u043A",               // CYRILLIC SMALL LETTER KA
            "kw":"\u043A\u04F1",         // CYRILLIC SMALL LETTER KA and SMALL LETTER U with DIERESIS
            "q" :"\u049B",               // CYRILLIC SMALL LETTER KA with DESCENDER
            "qw":"\u049B\u04F1",         // CYRILLIC SMALL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS 

            // Voiced fricatives                                                                                                          
            "v"  :"\u0432",              // CYRILLIC SMALL LETTER VE
            "l"  :"\u043B",              // CYRILLIC SMALL LETTER EL
            "z"  :"\u0437",              // CYRILLIC SMALL LETTER ZE
            "y"  :"\u04E5",              // CYRILLIC SMALL LETTER U with DIERESIS
            "r"  :"\u043F",              // CYRILLIC SMALL LETTER ER
            "g"  :"\u0433",              // CYRILLIC SMALL LETTER GHE
            "w"  :"\u04F1",              // CYRILLIC SMALL LETTER U with DIERESIS 
            "gh" :"\u04F7",              // CYRILLIC SMALL LETTER GHE with DESCENDER
            "ghw":"\u04F7\u04F1",        // CYRILLIC SMALL LETTER GHE with DESCENDER and SMALL LETTER U with DIERESIS 

            // Voiceless fricatives                                                                                                       
            "f"   :"\u0444",             // CYRILLIC SMALL LETTER EF
            "ll"  :"\u043B\u044C",       // CYRILLIC SMALL LETTER EL and SMALL LETTER SOFT SIGN
            "s"   :"\u0441",             // CYRILLIC SMALL LETTER ES
            "rr"  :"\u0448",             // CYRILLIC SMALL LETTER SHA
            "gg"  :"\u0445",             // CYRILLIC SMALL LETTER HA
            "wh"  :"\u0445\u04F1",       // CYRILLIC SMALL LETTER HA and SMALL LETTER U with DIERESIS
            "ghh" :"\u04B3",             // CYRILLIC SMALL LETTER HA with DESCENDER
            "ghhw":"\u04B3\u04F1",       // CYRILLIC SMALL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS
            "h"   :"\u0433",             // CYRILLIC SMALL LETTER GHE

            // Voiced nasals                                                                                                              
            "m"  :"\u043C",              // CYRILLIC SMALL LETTER EM
            "n"  :"\u043D",              // CYRILLIC SMALL LETTER EN
            "ng" :"\u04A3",              // CYRILLIC SMALL LETTER EN with DESCENDER
            "ngw":"\u04A3\u04F1",        // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER U with DIERESIS

            // Voiceless nasals                                                                                                           
            "mm":"\u043C\u044C",          // CYRILLIC SMALL LETTER EM and SMALL LETTER SOFT SIGN
            "nn":"\u043D\u044C",          // CYRILLIC SMALL LETTER EN and SMALL LETTER SOFT SIGN
            "ngng":"\u04A3\u044C",        // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER SOFT SIGN
            "ngngw":"\u04A3\u044C\u04F1", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
     
     }

     var result = []

         for (var i = 0; i < graphemes.length; i++) {
             var grapheme = graphemes[i]

             if (i < graphemes.length && grapheme in shortVowels) {
                 if (grapheme == graphemes[i+1]) {
                     result.push(longVowels[grapheme])
                     i++
                 }
                 else {
                     result.push(shortVowels[grapheme])
                 }
             }
             else if (grapheme in consonants) {
                 result.push(consonants[grapheme])
             }
             else if (isAlpha(grapheme)) {
                 result.push(grapheme)
             }
	 }
	
	return result
}

function cyrillic_adjustments(cyr_graphemes) {

    var shortAU = {
        "\u0430":"\u044F",        // CYRILLIC SMALL LETTER A to SMALL LETTER YA
        "\u0443":"\u044E",        // CYRILLIC SMALL LETTER U to SMALL LETTER YU
    }

    var longAU = {
        "\u0101":"\u044F\u0304",  // CYRILLIC SMALL LETTER A with MACRON to SMALL LETTER YA WITH MACRON
        "\u04EF":"\u044E\u0304",  // CYRILLIC SMALL LETTER U with MACRON to SMALL LETTER YU WITH MACRON
    }

    var vowels = {      
        "\u0438":"i",             // CYRILLIC SMALL LETTER I 
        "\u0430":"a",             // CYRILLIC SMALL LETTER A
        "\u0443":"u",             // CYRILLIC SMALL LETTER U
        "\u044B":"e",             // CYRILLIC SMALL LETTER YERU
        "\u04E3":"ii",            // CYRILLIC SMALL LETTER I with MACRON
        "\u0101":"aa",            // CYRILLIC SMALL LETTER A with MACRON
        "\u04EF":"uu",            // CYRILLIC SMALL LETTER U with MACRON
    } 

    var lzlls = { 
        "\u043B":"l",             // CYRILLIC SMALL LETTER EL
        "\u0437":"z",             // CYRILLIC SMALL LETTER ZE
        "\u043B\u044C":"ll",      // CYRILLIC SMALL LETTER EL and SMALL LETTER SOFT SIGN
        "\u0441":"s",             // CYRILLIC SMALL LETTER ES
    } 

    // Swaps position of the labialization symbol, i.e. Small Letter U with Dieresis
    var labialC = {
        "\u043A\u04F1":"\u04F1\u043A",             // CYRILLIC SMALL LETTER KA and SMALL LETTER U with DIERESIS
        "\u049B\u04F1":"\u04F1\u049B",             // CYRILLIC SMALL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS 
        "\u04F7\u04F1":"\u04F1\u04F7",             // CYRILLIC SMALL LETTER GHE with DESCENDER and SMALL LETTER U with DIERESIS 
        "\u0445\u04F1":"\u04F1\u0445",             // CYRILLIC SMALL LETTER HA and SMALL LETTER U with DIERESIS
        "\u04B3\u04F1":"\u04F1\u04B3",             // CYRILLIC SMALL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS
        "\u04A3\u04F1":"\u04F1\u04A3",             // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER U with DIERESIS
        "\u04A3\u044C\u04F1":"\u04F1\u04A3\u044C", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
                                                   // & SMALL LETTER U with DIERESIS
    }

    var voicelessC = {
            // Stops                                                                                                                      
            "\u043F":"p",                 // CYRILLIC SMALL LETTER PE
            "\u0442":"t",                 // CYRILLIC SMALL LETTER TE
            "\u043A":"k",                 // CYRILLIC SMALL LETTER KA
            "\u043A\u04F1":"kw",          // CYRILLIC SMALL LETTER KA and SMALL LETTER U with DIERESIS
            "\u049B":"q",                 // CYRILLIC SMALL LETTER KA with DESCENDER
            "\u049B\u04F1":"qw",          // CYRILLIC SMALL LETTER KA with DESCENDER and SMALL LETTER U with DIERESIS 

            // Voiceless fricatives                                                                                                       
            "\u0444":"ff",                // CYRILLIC SMALL LETTER EF
            "\u043B\u044C":"ll",          // CYRILLIC SMALL LETTER EL and SMALL LETTER SOFT SIGN
            "\u0441":"s",                 // CYRILLIC SMALL LETTER ES
            "\u0448":"rr",                // CYRILLIC SMALL LETTER SHA
            "\u0445":"gg",                // CYRILLIC SMALL LETTER HA
            "\u0445\u04F1":"wh",          // CYRILLIC SMALL LETTER HA and SMALL LETTER U with DIERESIS
            "\u04B3":"ghh",               // CYRILLIC SMALL LETTER HA with DESCENDER
            "\u04B3\u04F1":"ghhw",        // CYRILLIC SMALL LETTER HA with DESCENDER and SMALL LETTER U with DIERESIS
            "\u0433":"h",                 // CYRILLIC SMALL LETTER GHE

            // Voiceless nasals                                                                                                           
            "\u043C\u044C":"mm",          // CYRILLIC SMALL LETTER EM and SMALL LETTER SOFT SIGN
            "\u043D\u044C":"nn",          // CYRILLIC SMALL LETTER EN and SMALL LETTER SOFT SIGN
            "\u04A3\u044C":"ngng",        // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER SOFT SIGN
            "\u04A3\u044C\u04F1":"ngngw", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN & SMALL LETTER U with DIERESIS
    }
    
    // Removes devoicing sign, i.e. Small Letter Soft Sign
    var voicelessNasals = {
            "\u043C\u044C":"\u043C",             // CYRILLIC SMALL LETTER EM and SMALL LETTER SOFT SIGN
            "\u043D\u044C":"\u043D",             // CYRILLIC SMALL LETTER EN and SMALL LETTER SOFT SIGN
            "\u04A3\u044C":"\u04A3",             // CYRILLIC SMALL LETTER EN with DESCENDER and SMALL LETTER SOFT SIGN
            "\u04A3\u044C\u04F1":"\u04A3\u04F1", // CYRILLIC SMALL LETTER EN with DESCENDER & SMALL LETTER SOFT SIGN
                                                 // & SMALL LETTER U with DIERESIS
    }

    var result = []

        for (var i = 0; i < cyr_graphemes.length; i++) {
            var grapheme = cyr_graphemes[i]

            // ADJUSTMENT 1: The Cyrillic pairings of 'y-a', 'y-u', 'y-aa', 'y-uu'are rewritten
            // into Cyrillic YA, YU, YA WITH MACRON, YU WITH MACRON respectively
            // First checks if grapheme is Cyrillic 'y'
            if (grapheme == "\u04E5" && (i < cyr_graphemes.length - 1)) {    
                graphemeAfter = cyr_graphemes[i+1]

                if (graphemeAfter in shortAU) {

                    // ADJUSTMENT 2: If ya or yu follow a consonant, insert
                    // a Cyrillic soft sign between
                    if (i > 0 && !(cyr_graphemes[i-1] in vowels)) {
                        result.push("\u044C")
                    }
                    result.push(shortAU[graphemeAfter])
                    i++
                }
                else if (graphemeAfter in longAU) {
                    result.push(longAU[graphemeAfter])
                    i++
                }
                else {
                    result.push(grapheme)
                }
            }
 
            // ADJUSTMENT 3: The 'a', 'u' Cyrillic representations are rewritten 
            // if they follow the Cyrillic representations of 'l', 'z', 'll', 's'
            else if (i > 0 && grapheme in shortAU && cyr_graphemes[i-1] in lzlls) {
                result.push(shortAU[grapheme])
            }
    
            // ADJUSTMENT - Labialization symbol can appear either before or after
            // the consonant it labializes. It moves to appear next to a vowel 
            else if (i > 0 && grapheme in labialC && cyr_graphemes[i-1] in vowels) {
                result.push(labialC[grapheme])
            }

            // Adjustment - Cyrillic representation of 'e' deletes before a voiceless
            // consonant cluster
            else if (grapheme == "\u044B" && (i < cyr_graphemes.length - 2) &&
                     cyr_graphemes[i+1] in voicelessC && cyr_graphemes[i+2] in voicelessC) {
                result.push("") 
            }

            // Adjustment - Devoicing sign is omitted for a voiceless nasal if it
            // appears after a voiceless consonant
            else if (i > 0 && grapheme in voicelessNasals && cyr_graphemes[i-1] in voicelessC) {
                result.push(voicelessNasals[grapheme])
            }

            // No adjustments applicable
            else if (isAlpha(grapheme)) {
                result.push(grapheme)
	    }

        } // End 'for' Loop

    return result
}


function syllabify_stress(graphemes) {

    // Convert graphemes to consonant "c" or vowel "v"
    var vowels = new Set(['i', 'a', 'u', 'e'])

    var consonants = new Set(['ngngw', 'ghhw', 'ngng', 'ghh', 'ghw', 'ngw', 'gg', 'gh', 'kw', 'll', 'mm', 'ng', 'nn', 'qw', 'rr', 'wh', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'])

    var c_v = []

    for (var i = 0; i < graphemes.length; i++) {
        var grapheme = graphemes[i]

        if (vowels.has(grapheme)) {
            c_v.push("v")
        } else if (consonants.has(grapheme)) {
            c_v.push("c")
        }
        else {
            c_v.push(grapheme)
        }
    }

    // Define syllable boundaries
    var syllables = []
    var syllable_count = 1

    for (var i = 0; i < c_v.length; i++) {
        var grapheme = c_v[i]

        if (grapheme == "c") {
            if (i == 0) {
                syllables.push(graphemes[i])
            } else if (i == c_v.length - 1) {
                syllables.push(graphemes[i], syllable_count)
            } else {
                if (c_v[i+1] == "c") {
                    syllables.push(graphemes[i], syllable_count, "/")
                    syllable_count += 1
                } else if (c_v[i-1] == "v") {
                    syllables.push(syllable_count, "/", graphemes[i])
                    syllable_count += 1
                } else if (c_v[i-1] == "c") {
                    syllables.push(graphemes[i])
                }
            }
        }
        else {
            if (i == c_v.length - 1) {
                syllables.push(graphemes[i], syllable_count)
            } else {
                syllables.push(graphemes[i])
            }
        }
    }


    acuteStress = {
        "i":"í",
        "a":"á",
        "u":"ú",
    }

    circumflexStress = {
        "i":"î",
        "a":"â",
        "u":"û",
    }

    // Mark stress patterns
    var result = []
    var vowel_count = 0 

    for (var i = 0; i < syllables.length; i++) {
        grapheme = syllables[i]

        if (vowels.has(grapheme) && vowel_count > 0 && vowel_count % 2 == 0) {
            result.push("HI")
        }
        else {
            if (vowels.has(grapheme)) {
                vowel_count += 1
                result.push(grapheme, "HI")
            } else {
                result.push(grapheme)
            }
        }
    }
 
    return syllables
}
