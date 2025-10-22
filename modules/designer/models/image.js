class Image_D{
    constructor(){
        this.id = Utils.generate_unique_id_from_time();
        this.url="";
        this.file=undefined;
        this.width=60;
        this.border_top_left_radius=4;
        this.border_top_right_radius=4;
        this.border_bottom_left_radius=4;
        this.border_bottom_right_radius=4;
        this.opacity=1;
    } 
 
    render(){
        return `
        <img src="${this.url}" onclick="Edit.edit_image(event,'${this.id}')" style="
        width:${this.width}vw;
        opacity:${this.opacity};
        border-top-left-radius:${this.border_top_left_radius}px;
        border-top-right-radius:${this.border_top_right_radius}px;
        border-bottom-left-radius:${this.border_bottom_left_radius}px;
        border-bottom-right-radius:${this.border_bottom_right_radius}px;
        "/>
        `;
    }
}