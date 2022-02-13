/*
Application implementing charts revealing statistics related to packets
seen by the watcher so far
*/

/*
https://stackoverflow.com/questions/57090660/resizing-chart-issue-with-css-grid
--assist with grid resizing
*/

/*Selecting the corresponding div for the app*/
//create bar chart updating upon arrival of every UPDATE_NUM packets
let colors = ["red", "green","blue","orange","brown", "purple"]

let UPDATE_NUM = 1


// let barDiv 
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
    barCanvas = document.createElement("canvas")
    barCanvas.id = "protBars"

	//barCanvas.setAttribute("style", "max-width:700px")

    document.querySelector("#ch1").appendChild(barCanvas)
    barChart = new Chart( "protBars", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                label: null,
                data: yValues,
				fill: false
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
			layout: {
				padding: {
					top: 10
					}
			}
            
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
        barChart.update()
    }
}



// let pieDiv 
let pieCanvas
let pieChart
let piectr = 0
/*Protocol Pie Chart*/
const createPieChart = () => {
    pieCanvas = document.createElement("canvas")
    pieCanvas.id = "protPie"

    document.querySelector("#ch2").appendChild(pieCanvas)

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
        pieChart.update()
    }
}

createBarChart()
packetStream(updateBarChart)

createPieChart()
packetStream(updatePieChart)
