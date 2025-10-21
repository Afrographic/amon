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
      allowTaint: true,
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
}
