(function (hclab) {
	var translator = hclab.translator = {
		currentCulture: "en",

		autoDetectTranslation: function () {
			// window.navigator.language for Firefox / Chrome / Opera Safari
			// window.navigator.userLanguage for IE
			var language = window.navigator.language || window.navigator.userLanguage;
			if (!this.translate(language)) {
				// Try to remove part after dash, for example cs-CZ -> cs
				language = language.substr(0, language.indexOf('-'));
				this.translate(language);
			}
		},

		translate: function (culture) {
			var dict = translator.translations[culture];
			if (dict) {
				// set current culture
				translator.currentCulture = culture;
				// update menu UI
				for (var cult in translator.translations) {
					var cultureElement = document.getElementById("culture" + cult);
					if (cultureElement != null) {
						cultureElement.setAttribute("class", "");
					}
					else {
						console.log("DOM element not found: " + "culture" + cult);
					}
					document.getElementById("culture" + culture).setAttribute("class", "selected");
				}
				// apply translations
				for (var id in dict) {
					if (document.getElementById(id) && document.getElementById(id).value) {
						document.getElementById(id).value = dict[id];
					}
					else if (document.getElementById(id)) {
						document.getElementById(id).innerHTML = dict[id];
					}
				}
				return true;
			} else {
				return false;
			}
		},

		get: function (id) {
			var translation = translator.translations[translator.currentCulture][id];
			return translation;
		},

		translations: {
			"en": {
				// javascript alerts or messages
				"testrunneractivated": "TESTRUNNER ACTIVATED",

				// header and menu html
				"indexdomtitle": "Home Page",
				"walletdomdetail": "HClab Wallet"
			}
		},

		extractEnglishFromDomAndUpdateDictionary: function () {
			var english = translator.translations["en"];
			var spanish = translator.translations["es"];
			var spanishClone = {};
			for (var key in spanish) {
				spanishClone[key] = spanish[key];
			}
			var newLang = {};
			for (var key in english) {
				newLang[key] = english[key];
				delete spanishClone[key];
			}
			for (var key in spanishClone) {
				if (document.getElementById(key)) {
					if (document.getElementById(key).value) {
						newLang[key] = document.getElementById(key).value;
					}
					else {
						newLang[key] = document.getElementById(key).innerHTML;
					}
				}
			}
			translator.translations["en"] = newLang;
		},

		showEnglishJson: function () {
			var english = hclab.translator.translations["en"];
			var spanish = hclab.translator.translations["es"];
			var spanishClone = {};
			for (var key in spanish) {
				spanishClone[key] = spanish[key];
			}
			var newLang = {};
			for (var key in english) {
				newLang[key] = english[key];
				delete spanishClone[key];
			}
			for (var key in spanishClone) {
				if (document.getElementById(key)) {
					if (document.getElementById(key).value) {
						newLang[key] = document.getElementById(key).value;
					}
					else {
						newLang[key] = document.getElementById(key).innerHTML;
					}
				}
			}
			var div = document.createElement("div");
			div.setAttribute("class", "englishjson");
			div.innerHTML = "<h3>English Json</h3>";
			var elem = document.createElement("textarea");
			elem.setAttribute("rows", "15");
			elem.setAttribute("cols", "110");
			elem.setAttribute("wrap", "off");
			var langJson = "{\n";
			for (var key in newLang) {
				langJson += "\t\"" + key + "\"" + ": " + "\"" + newLang[key].replace(/\"/g, "\\\"").replace(/\n/g, "\\n") + "\",\n";
			}
			langJson = langJson.substr(0, langJson.length - 2);
			langJson += "\n}\n";
			elem.innerHTML = langJson;
			div.appendChild(elem);
			document.body.appendChild(div);

		}
	};
})(hclab);
