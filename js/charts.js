/*
Application implementing charts revealing statistics related to packets
seen by the watcher so far
*/

/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#charts")

let allCharts = document.createElement('div')
allCharts.id = 'chartGrid'
allCharts.style.display =  'grid'
allCharts.style.gridAutoRows ='auto'
allCharts.style.gridTemplateAreas = "a a"
allCharts.style.gap = "10px"
/*
#grid {
  width: 200px;
  display: grid;
  grid-template-areas: "a a";
  gap: 10px;
  grid-auto-rows: 100px;
}
*/

appSegment.appendChild(allCharts)
//create bar chart updating upon arrival of every UPDATE_NUM packets
let colors = ["red", "green","blue","orange","brown", "purple"]

let UPDATE_NUM = 1


let barDiv 
let barCanvas
let barChart
let barctr = 0

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
    // barDiv.style.gridColumn ='1'
    // barDiv.style.gridRow= '1'
    allCharts.appendChild(barDiv)

    barCanvas = document.createElement("canvas")
    barCanvas.setAttribute("style", "width:100%;max-width:700px")
    barCanvas.id = "protBars"

    barDiv.appendChild(barCanvas)

    appSegment.appendChild(barCanvas)
    barChart = new Chart( "protBars", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                label: null,
                data: yValues
            }]
        },
        options: {
            scales:{
                beginAtZero:true,
            },
            legend:{
                display: false
            },
            animation: {
                duration: 0, // general animation time
            },            
            tooltips: {enabled: false},
            hover: {mode: null},
            
        }
    })
}

/*


*/
const updateBarChart = (packet) => {
    barChart.data.datasets[0].data = 
        barChart.data.datasets[0].data.map( (oldNum, i) => {
            if(xValues[i] == packet.prot) return (oldNum + 1)
            else return (oldNum)
        } )
    barctr++
    if(barctr % UPDATE_NUM == 0){
        barChart = new Chart( "protBars", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: barChart.data.datasets[0].data
                }]
            },
            options: {
                scales:{
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend:{
                    display: false
                },
                animation: {
                    duration: 0, // general animation time
                },
                tooltips: {enabled: false},
                hover: {mode: null},
            }
        })
    }
}


createBarChart()
/*register app's packet function with the packetStream*/
packetStream(updateBarChart)

let pieDiv 
let pieCanvas
let pieChart
let piectr = 0
/*Protocol Pie Chart*/
const createPieChart = () => {
    pieDiv = document.createElement('div')
    // pieDiv.style.gridColumn ='1'
    // pieDiv.style.gridRow= '1'
    pieCanvas = document.createElement("canvas")
    pieCanvas.setAttribute("style", "width:100%;max-width:700px")
    pieCanvas.id = "protPie"
    allCharts.appendChild(pieDiv)
    pieDiv.appendChild(pieCanvas)
    pieChart = new Chart( "protPie", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            scales:{
                beginAtZero:true,
            },
            legend:{
                display: false
            },
            animation: {
                duration: 0, // general animation time
            }
        }
    })
    
}


const updatePieChart = (packet) => {
    pieChart.data.datasets[0].data = 
        pieChart.data.datasets[0].data.map( (oldNum, i) => {
            if(xValues[i] == packet.prot) return (oldNum + 1)
            else return (oldNum)
        } )
    piectr++
    if(piectr % UPDATE_NUM == 0){
        pieChart = new Chart( "protPie", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,                    
                    data: pieChart.data.datasets[0].data
                }]
            },
            options: {
                scales:{
                    beginAtZero:true,
                },
                legend:{
                    display: false
                },
                animation: {
                    duration: 0, // general animation time
                }
            }
        })
    }
}
createPieChart()
packetStream(updatePieChart)