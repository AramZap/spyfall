import React from "react";
import { useChangeLocale, useCurrentLocale } from "../locales";

import allLanguages from "../locales/_all_languages.json";

const LanguageSelector = () => {
	const lang = useCurrentLocale();
	const changeLocale = useChangeLocale();

	const onLanguageChange = (langCode) => {
		const a = changeLocale(langCode);
	};

	return (
		<div dir="ltr" className="languages">
			<select
				className="language-select"
				value={lang}
				onChange={(e) => onLanguageChange(e.target.value)}
			>
				{Object.keys(allLanguages).map((code) => (
					<option key={code} value={code}>
						{allLanguages[code]}
					</option>
				))}
			</select>
			<ul className="language-list">
				{Object.keys(allLanguages).map((code) => (
					<li key={code}>
						<a
							className="btn-set-language"
							href="#"
							data-language="code"
							onClick={() => onLanguageChange(code)}
						>
							{allLanguages[code]}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LanguageSelector;
