document.getElementById("button1").onclick = function() { 

	var original                   = field1.value
	var lowercased                 = original.toLowerCase()
	var tokenized_with_apostrophes = tokenize(lowercased, true)
	var tokenized                  = tokenize(lowercased, false)
	var undoubled                  = undouble(tokenized)
	var phonetic_ipa               = graphemes_to_phonemes_ipa(undoubled)
	var phonetic_krauss1975        = graphemes_to_phonemes_krauss1975(undoubled)
	var phonetic_nagai2001         = graphemes_to_phonemes_nagai2001(undoubled)
        var tokenized_cyrillic         = latin_to_cyrillic(tokenized)
        var adjusted_cyrillic          = cyrillic_adjustments(tokenized_cyrillic)

	us_ess.innerHTML               = tokens_to_string(tokenized_with_apostrophes)
	us_ess_undoubled.innerHTML     = tokens_to_string(undoubled)
	ipa.innerHTML                  = tokens_to_string(phonetic_ipa)
	krauss1975.innerHTML           = tokens_to_string(phonetic_krauss1975)
	nagai2001.innerHTML            = tokens_to_string(phonetic_nagai2001)
        ru_ess.innerHTML               = tokens_to_string(adjusted_cyrillic)
	
};


document.getElementById("field1").addEventListener("keydown", function(event) {
    //event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("button1").click();
    }
});

