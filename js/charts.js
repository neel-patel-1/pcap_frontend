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
let pieColors = ["0xFF0000", "green"]
let barColors = [generateLightColorHex(),generateLightColorHex(), generateLightColorHex()]
let lineColor = ["0xFFFFFF"]
let UPDATE_NUM = 1


// let barDiv 
let barCanvas
let barChart
let barctr = 0

let xValues = [ "TLS", "Payload", "Unknown"] 
let yValues = [0,0,0]

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
            responsive:true,
            scales:{
                xAxes:[{
                    scaleLabel:{
                        font: {
                            weight: 'bold',
                            size:14
                        },
                        display: true,
                        labelString: 'Protocol'
                    }
                }],
                yAxes: [{
                    scaleLabel:{
                        font: {
                            weight: 'bold',
                            size:14
                        },
                        display: true,
                        labelString: '# Packets'
                    },
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
    /*find unseen ULPs in the packet data*/
    if(Object.keys(packet).find((l) => l==5 || l==6 || l==7)){
        if(packet[5] != null){
            let l5 = packet[5].split(" ")[0]
            if( !(xValues.find((k) => k == l5)) ){
                // console.log("new l5")
                xValues.push(l5)
                yValues.push(1)
                barColors.push(generateLightColorHex())
            }else{
                yValues[xValues.indexOf(l5)]++
            }
        }
        if(packet[6] != null){
            let l6 = packet[6].split(" ")[0]
            if( !(xValues.find((k) => k == l6)) ){
                // console.log("new l6")
                xValues.push(l6)
                yValues.push(1)
                barColors.push(generateLightColorHex())
            }else{
                yValues[xValues.indexOf(l6)]++
            }
        }
        if(packet[7] != null){
            let l7 = packet[7].split(" ")[0]
            if( !(xValues.find((k) => k == l7))){
                // console.log("new l7")
                xValues.push(l7)
                yValues.push(1)
                barColors.push(generateLightColorHex())
            }else{
                yValues[xValues.indexOf(l7)]++
            }
        }
        // console.log(xValues, yValues)
    }
    
    if(barctr % UPDATE_NUM == 0){
        barChart.update()
    }
}



// let pieDiv 
let pieCanvas
let pieChart
let piectr = 0
let xLLP = []
let yLLP = []
/*Protocol Pie Chart*/
const createPieChart = () => {
    
    pieCanvas=document.getElementById("pieCanvas")
    const pieCtx = pieCanvas.getContext('2d')

    pieCanvas.setAttribute("width", "38%")
    pieCanvas.setAttribute("height", "38%")

    pieChart = new Chart( pieCtx, {
        type: "doughnut",
        data: {
            labels: xLLP,
            datasets: [{
                backgroundColor: pieColors,
                data: yLLP
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
    if(Object.keys(packet).find((l) => l==4)){
        if(packet[4] != null){
            let l4 = packet[4].split(" ")[0]
            if( !(xLLP.find((k) => k == l4)) ){
                // console.log("new l4")
                xLLP.push(l4)
                yLLP.push(1)
                pieColors.push(generateDarkColorHex())
            }else{
                yLLP[xLLP.indexOf(l4)]++
            }
        }
        
    }
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

let lineColors = prots.map( (p,a) => "0xff0000")

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
                backgroundColor: lineColor,
                label: null,
                data: numpktsarr,
				fill: false
            }]
        },
        options: {
            scales:{
                xAxes:[{
                    scaleLabel:{
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: '# Packets'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
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
			},
            plugins: {
                display: true,
                text: 'Total Traffic'
            }
            
        }
    })
}


/* Line chart needs to control its own x axis to keep time intervals consistent*/
const LIMIT = 12
const UPDATE = 1000
const startLine = () => {
    setInterval(() => {
        // times.push(Math.round(((new Date().getTime()) - stTime.getTime())/1000))
        times.push((new Date().toGMTString()).split(" ")[4])

        numpktsarr.push(numpkts)
        if(times.length > LIMIT){
            times = times.filter( (i,j) => j%2==0)
            lineChart.data.labels = times
            numpktsarr = numpktsarr.filter( (i,j) => j%2==0)
            lineChart.data.datasets[0].data = numpktsarr
        }
        lineChart.update()
    }, UPDATE)
}

/*
@pre: line Chart created
@param: packet new packet causing chart update
@post: chart is updated to reflect updated stats
*/
const updatelineChart = (packet) => {
    numpkts++
}

createBarChart()
livePacketStream(updateBarChart)

createPieChart()
livePacketStream(updatePieChart)

createlineChart()
startLine() // start the timer for line chart
livePacketStream(updatelineChart)
