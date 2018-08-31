#!/usr/bin/env python

dictionary = []

with open("badten.tsv", 'r') as f:
	lines = f.readlines()

	for line in lines:
		entry = line.split("\t")		

		clean_entry = [column.strip() for column in entry]

		dictionary.append(clean_entry)



for entry in dictionary:
	if "particle" in entry[3]:
		entry[1] = "particle"
		entry[3] = entry[3].partition("particle; ")[2]

	elif "emotional root" in entry[3]:
		entry[1] = "emotional root"
		entry[3] = entry[3].partition("emotional root; ")[2]

	elif "postural root" in entry[3]:
		entry[1] = "postural root"
		entry[3] = entry[3].partition("postural root; ")[2]

	elif "quantifier" in entry[3]:
		entry[1] = "quantifier-qualifier"
		entry[3] = entry[3].partition("used in the quantifier/qualifier construction; ")[2]

	elif entry[0][-1] == "-" and entry[2] == "No information given.":
		entry[1] = "SKIP"

	elif entry[0][-1] == "-" or entry[0][-2]  == "-" and "No information given." not in entry[2]:
		entry[1] = "verb root"

	elif entry[0][0].isupper():
		entry[1] = "proper noun"

	else:
		entry[1] = "noun root"



with open("bases.tsv", 'w') as f:
	for entry in dictionary:
		if entry[1] == "SKIP":
			continue

		else:
			f.write('\t'.join(entry)) 
			f.write('\n')
