#!/usr/bin/env python

dictionary = []

with open("badten_postbases.tsv", 'r') as f:
	lines = f.readlines()

	for line in lines:
		entry = line.split('\t')

		clean_entry = [column.strip() for column in entry]
		clean_entry.insert(1, "pos")

		dictionary.append(clean_entry)


for entry in dictionary:
	if entry[0][-1] == "-" or entry[0][-2] == "-" and "V" in entry[2]:
		entry[1] = "verb-elaborating postbase"

	elif entry[0][-1] == "-" or entry[0][-2] == "-" and "N" in entry[2]:
		entry[1] = "verbalizing postbase"

	elif "N" in entry[2]:
		entry[1] = "noun-elaborating postbase"

	elif "V" in entry[2]:
		entry[1] = "nominalizing postbase"

	else:
		entry[1] = "MANUAL"



with open("postbases.tsv", 'w') as f:
    for entry in dictionary:
		f.write('\t'.join(entry))
		f.write('\n')
