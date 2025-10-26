class ChartD {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.data = [];
    this.x_values = [];
    this.title = "";
    this.mode="line";
    this.type = "chart";
  }

  render(){
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
  }

  from_json(json) {
    this.id = json.id;
    this.data = json.data;
    this.x_values = json.x_values;
    this.title = json.title;
    this.mode = json.mode;
    this.type = json.type;
  }

  clone() {
    let clone = new Latex();
    clone.id = `id_${Math.random() * 20000}`;
    clone.data = this.data;
    clone.x_values = this.x_values;
    clone.title = this.title;
    clone.mode = this.mode;
    clone.type = this.type;
    return clone;
  }
}
