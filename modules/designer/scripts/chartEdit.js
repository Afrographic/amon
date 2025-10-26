class ChartEdit {
  static add_new() {
    let chart = new ChartD();
    Create.artboard.push(chart);
    Create.render();
    Create.edit_id = chart.id;
    UI.hide_add_graphix();
    this.init_edit(Create.edit_id);
  }

  static init_edit(id) {
    Create.edit_id = id;
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].render_editable_chart();
      }
    }
    UI.show_graph_editor();
  }

  static add_colonne() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].add_colonne();
        Create.artboard[i].render_editable_chart();
        Create.render();
      }
    }
  }

  static set_curve() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].mode = "line";
        Create.render();
      }
    }
  }
  static set_circle() {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].mode = "circle";
        Create.render();
      }
    }
  }

  static set_color(el) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].color = el.value;
        Create.render();
      }
    }
  }

  static edit_data(el, index) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].data[index] = parseInt(el.value);
        Create.render();
      }
    }
  }

  static edit_x_value(el, index) {
    for (let i = 0; i <= Create.artboard.length - 1; i++) {
      if (Create.artboard[i].id == Create.edit_id) {
        Create.artboard[i].x_values[index] = Utils.Ucase(el.value);
        Create.render();
      }
    }
  }
}
