import React from "react";
import { Compass } from "lucide-react";
import { languageLabels, useTranslation } from "../../utils/useTranslation";

const LanguageCard: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold"><Compass size={16} /> {t("Language preference")}</div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{languageLabels[language]}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{t("Choose how the app labels and actions should appear across screens.")}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="language-select" className="text-xs text-gray-500 dark:text-gray-400">{t("App language")}</label>
        <select id="language-select" value={language} onChange={e => setLanguage(e.target.value as any)} className="mt-1 sm:mt-0 w-full sm:w-auto bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm">
          {Object.entries(languageLabels).map(([code, label]) => (
            <option key={code} value={code}>{t(label)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageCard;
