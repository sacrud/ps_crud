#
# Makefile
# uralbash, 2016-05-12 09:18
#

extract_messages:
	python setup.py extract_messages

update_catalog:
	python setup.py update_catalog

compile_catalog:
	python setup.py compile_catalog

locale: extract_messages update_catalog compile_catalog


# vim:ft=make
#
