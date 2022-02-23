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
    barCanvas = document.getElementById("barCanvas")
    const barCtx = barCanvas.getContext('2d')

	barCanvas.setAttribute("width", "38%")
    barCanvas.setAttribute("height", "38%")

    barChart = new Chart( barCtx, {
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
@pre: Bar Chart created
@param: packet new packet causing chart update
@post: chart is updated to reflect updated stats
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
    
    pieCanvas=document.getElementById("pieCanvas")
    const pieCtx = pieCanvas.getContext('2d')

    pieCanvas.setAttribute("width", "38%")
    pieCanvas.setAttribute("height", "38%")

    pieChart = new Chart( pieCtx, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
			resonsive: true,
			maintainAspectRation: true,
            scales:{
                beginAtZero:true,
            },
            legend: { display: true },
            tooltips: {enabled: false},
            hover: {mode: null},
            animation: {
                duration: 0, // general animation time
            }
        }
    })
}


/*
@pre: Pie Chart created
@param: packet new packet causing chart update
@post: chart is updated to reflect updated stats
*/
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

const stTime = new Date()
let times = []
let numpkts = 0
let numpktsarr = []

let lineCanvas
let lineChart
let linectr = 0

let lineColors = prots.map( (p,a) => colors[a])

/**
@pre None
@post line-Chart added to the app div
@returns None
*/
const createlineChart = () => {
    lineCanvas = document.getElementById("lineCanvas")
    const lineCtx = lineCanvas.getContext('2d')

	lineCanvas.setAttribute("width", "38%")
    lineCanvas.setAttribute("height", "38%")

    lineChart = new Chart( lineCtx, {
        type: "line",
        data: {
            labels: times,
            datasets: [{
                backgroundColor: lineColors,
                label: null,
                data: numpktsarr,
				fill: false
            }]
        },
        options: {
            // scales:{
            //     beginAtZero:true,
            // },
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
@pre: line Chart created
@param: packet new packet causing chart update
@post: chart is updated to reflect updated stats
*/
const updatelineChart = (packet) => {
    numpkts++
    if(linectr % UPDATE_NUM == 0){
        times.push((new Date().getTime()) - stTime.getTime())
        numpktsarr.push(numpkts)
        lineChart.update()
    }
}

createBarChart()
packetStream(updateBarChart)

createPieChart()
packetStream(updatePieChart)

createlineChart()
packetStream(updatelineChart)
