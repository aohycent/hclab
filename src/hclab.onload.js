// change language
hclab.translator.extractEnglishFromDomAndUpdateDictionary();
if (hclab.getQueryString()["culture"] != undefined) {
	hclab.translator.translate(hclab.getQueryString()["culture"]);
} else {
	hclab.translator.autoDetectTranslation();
}
