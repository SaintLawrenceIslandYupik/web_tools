document.getElementById("button1").onclick = function() { 

	var original                   = field1.value
	var lowercased                 = original.toLowerCase()
	var tokenized_with_apostrophes = tokenize(lowercased, true)
	var tokenized                  = tokenize(lowercased, false)

        var latin_vowels = new Set(['i', 'a', 'u', 'e'])

        if (spellcheck(tokenized_with_apostrophes, latin_vowels, original)) {
            var undoubled                  = undouble(tokenized)
            var phonetic_ipa               = graphemes_to_phonemes_ipa(undoubled)
            var phonetic_krauss1975        = graphemes_to_phonemes_krauss1975(undoubled)
            var phonetic_nagai2001         = graphemes_to_phonemes_nagai2001(undoubled)
            var tokenized_cyrillic         = latin_to_cyrillic(undoubled)
            var adjusted_cyrillic          = cyrillic_adjustments(tokenized_cyrillic)

            var latin_syllabified          = syllabify(tokenized, latin_vowels)
            var latin_stressed             = stress(latin_syllabified, latin_vowels)

            var ipa_vowels = new Set(['\u0069', '\u0251', '\u0075', '\u0259'])
            var ipa_syllabified            = syllabify(phonetic_ipa, ipa_vowels)
            var ipa_stressed               = stress(ipa_syllabified, ipa_vowels)

            var cyrillic_vowels = new Set(['\u0438', '\u0430', '\u0443', '\u044B', '\u04E3', '\u0101', '\u04EF'])
            var cyrillic_syllabified       = syllabify(tokenized_cyrillic, cyrillic_vowels)
            var cyrillic_stressed          = stress(cyrillic_syllabified, cyrillic_vowels)
            var cyrillic_stress_adjusted   = cyrillic_adjustments(cyrillic_stressed)

            us_ess.innerHTML               = tokens_to_string(tokenized_with_apostrophes)
            us_ess_undoubled.innerHTML     = tokens_to_string(undoubled)
            ipa.innerHTML                  = tokens_to_string(phonetic_ipa)
            krauss1975.innerHTML           = tokens_to_string(phonetic_krauss1975)
            nagai2001.innerHTML            = tokens_to_string(phonetic_nagai2001)
            ru_ess.innerHTML               = tokens_to_string(adjusted_cyrillic)

            latin_stress.innerHTML         = tokens_to_string(latin_stressed).replace(/(\d+)/g, "<sub>$1</sub>")
            ipa_stress.innerHTML           = tokens_to_string(ipa_stressed).replace(/(\d+)/g, "<sub>$1</sub>")
            cyrillic_stress.innerHTML      = tokens_to_string(cyrillic_stress_adjusted).replace(/(\d+)/g, "<sub>$1</sub>")
        }
        else {
            window.alert("Entry was misspelled. Please try again")
        }
};


document.getElementById("field1").addEventListener("keydown", function(event) {
    //event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("button1").click();
    }
});

