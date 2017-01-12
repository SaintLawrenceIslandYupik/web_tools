

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

    var undoubleable_unvoiced_consonant=new Set(['p', 't', 'k', 'kw', 'q', 'qw'])

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




function graphemes2phonemes_ipa(graphemes) {

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
            "gh" :"\0281",               // LATIN LATTER SMALL CAPITAL INVERTED R
            "ghw":"\0281\u02B7",         // LATIN LATTER SMALL CAPITAL INVERTED R          with MODIFIER LETTER SMALL W

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
            "ngng":"\u014B\030A",        // LATIN SMALL LETTER ENG with COMBINING RING ABOVE
            "ngngw":"\u014B\030A\u02B7", // LATIN SMALL LETTER ENG with COMBINING RING ABOVE and MODIFIER LETTER SMALL W
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



function graphemes2phonemes_krauss1975(graphemes) {

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

function graphemes2phonemes_nagai2001(graphemes) {

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
