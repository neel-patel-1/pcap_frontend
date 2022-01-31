/*
Application implementing charts revealing statistics related to packets
seen by the watcher so far
*/

/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#charts")

//create bar chart updating upon arrival of every UPDATE_NUM packets


let xValues = prots
let yValues = prots.map( () => 0)
let barColors = ["red", "green","blue","orange","brown"];

/**
@pre None
@post Bar-Chart added to the app div
@returns None
*/
const createBarChart = () => {
    let barCanvas = document.createElement("canvas")
    barCanvas.setAttribute("style", "width:100%;max-width:700px")
    barCanvas.id = "protBars"

    appSegment.appendChild(barCanvas)
    let barChart = new Chart( "protBars", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {}
    })
}


createBarChart()

/*register app's packet function with the packetStream*/
packetStream(addPacket)
