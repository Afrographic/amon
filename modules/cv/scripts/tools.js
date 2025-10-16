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

  static export_pdf(canvas, name) {
    name = `CV - ${name}`;
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
      Tools.dataURLToPDF(imgData,name);
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

  static generateLogo(character) {
    // Create a 100x100 canvas
    Config.canvas = document.createElement("canvas");
    Config.canvas.width = 120;
    Config.canvas.height = 120;
    const ctx = Config.canvas.getContext("2d");

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

  static  set_text_area_auto_grow(el) {
    if(el == undefined) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
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
    return canvas.toDataURL("image/png");
  }

  static lightenHex(hex, percent = 90) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }

    const num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    const adjust = (channel) =>
      Math.min(255, Math.round(channel + (255 - channel) * (percent / 100)));

    r = adjust(r);
    g = adjust(g);
    b = adjust(b);

    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
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
  static hexToRgba(hex, alpha = 0.05) {
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

  static format_cv_date(date){
    console.log(date);
    return date;
  }

  static async dataURLToPDF(dataURL,fileName) {
    const { jsPDF } = window.jspdf;

    // Create PDF (A4 portrait, mm units)
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Set margins (same left/right)
    const marginX = 0; // mm (you can change)
    const usableWidth = pageWidth - marginX * 2;

    // Load the image
    const img = new Image();
    img.src = dataURL;
    await img.decode();

    const imgWidthPx = img.width;
    const imgHeightPx = img.height;

    // Scale image keeping aspect ratio
    const ratio = imgHeightPx / imgWidthPx;
    const imgWidthMm = usableWidth;
    const imgHeightMm = imgWidthMm * ratio;

    // Draw image across multiple pages if necessary
    let remainingHeight = imgHeightMm;
    let positionY = 0;

    while (remainingHeight > 0) {
      const renderHeight = Math.min(remainingHeight, pageHeight);

      pdf.addImage(
        dataURL,
        "PNG",
        marginX,
        0,
        imgWidthMm,
        imgHeightMm,
        undefined,
        "FAST",
        0,
        positionY // crop Y offset (from full image)
      );

      remainingHeight -= pageHeight;
      positionY += pageHeight;

      
    }

    pdf.save(fileName+".pdf");
  }

  static format_date(date){
    // 2025-10-10
    let months = ["","Jan","Fev","Mars","Avril","Mai","Juin","Juillet","Aout","Sept","Oct","Nov","Dec"];
    let year = date.split("-")[0];
    let month = months[parseInt(date.split("-")[1])];
    return `${month} ${year}`;
  }
}

Tools.set_text_area_auto_grow(document.querySelector("#user_bio"));
