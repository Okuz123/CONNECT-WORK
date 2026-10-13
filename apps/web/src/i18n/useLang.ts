import { useEffect, useState } from 'react';
import { T, LANGS, type Lang } from './translations';

const KEY = 'cw_lang';

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    return saved && T[saved] ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem(KEY, lang);
    const dir = LANGS.find((l) => l.code === lang)?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => T[lang][key] || T.en[key] || key;

  return { lang, setLang, t, langs: LANGS };
}
