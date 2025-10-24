class Utils {
  static generate_unique_id_from_time() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    return `id_${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  static exportImage(canvas, name) {
    name = `${name} - ${this.generate_unique_id_from_time()}`;
    html2canvas(canvas, {
      useCors: true,
      allowTaint: false,
      scale: 8,
      width: canvas.offsetWidth,
      height: canvas.scrollHeight - 1,
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

  static crop_16_9(img) {
    const outputWidth = 1600;
    const origW = img.naturalWidth;
    const origH = img.naturalHeight;
    if (!origW || !origH) throw new Error("Failed to get image dimensions");

    const targetAspect = 16 / 9;
    const origAspect = origW / origH;

    let cropW, cropH;
    if (origAspect > targetAspect) {
      // image is too wide -> crop width
      cropH = origH;
      cropW = Math.round(cropH * targetAspect);
    } else {
      // image is too tall or perfect -> crop height
      cropW = origW;
      cropH = Math.round(cropW / targetAspect);
    }

    const cropX = Math.round((origW - cropW) / 2);
    const cropY = Math.round((origH - cropH) / 2);

    // Calculate output size (maintain 16:9)
    const outW = Math.round(outputWidth);
    const outH = Math.round((outW * 9) / 16);

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;

    const ctx = canvas.getContext("2d");
    // Optional: improve image smoothing quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // draw the cropped area scaled to output size
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropW,
      cropH, // source rect (crop)
      0,
      0,
      outW,
      outH // destination rect (canvas)
    );

    return canvas.toDataURL("image/jpeg");
  }

  static darken_image(img) {
    let opacity = 0.5;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // draw black rectangle overlay
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  }

  static reverse_array(arr) {
    for (let i = 0; i <= (arr.length - 1) / 2; i++) {
      let temp = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static remove_white_background(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Remove white background (example)
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
        data[i + 3] = 0; // Make transparent
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
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
}
