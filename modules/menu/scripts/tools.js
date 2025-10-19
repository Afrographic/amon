class Tools {
  static Ucase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static cropImageToSquare(img) {
    // Create a canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Determine the square size (based on width)
    const size = img.width;

    // Set canvas to square
    canvas.width = size;
    canvas.height = size;

    // Find cropping coordinates (center crop)
    const offsetX = 0; // we want to preserve full width
    const offsetY = (img.height - img.width) / 2;

    // Draw the cropped image
    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      size,
      size, // source rectangle
      0,
      0,
      size,
      size // destination rectangle
    );

    // Return cropped image as data URL (or blob)
    return canvas.toDataURL("image/jpeg");
  }

  static exportImage(canvas, name) {
    name = `${name} - ${this.generate_unique_id_from_time()}`;
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

  static format_date(date) {
    // 2025-10-10
    let months = [
      "",
      "Jan",
      "Fev",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = date.split("-")[0];
    let month = months[parseInt(date.split("-")[1])];
    let day = date.split("-")[2];
    return `${day} ${month} ${year}`;
  }

  static get_week_day(date) {
    let year = parseInt(date.split("-")[0]);
    let month = parseInt(date.split("-")[1]);
    let day = parseInt(date.split("-")[2]);
    date = new Date(year, month - 1, day);
    return this.Ucase(date.toLocaleString("fr-FR", { weekday: "long" }));
  }

  static set_text_area_auto_grow(el) {
    if (el == undefined) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  static rgb_to_hex(rgb_color) {
    const [r, g, b] = rgb_color.match(/\d+/g).map(Number);
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.padStart(2, "0");
        })
        .join("")
        .toUpperCase()
    );
  }

  // Expand shorthand (#abc) to full (#aabbcc)
  static expandHex(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      return hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }
    return hex;
  }

  // 1) hex -> "rgba(r,g,b,a)"
  static hexToRgba(hex, alpha = 0.91) {
    if (typeof hex !== "string") throw new TypeError("hex must be a string");
    const h = this.expandHex(hex.replace(/\s+/g, ""));
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error("Invalid hex color");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    // clamp alpha between 0 and 1
    const a = Math.max(0, Math.min(1, Number(alpha)));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // 2) hex -> "#RRGGBBAA" where AA is opacity in hex
  static hexWithOpacity(hex, opacityPercent = 5) {
    if (typeof hex !== "string") throw new TypeError("hex must be a string");
    const h = this.expandHex(hex.replace(/\s+/g, ""));
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error("Invalid hex color");
    const a = Math.round(
      (Math.max(0, Math.min(100, Number(opacityPercent))) / 100) * 255
    );
    const alphaHex = a.toString(16).padStart(2, "0");
    return `#${h.toLowerCase()}${alphaHex}`;
  }

  static rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static format_number(n) {
    const s = String(n);
    const [intPart, fracPart] = s.split(".");
    const intWithSpace = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return fracPart ? `${intWithSpace}.${fracPart}` : intWithSpace;
  }
}

Tools.set_text_area_auto_grow(document.querySelector("#text_accroche"));
