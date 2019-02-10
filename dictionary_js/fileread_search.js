var lex = [];

function readDict(file) {
	var http = new XMLHttpRequest();
	http.open('get', file);
	http.onreadystatechange = function() {
		var text = http.responseText;
		var lines = text.split(/\r\n|\n|\r/);

		for(var i = 0; i < lines.length; i++) {
			lex[i] = lines[i].split("\t");
		}
	};
	http.send();
}


window.onload = readDict('dictionary_js/final_dict.tsv');


function printEntry(entry) {

	var results = document.getElementById("output");
	var content = document.createElement("P");

	if(document.getElementById("showCyrillic").checked && document.getElementById("showIPA").checked){
		content.innerHTML = "<b>" + entry[0] + "</b>" + "\n(" + latin_to_cyrillic(entry[0]) + ")\n[" + toIPA(entry[0]) + "]\n" + "<i>" + entry[1] + "</i>" + "\n- " + entry[2] + "<br>" + "<i>" + entry[3] + "</i>" + "<br>" + "<hr>" + "<br>";
	}
	else if(document.getElementById("showCyrillic").checked && !document.getElementById("showIPA").checked){
		content.innerHTML = "<b>" + entry[0] + "</b>" + "\n(" + latin_to_cyrillic(entry[0]) + ")\n" + "<i>" + entry[1] + "</i>" + "\n- " + entry[2] + "<br>" + "<i>" + entry[3] + "</i>" + "<br>" + "<hr>" + "<br>";

	}
	else if(!document.getElementById("showCyrillic").checked && document.getElementById("showIPA").checked){
		content.innerHTML = "<b>" + entry[0] + "</b>" + "\n[" + toIPA(entry[0]) + "]\n" + "<i>" + entry[1] + "</i>" + "\n- " + entry[2] + "<br>" + "<i>" + entry[3] + "</i>" + "<br>" + "<hr>" + "<br>";

	}
	else {
		content.innerHTML = "<b>" + entry[0] + "</b>" + "\n" + "<i>" + entry[1] + "</i>" + "\n- " + entry[2] + "<br>" + "<i>" + entry[3] + "</i>" + "<br>" + "<hr>" + "<br>";
	}

	results.appendChild(content);
}

//This search is for matching nouns in absolutive
//can be deleted in future iterations
function exact_search(token) {
		token = token.toLowerCase();
		alert(token);

		for(var i=0; i<lex.length; i++) {
			if(lex[i][0].match(token)){
				printEntry(lex[i]);
			}
		}
}

function search(tokenized, rawInput) {
	var rawInput = rawInput.toLowerCase();
	var results = document.getElementById("output");
	var found = false;
	results.innerHTML = "";


	if(tokenized === "") {
			results.innerHTML = "Please enter a search token.";
		}

	else if(document.getElementById("yupikToEnglish").checked) {

			if(typeof tokenized == 'undefined') {
				exact_search(rawInput);
			}

			else {
				exact_search(rawInput);
				for(var i=0; i<lex.length; i++) {
					if(lex[i][0].includes(tokenized)){
						printEntry(lex[i]);
						found = true;
					}
		 	}
		}

		if(!found) {
			 //print "No results."
			 results.innerHTML = "No results.";
		}
	}

	else if(document.getElementById("englishToYupik").checked) {

		for(var j=0; j<lex.length; j++) {
			if(lex[j][2].includes(rawInput)) {
				printEntry(lex[j]);
				found = true;
			}
		}

		if(!found) {
			 //print "No results."
			 results.innerHTML = "No results.";
		}
	}
}

function alpha() {

	var radio = document.getElementsByName("alpha");
	var results = document.getElementById("output")
	var token = "";
	var found = false;
	results.innerHTML = "";

	for(var i=0; i<radio.length; i++) {
		if(radio[i].checked) {
			token = radio[i].id;
			break;
		}
	}

	for(var j = 0; j<lex.length; j++) {
		if(lex[j][0].toUpperCase().startsWith(token)) {
			printEntry(lex[j]);
			found = true;
		}

	}

	if(!found) {
			 //print "No results."
			 results.innerHTML = "No results.";
		}

}
