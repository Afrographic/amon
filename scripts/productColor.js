
class ProductColor{
    static colorsView = document.querySelector(".colorsView");

    static colorsValues = ["#40E0D0","#E2725B","#800020","#50C878","#000000","#FFFFFF","#D3D3D3","#F5F5DC","#FAF3E0","#FADADD","#C8A2C8","#98FF98","#AEC6CF","#FFFF99","#FFDAB9","#78866B","red","orange","blue"];
    static colors = [];
    static selectedColor = "";


    static initColors(){
        for(let i = 0; i <= this.colorsValues.length-1;i++){
            this.colors.push({
                code:this.colorsValues[i],
                selected: false
            })
        }
        this.renderView();
    }

    static renderView(){
        this.colorsView.innerHTML = "";
        for(let i = 0 ;i <= this.colors.length -1;i++){
            let selected = this.colors[i].selected ? "selected" : "";
            this.colorsView.innerHTML += `
                 <div onclick="ProductColor.selectColor(${i})" class="colorItem ${selected}" style="background-color:${this.colors[i].code}"></div>
            `
        }
    }
    
    static selectColor(i){
        for(let j = 0 ; j<= this.colors.length-1;j++){
            this.colors[j].selected = false;
        }
        this.colors[i].selected = true;
        console.log(this.colors[i].selected);
        this.renderView();
        this.selectedColor = this.colors[i].code
    }
}

ProductColor.initColors();