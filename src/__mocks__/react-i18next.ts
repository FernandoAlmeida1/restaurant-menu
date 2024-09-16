const mockUseTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    changeLanguage: () => new Promise(() => {}), 
  },
});

export { mockUseTranslation as useTranslation };
