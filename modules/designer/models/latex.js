class Latex {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.text = "";
    this.type = "latex";
  }

  render() {}

  from_json(json) {
    this.id = json.id;
    this.text = json.text;
    this.type = json.type;
  }

  clone() {
    let clone = new Text();
    clone.id = `id_${Math.random() * 20000}`;
    clone.value = this.value;
    clone.font_size = this.font_size;
    return clone;
  }
}
