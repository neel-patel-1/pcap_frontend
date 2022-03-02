function generateDarkColorHex() {//https://helderesteves.com/generating-random-colors-js/
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    return color;
}

function generateLightColorHex(){
    let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}