class ChartD {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.data = [12, 15, 8];
    this.x_values = ["Lun", "Mar", "Mer"];
    this.title = "circle";
    this.color = "#0039B3";
    this.mode = "line";
    this.type = "chart";
  }

  add_colonne() {
    this.data.push(0);
    this.x_values.push("");
  }

  remove_colonne() {
    this.data.pop();
    this.x_values.pop();
  }

  render() {
    let canvas = document.querySelector("#chart_renderer");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    if (this.mode == "line") {
      Utils.generate_line_chart(
        context,
        this.data,
        this.x_values,
        this.title,
        this.color
      );
    }
    if (this.mode == "circle") {
      Utils.generate_pie_chart(context, this.data, this.x_values, this.title);
    }

    if (this.mode == "bar") {
      Utils.generate_bar_chart(context, this.data, this.x_values, this.title);
    }

    let rendered_img = canvas.toDataURL("image/png");
    return `
    <div class="b1 br8 p16 bg_grey" style="width:100%" onclick="ChartEdit.init_edit('${this.id}')">
      <img src="${rendered_img}" width="100%"/>
    </div>
    `;
  }

  render_editable_chart() {
    let res = `<table style="border-collapse:collapse;" class="graph_table">`;
    // Load X-Values
    res += "<tr> <td >x</td>";
    for (let i = 0; i <= this.x_values.length - 1; i++) {
      res += `<td><input type="text" value="${this.x_values[i]}"  oninput="ChartEdit.edit_x_value(this,${i})" placeholder="Ecrire..."/></td>`;
    }
    res += "</tr>";
    // Load Data
    res += "<tr><td>y</td>";
    for (let i = 0; i <= this.data.length - 1; i++) {
      res += `<td><input type="number" value="${this.data[i]}" inputmode="numeric"
      pattern="[0-9]*" oninput="ChartEdit.edit_data(this,${i})" placeholder="Ecrire..."/></td>`;
    }
    res += "</tr>";

    res += "</table>";
    let graph_tab_editor = document.querySelector("#graph_tab_editor");
    graph_tab_editor.innerHTML = res;
  }

  from_json(json) {
    this.id = json.id;
    this.data = json.data;
    this.x_values = json.x_values;
    this.title = json.title;
    this.mode = json.mode;
    this.color = json.color;
    this.type = json.type;
  }

  to_json() {
    return {
      id: this.id,
      data: this.data,
      x_values: this.x_values,
      title: this.title,
      mode: this.mode,
      color: this.color,
      type: this.type,
    };
  }

  clone() {
    let clone = new Latex();
    clone.id = `id_${Math.random() * 20000}`;
    clone.data = this.data;
    clone.x_values = this.x_values;
    clone.title = this.title;
    clone.color = this.color;
    clone.type = this.type;
    return clone;
  }
}
