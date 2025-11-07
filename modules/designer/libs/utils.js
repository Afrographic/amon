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

  static async image_to_base_64(file) {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    // draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
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

  static convert_to_grayscale(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through every pixel (RGBA)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate grayscale value (weighted average)
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      data[i] = data[i + 1] = data[i + 2] = gray;
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

  static set_text_area_auto_grow(el) {
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  }

  static set_text_area_autoGrow() {
    let textareas = document.querySelectorAll("textarea");
    for (let item of textareas) {
      Utils.set_text_area_auto_grow(item);
    }
  }

  static generate_line_chart(render, data, x_values, title, color) {
    return new Chart(render, {
      type: "line",
      data: {
        labels: x_values,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: [Utils.hexToRgba(color, 0.2)],
            borderColor: [color],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        legend: {
          display: false,
        },
      },
    });
  }

  static generate_pie_chart(render, data, x_values, title) {
    return new Chart(render, {
      type: "pie",
      data: {
        labels: x_values,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: [
              "#B40000",
              "#8DA800",
              "#009728",
              "#ffb703",
              "#007897",
              "#606c38",
              "#000597",
              "#790097",
              "#dda15e",
              "#bc6c25",
              "#cdb4db",
              "#ffc8dd",
              "#ffafcc",
              "#bde0fe",
              "#a2d2ff",
              "#14213d",
              "#fca311",
              "#e5e5e5",
              "#780000",
              "#c1121f",
              "#fdf0d5",
              "#003049",
              "#669bbc",
              "#264653",
              "#2a9d8f",
              "#e9c46a",
              "#f4a261",
              "#e76f51",
              "#ccd5ae",
              "#e9edc9",
              "#fefae0",
              "#faedcd",
              "#d4a373",
              "#03045e",
              "#023e8a",
              "#0077b6",
              "#0096c7",

              "#48cae4",
              "#90e0ef",

              "#a3b18a",
              "#588157",
              "#3a5a40",

              "#4cc9f0",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        legend: {
          display: true,
        },
      },
    });
  }

  static Ucase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* 
  let chart_container: any = document.querySelector('#ca_users_r'){this is a canvas};
      let chart_render_context: any = chart_container.getContext('2d');
      this.generate_pie(chart_render_context, data, x_values);
  */

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

  static open_external_link(url) {
    var a_tag = document.createElement("a");
    a_tag.className = "ghost";
    a_tag.setAttribute("href", url);
    // a_tag.setAttribute("target", "_blank");

    document.body.appendChild(a_tag); // required for firefox
    a_tag.click();
    a_tag.remove();
  }

  static exportAsJSON(name, json) {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json));
    var aNode = document.createElement("a");
    aNode.setAttribute("href", dataStr);
    aNode.setAttribute("download", name + ".djehouty." + ".json");
    document.body.appendChild(aNode);
    aNode.click();
    aNode.remove();
  }

  static show_notif(msg) {
    //16 + 50 + 8
    let notifs = document.querySelectorAll(".notif");
    let div_content = `
    
    <div onclick="this.classList.add('notif_inactive')"  class="notif notif_inactive" style="font-size:3vw;position:fixed;top:${
      16 + (50 + 8) * notifs.length
    }px;right:16px;background-color:#006838;color:white;padding:2vw 3vw;border-radius:8px;display:flex;align-items:center;gap:2vw;">
       <img src="assets/images/notif_icon.svg" width="12vw"/>
        ${msg}

        <style>
            .notif {
                transition: 0.5s;
            }
            .notif_inactive {
                opacity: 0;
                transform: scale(0);
            }
            .notif_active {
                opacity: 1;
                transform: scale(1);
            }
        </style>
    </div>
    `;

    let notif_bloc = document.querySelector("#notif_bloc")
    notif_bloc.innerHTML += div_content;

    window.setTimeout(() => {
      let notifs = document.querySelectorAll(".notif");
      notifs[notifs.length - 1].classList.remove("notif_inactive");
    }, 10);

    window.setTimeout(() => {
      let notifs = document.querySelectorAll(".notif");
      notifs[notifs.length - 1].classList.add("notif_inactive");
    }, 3000);

    window.setTimeout(() => {
      let notifs = document.querySelectorAll(".notif");
      let notif = notifs[notifs.length - 1];
      notif.parentNode.removeChild(notif);
    }, 3200);
  }
}

Utils.set_text_area_autoGrow();
