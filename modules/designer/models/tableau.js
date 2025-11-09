class Tableau {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.width = 75;
    this.border_color = "#aaa";
    this.text_color = "#000";
    this.data = [
      ["", ""],
      ["", ""],
    ];
    this.margin_auto = 0;
    this.margin_left=0;
    this.margin_top=0;
    this.type = "tableau";
  }

  /*margin-left: initial ou auto;
    margin-right: initial ou auto;*/

  render() {
    //Compute margins
    let margins = `margin-top:${this.margin_top}vw;`;
    if(this.margin_auto == 1){
      margins += `
      margin-left: auto;
      margin-right: auto;
      `
    }else{
      margins += `
      margin-left: ${this.margin_left}vw;
      `
    }

    let res = `<table id="${this.id}" onclick="UI.hide_all();TableauEdit.show_edit_tableau('${this.id}')" style="z-index:2;${margins}width:${this.width}%;border-collapse:collapse;table-layout: fixed;">`;
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
    let res = `<table id="${this.id}"  style="z-index:2;width:100%;border-collapse:collapse;table-layout: fixed;">`;
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

  remove_colonne(){
    if(this.data[0].length == 1) return;
    for (let i = 0; i <= this.data.length - 1; i++) {
      this.data[i].pop();
    }
  }

  remove_ligne(){
    if(this.data.length == 1) return;
    this.data.pop();
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
    this.margin_auto = json.margin_auto;
    this.type = json.type;
  }

  to_json() {
    return {
      id: this.id,
      width: this.width,
      border_color: this.border_color,
      text_color: this.text_color,
      data: this.data,
      margin_auto:this.margin_auto,
      type: this.type,
    };
  }

  clone() {
    let clone = new Tableau();
    clone.id = `id_${Math.random() * 100000}`;
    clone.width = this.width;
    clone.border_color = this.border_color;
    clone.text_color = this.text_color;
    clone.data = this.data;
    clone.margin_auto = this.margin_auto;
    clone.type = this.type;
    return clone;
  }
}

