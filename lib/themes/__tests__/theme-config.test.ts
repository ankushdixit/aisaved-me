import { themes, themeList, defaultTheme, type ThemeId } from "../theme-config";

describe("theme-config", () => {
  describe("themes", () => {
    it("contains memphis theme", () => {
      expect(themes.memphis).toBeDefined();
      expect(themes.memphis.id).toBe("memphis");
      expect(themes.memphis.name).toBe("Memphis");
    });

    it("contains japanese theme", () => {
      expect(themes.japanese).toBeDefined();
      expect(themes.japanese.id).toBe("japanese");
      expect(themes.japanese.name).toBe("Zen");
    });

    it("contains organic theme", () => {
      expect(themes.organic).toBeDefined();
      expect(themes.organic.id).toBe("organic");
      expect(themes.organic.name).toBe("Organic");
    });

    it("each theme has required properties", () => {
      Object.values(themes).forEach((theme) => {
        expect(theme.id).toBeDefined();
        expect(theme.name).toBeDefined();
        expect(theme.description).toBeDefined();
        expect(theme.preview).toBeDefined();
        expect(theme.preview.primary).toBeDefined();
        expect(theme.preview.secondary).toBeDefined();
        expect(theme.preview.accent).toBeDefined();
      });
    });
  });

  describe("themeList", () => {
    it("contains all themes", () => {
      expect(themeList).toHaveLength(3);
      expect(themeList.map((t) => t.id)).toEqual(["memphis", "japanese", "organic"]);
    });
  });

  describe("defaultTheme", () => {
    it("is memphis", () => {
      expect(defaultTheme).toBe("memphis");
    });

    it("is a valid ThemeId", () => {
      const validIds: ThemeId[] = ["memphis", "japanese", "organic"];
      expect(validIds).toContain(defaultTheme);
    });
  });
});
