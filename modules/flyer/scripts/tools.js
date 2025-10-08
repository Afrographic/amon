class Tools {
  static formatNumWithWhiteSpace(n) {
    const s = String(n);
    const [intPart, fracPart] = s.split(".");
    const intWithSpace = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return fracPart ? `${intWithSpace}.${fracPart}` : intWithSpace;
  }

  static Ucase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static generate_unique_id_from_time() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  static exportImage(canvas,name) {
    name = `Djehouty - ${name}`;
    html2canvas(canvas, {
      useCors: true,
      allowTaint: false,
      scale: 8,
      width: canvas.offsetWidth,
      height: canvas.scrollHeight,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: canvas.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = imgData;
      link.download = `${name}.jpeg`;
      link.click();
    });
  }

  static darkenColor(color, percent) {
    // Convert hex to RGB
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
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
      h /= 6;
    }

    // Darken lightness
    l -= l * (percent / 100);
    l = Math.max(0, Math.min(1, l));

    // Convert back to RGB
    function hslToRgb(h, s, l) {
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // gray
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    const [R, G, B] = hslToRgb(h, s, l);
    return `rgb(${R}, ${G}, ${B})`;
  }

  static generateLogo(character) {
    // Create a 100x100 canvas
    Config.canvas = document.createElement("canvas");
    Config.canvas.width = 120;
    Config.canvas.height = 120;
    const ctx =  Config.canvas.getContext("2d");

    // Helper to get a random dark color
    function randomDarkColor() {
      const r = Math.floor(Math.random() * 80);
      const g = Math.floor(Math.random() * 80);
      const b = Math.floor(Math.random() * 80);
      return `rgb(${r},${g},${b})`;
    }

    // Create a linear gradient with two random dark colors
    const gradient = ctx.createLinearGradient(0, 0, 100, 100);
    gradient.addColorStop(0, randomDarkColor());
    gradient.addColorStop(1, randomDarkColor());

    // Fill background with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);

    // Draw the character centered in white
    ctx.fillStyle = "white";
    ctx.font = "bold 60px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(character, 50, 50);
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async set_text_area_auto_grow() {
    await this.sleep(200);
    let el = document.querySelector("#descArea");

    if (el != null) {
      el.addEventListener("input", () => {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      });
    }
  }
}


Tools.set_text_area_auto_grow();