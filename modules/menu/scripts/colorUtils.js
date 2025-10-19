class ColorUtils {
  static hexToHSL(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((x) => x + x)
        .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
  }

  static hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const color =
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  static getAnalogousColors(hex) {
    const { h, s, l } = this.hexToHSL(hex);
    const analogous1 = this.hslToHex((h + 30) % 360, s, l);
    const analogous2 = this.hslToHex((h - 30 + 360) % 360, s, l);
    return [analogous1, analogous2];
  }

  static getComplementaryColor(hex) {
    const { h, s, l } = this.hexToHSL(hex);
    return this.hslToHex((h + 180) % 360, s, l);
  }

  // Example usage
  //   const base = "#3498db";
  //   console.log("Base color:", base);
  //   console.log("Analogous colors:", getAnalogousColors(base));
  //   console.log("Complementary color:", getComplementaryColor(base));
}
