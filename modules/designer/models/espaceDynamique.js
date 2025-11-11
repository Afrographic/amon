class EspaceDynamique {
  constructor() {
    this.id = Utils.generate_unique_id_from_time();
    this.type = "espaceDynamique";
  }

  render() {
    return `<div style='flex:1;width:32px;height:32px;' onclick="EspaceDynamiqueEdit.showEditor(event,'${this.id}')"></div>`;
  }

  from_json(json) {
    this.id = json.id;
    this.type = json.type;
  }
  to_json() {
    return {
      id: this.id,
      type: this.type,
    };
  }
}
