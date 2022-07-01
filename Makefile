.DEFAULT_GOAL := all
.PHONY: all release clean
.PHONY: predeploy download_static_documents download_master_thesis_document

download_master_thesis_document:
	wget -N 'https://github.com/dparo/master-thesis.tex/releases/latest/download/Paro_Davide.pdf' \
		-O static/documents/MSc_Paro_Davide.pdf

download_msc_presentation_document:
	wget -N 'https://github.com/dparo/msc-presentation/releases/latest/download/Paro_Davide.pdf' \
		-O static/documents/msc-presentation.pdf

download_static_documents: download_master_thesis_document download_msc_presentation_document

predeploy: download_static_documents


all: predeploy
	hugo --minify
