import i18next from "./i18n";
describe("i18n", () => {
  describe("t()", () => {
    it("initialSetting ja", () => {
      i18next.changeLanguage("ja");
      const actual = i18next.t("initialSetting");
      const expected = "初期設定";
      expect(actual).toBe(expected);
    });
    it("initialSetting en", () => {
      Session.getActiveUserLocale = jest.fn().mockImplementation(name => {
        return "en";
      });
      i18next.changeLanguage("en");
      const actual = i18next.t("initialSetting");
      const expected = "Initial setting";
      expect(actual).toBe(expected);
    });
  });
});
