class Tableau {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.width = 100;
    this.border_color = "#aaa";
    this.text_color = "#000";
    this.data = [
      ["", ""],
      ["", ""],
    ];
    this.type = "tableau"
  }

  render() {
    let res = `<table id="${this.id}" onclick="TableauEdit.show_edit_tableau('${this.id}')" style="width:${this.width}%;border-collapse:collapse;table-layout: fixed;">`;
    for (let i = 0; i <= this.data.length - 1; i++) {
      res += "<tr>";
      for (let j = 0; j <= this.data[i].length - 1; j++) {
        res += `<td style="font-size: 3vw;padding:2vw 3vw;border:1px solid ${this.border_color};color:${this.text_color};">${this.data[i][j]}</td>`;
      }
      res += "</tr>";
    }
    res += "</table>";
    return res;
  }
 
  render_editable_table() {
    let res = `<table id="${this.id}"  style="width:${this.width}%;border-collapse:collapse;table-layout: fixed;">`;
    for (let i = 0; i <= this.data.length - 1; i++) {
      res += "<tr>";
      for (let j = 0; j <= this.data[i].length - 1; j++) {
        res += `<td style="font-size: 3vw;padding:3vw;border:1px solid ${this.border_color};">
          <input type="text" value="${this.data[i][j]}" placeholder="Ecrire..." oninput="TableauEdit.change_tableau_value(this,'${this.id}',${i},${j})">
        </td>`;
      }
      res += "</tr>";
    }
    res += "</table>";
    let tableau_renderer_edit = document.querySelector(
      "#tableau_renderer_edit"
    );
    tableau_renderer_edit.innerHTML = res;
  }

  add_colonne() {
    for (let i = 0; i <= this.data.length - 1; i++) {
      this.data[i].push("");
    }
  }

  add_ligne() {
    let total_cols = this.data[0].length;
    this.data.push([]);
    for (let i = 0; i <= total_cols - 1; i++) {
      this.data[this.data.length - 1].push("");
    }
  }

  from_json(json) {
    this.id = json.id;
    this.width = json.width;
    this.border_color = json.border_color;
    this.text_color = json.text_color;
    this.data = json.data;
    this.type = json.type;
  }

  clone() {
    let clone = new Tableau();
    clone.id = `id_${Math.random()*100000}`;
    clone.width = this.width;
    clone.border_color = this.border_color;
    clone.text_color = this.text_color;
    clone.data = this.data;
    clone.type = this.type;
    return clone;
  }
}
