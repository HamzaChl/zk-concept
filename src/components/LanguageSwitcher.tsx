import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type LanguageCode = "fr" | "nl" | "en" | "de";

type LanguageOption = {
  code: LanguageCode;
  nameKey: string;
  flag: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "fr", nameKey: "language.fr", flag: "🇫🇷" },
  { code: "nl", nameKey: "language.nl", flag: "🇳🇱" },
  { code: "en", nameKey: "language.en", flag: "🇬🇧" },
  { code: "de", nameKey: "language.de", flag: "🇩🇪" },
];

const normalizeLanguage = (value: string | undefined): LanguageCode => {
  const shortCode = value?.split("-")[0] as LanguageCode | undefined;
  return shortCode &&
    LANGUAGE_OPTIONS.some((language) => language.code === shortCode)
    ? shortCode
    : "fr";
};

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const activeLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((language) => language.code === currentLanguage) ??
      LANGUAGE_OPTIONS[0],
    [currentLanguage],
  );

  const onSelectLanguage = (code: LanguageCode) => {
    void i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-[70] md:bottom-6 md:right-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/55 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-[0_8px_20px_rgba(15,23,42,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/65"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={t("language.label")}
        >
          <span className="text-base leading-none">{activeLanguage.flag}</span>
          <span>{t(activeLanguage.nameKey)}</span>
        </button>

        {isOpen ? (
          <div className="absolute bottom-[calc(100%+10px)] right-0 w-52 overflow-hidden rounded-md border border-white/35 bg-white/55 p-1.5 shadow-[0_10px_26px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <ul role="listbox" className="space-y-1">
              {LANGUAGE_OPTIONS.map((language) => (
                <li key={language.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language.code === currentLanguage}
                    onClick={() => onSelectLanguage(language.code)}
                    className={`flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-sm transition-all duration-200 ${
                      language.code === currentLanguage
                        ? "bg-gray-900/90 text-white"
                        : "text-gray-700 hover:-translate-y-0.5 hover:bg-white/60"
                    }`}
                  >
                    <span className="text-base leading-none">{language.flag}</span>
                    <span className="font-medium">{t(language.nameKey)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
