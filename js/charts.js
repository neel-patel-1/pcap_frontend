/*
Application implementing charts revealing statistics related to packets
seen by the watcher so far
*/

/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#charts")

//create bar chart updating upon arrival of every UPDATE_NUM packets
let colors = ["red", "green","blue","orange","brown", "purple"]

let UPDATE_NUM = 1
let ctr = 0

let barDiv 
let barCanvas
let barChart

let xValues = prots
let yValues = prots.map( () => 0)
let barColors = prots.map( (p,a) => colors[a])

/**
@pre None
@post Bar-Chart added to the app div
@returns None
*/
const createBarChart = () => {
    barDiv = document.createElement('div')
    barCanvas = document.createElement("canvas")
    barCanvas.setAttribute("style", "width:100%;max-width:700px")
    barCanvas.id = "protBars"

    appSegment.appendChild(barCanvas)
    barChart = new Chart( "protBars", {
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

const updateBarChart = (packet) => {
    // console.log("chello")
    console.log(barChart.data.datasets[0].data)
    // oldData = barChart.data.datasets[0].data
    barChart.data.datasets[0].data = 
        barChart.data.datasets[0].data.map( (oldNum, i) => {
            console.log(packet.prot)
            if(xValues[i] == packet.prot) return (oldNum + 1)
            else return (oldNum)
        } )
    ctr++
    if(ctr % UPDATE_NUM == 0){
        barChart = new Chart( "protBars", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: barChart.data.datasets[0].data
                }]
            },
            options: {}
        })
    }
}

createBarChart()

/*register app's packet function with the packetStream*/
packetStream(updateBarChart)

