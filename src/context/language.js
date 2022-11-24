import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import localesConfig from "../../locales.config.js";

export const LanguageContext = createContext();
export const useTranslation = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const { locale, push, asPath } = useRouter();
    const [translationFile, setTranslationFile] = useState();
    const [language, setLanguage] = useState(localesConfig.find(el => el.default).value)
    const [languages, setLanguages] = useState(localesConfig);

    useEffect(() => {
        const store = localStorage.getItem("language");
        if (locale) {
            if (localesConfig.find(el => el.value === locale)) {
                if (locale !== store) {
                    const storedLanguage = languages.find(el => el.value === store);
                    if (storedLanguage) {
                        updateLanguage(storedLanguage.value, storedLanguage.locale);
                    } else {
                        changeLanguage(languages.find(el => el.default).locale);
                    }
                }
            }
        }
    }, [ language ]);

    const changeLanguage = (language) => {
        const languageFile = languages.find((lng) => lng.locale === language);
        try {
            updateLanguage(languageFile.value, languageFile.locale);
        } catch (error) {
            alert('Language not found');
        }
    };

    const translate = (text) => {
        if (translationFile) {
            if (text.includes('.')) {
                const splittedText = text.split('.');

                if (splittedText.length === 2) {
                    return translationFile[splittedText[0]][splittedText[1]];
                } else if (splittedText.length > 2) {
                    let result = translationFile[splittedText[0]];
                    splittedText.forEach((text, index) => {
                        if (index > 0) {
                            result = result[text];
                        }
                    });
                    
                    return result;
                }
            } else {
                return translationFile[text];
            }
        }
        return text;
    }

    const updateLanguage = (value, locale) => {
        setLanguage(value);
        setTranslationFile(require(`@/locales/${locale}.json`));
        localStorage.setItem("language", value);
        push(asPath, asPath, { locale: value });
    }

    return (
        <LanguageContext.Provider value={{ languages, translate, changeLanguage, language }}>
            {children}
        </LanguageContext.Provider>
    );
}