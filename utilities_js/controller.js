document.getElementById("button1").onclick = function() { 

	var original               = field1.value
        var split_lines            = original.split("\n")

        var split_latin_text           = []
        var split_redoubled_text       = []
        var split_ipa_text             = []
        var split_krauss_text          = []
        var split_nagai_text           = []
        var split_cyrillic_text        = []
        var split_menov_text           = []
        var split_latin_stress_text    = []
        var split_ipa_stress_text      = []
        var split_cyrillic_stress_text = []

        const cyrillicPattern = /[\u0400-\u04FF]/;
        var latin_vowels = new Set(['i', 'a', 'u', 'e'])
        var ipa_vowels = new Set(['\u0069', '\u0251', '\u0075', '\u0259', '\u0069\u02D0', '\u0251\u02D0', '\u0075\u02D0', '\u0259\u02D0'])
        var cyrillic_vowels = new Set(['\u0438', '\u0430', '\u0443', '\u044B', '\u04E3', '\u0101', '\u04EF'])

        for (var l = 0; l < split_lines.length; l++) {
            if (split_lines[l] == "") {
                split_latin_text.push("<p>")
                split_redoubled_text.push("<p>")
                split_ipa_text.push("<p>")
                split_krauss_text.push("<p>")
                split_nagai_text.push("<p>")
                split_cyrillic_text.push("<p>")
                split_menov_text.push("<p>")
                split_latin_stress_text.push("<p>")
                split_ipa_stress_text.push("<p>")
                split_cyrillic_stress_text.push("<p>")
            }

            else {
                var split_text = []
                split_text = split_lines[l].split(" ")

                var split_latin           = []
                var split_redoubled       = []
                var split_ipa             = []
                var split_krauss          = []
                var split_nagai           = []
                var split_cyrillic        = []
                var split_menov           = []
                var split_latin_stress    = []
                var split_ipa_stress      = []
                var split_cyrillic_stress = []

                for (var w = 0; w < split_text.length; w++) {
                    var cyrInput = false

                    var tokenized                  = ""
                    var tokenized_with_punc        = ""
                    var redoubled                  = ""
                    var redoubled_with_color       = ""
                    var redoubled_with_punc        = ""

                    var phonetic_ipa               = "" 
                    var adjusted_phonetic_ipa      = "" 
                    var phonetic_krauss1975        = ""
                    var phonetic_nagai2001         = "" 

                    var latin_syllabified          = "" 
                    var latin_stressed             = ""

                    var ipa_syllabified            = "" 
                    var ipa_stressed               = "" 
                    var ipa_stress_adjusted        = "" 

                    var tokenized_cyrillic         = ""
                    var cyrillic_syllabified       = ""
                    var cyrillic_stressed          = ""
                    var cyrillic_stress_adjusted   = "" 

                    // transliterates Cyrillic text to the Latin orthography
                    if (cyrillicPattern.test(split_text[w])) {
                        cyrInput = true

                        // output the original cyrillic text
                        split_cyrillic.push(split_text[w])
                        split_menov.push(split_text[w])
 
                        var tokenized_cyr      = tokenize_cyr(split_text[w], false)
                        var tokenized_cyr_punc = tokenize_cyr(split_text[w], true)

                        // messy hack to restore menovshchikov's vowel diacritics
                        // to help with preston's translation of the menovshchikov grammar
                        tranlisterated           = restore_vowel_diacritics(tokenized_cyr, cyrillic_to_latin(undo_cyrillic_adjustments(tokenized_cyr)))
                        transliterated_with_punc = restore_vowel_diacritics(tokenized_cyr_punc, cyrillic_to_latin(undo_cyrillic_adjustments(tokenized_cyr_punc)))

						// spellcheck the transliterated text (Cyrillic to Latin) and output
                        if (spellcheck(tokenized, latin_vowels, lowercased)) {
                            split_latin.push(tokens_to_string(transliterated_with_punc))
                        } else {
                            split_latin.push((tokens_to_string(transliterated_with_punc)).fontcolor("b20000"))
                        }
                    }

                    // selected functions for when input is in Latin
                    else {
                        var lowercased = split_text[w].toLowerCase()
                        tokenized      = tokenize(lowercased, false)
                        tokenized_with_punc = tokenize(split_text[w], true)

                        if (spellcheck(tokenized, latin_vowels, lowercased)) {
                            split_latin.push(tokens_to_string(tokenized_with_punc))
                        } else {
                            split_latin.push((tokens_to_string(tokenized_with_punc)).fontcolor("b20000"))
                        }
                    }

                    redoubled                  = redouble(tokenized, false)
                    redoubled_with_color       = redouble(tokenized_with_punc, true)
                    redoubled_with_punc        = redouble(tokenized_with_punc, false)

                    phonetic_ipa               = graphemes_to_phonemes_ipa(redoubled)
                    adjusted_phonetic_ipa      = ipa_adjust_doubleVowel(phonetic_ipa)
                    phonetic_krauss1975        = graphemes_to_phonemes_krauss1975(redoubled)
                    phonetic_nagai2001         = graphemes_to_phonemes_nagai2001(redoubled)

                    latin_syllabified          = syllabify(tokenized, latin_vowels, false)
                    latin_stressed             = stress(latin_syllabified, latin_vowels, false)

                    ipa_syllabified            = syllabify(phonetic_ipa, ipa_vowels, true)
                    ipa_stressed               = stress(ipa_syllabified, ipa_vowels, true)
                    ipa_stress_adjusted        = ipa_format_stress(ipa_stressed)

                    tokenized_cyrillic         = latin_to_cyrillic(redoubled)
                    cyrillic_syllabified       = syllabify(tokenized_cyrillic, cyrillic_vowels, false)
                    cyrillic_stressed          = stress(cyrillic_syllabified, cyrillic_vowels, false)
                    cyrillic_stress_adjusted   = cyrillic_adjustments(cyrillic_stressed)

                    // transliterates Latin text to the STANDARD Cyrillic orthography
                    // i.e. not Menovshchikov's system, but the one described in Jacobson (2001)
                    if (!cyrInput) {
                        var cyrillic_with_punc = latin_to_cyrillic(redoubled_with_punc)
                        var adjusted_cyrillic  = cyrillic_adjustments(cyrillic_with_punc)
                        split_cyrillic.push(tokens_to_string(adjusted_cyrillic))
                        // split_menov.push(tokens_to_string(adjusted_cyrillic))
                    }

                    split_redoubled.push(tokens_to_string(redoubled_with_color))
                    split_ipa.push(tokens_to_string(adjusted_phonetic_ipa))
                    split_krauss.push(tokens_to_string(phonetic_krauss1975))
                    split_nagai.push(tokens_to_string(phonetic_nagai2001))
                    split_latin_stress.push(tokens_to_string(latin_stressed).replace(/(\d+)/g, "<sub>$1</sub>"))
                    split_ipa_stress.push(tokens_to_string(ipa_stress_adjusted))
                    split_cyrillic_stress.push(tokens_to_string(cyrillic_stress_adjusted).replace(/(\d+)/g, "<sub>$1</sub>"))
                } // End word-'for' Loop

                split_latin_text.push(split_latin.join(" "))
                split_redoubled_text.push(split_redoubled.join(" "))
                split_ipa_text.push(split_ipa.join(" "))
                split_krauss_text.push(split_krauss.join(" "))
                split_nagai_text.push(split_nagai.join(" "))
                split_cyrillic_text.push(split_cyrillic.join(" "))
                split_menov_text.push(split_menov.join(" "))
                split_latin_stress_text.push(split_latin_stress.join(" "))
                split_ipa_stress_text.push(split_ipa_stress.join(" "))
                split_cyrillic_stress_text.push(split_cyrillic_stress.join(" "))
            } // End 'else' (not <p>) block

        } // End line-'for' Loop

        us_ess.innerHTML               = split_latin_text.join("<br>")
        us_ess_redoubled.innerHTML     = split_redoubled_text.join("<br>")
        ipa.innerHTML                  = split_ipa_text.join("<br>")
        krauss1975.innerHTML           = split_krauss_text.join("<br>")
        nagai2001.innerHTML            = split_nagai_text.join("<br>") 
        ru_ess.innerHTML               = split_cyrillic_text.join("<br>") 
        ru_menov.innerHTML             = split_menov_text.join("<br>") 
        latin_stress.innerHTML         = split_latin_stress_text.join("<br>") 
        ipa_stress.innerHTML           = split_ipa_stress_text.join("<br>") 
        cyrillic_stress.innerHTML      = split_cyrillic_stress_text.join("<br>") 

};


document.getElementById("field1").addEventListener("keydown", function(event) {
    //event.preventDefault();
    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
        document.getElementById("button1").click();
    }
});
