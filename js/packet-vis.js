/*Selecting the corresponding div for the app*/
let appSegment = document.querySelector("#packet-vis")

/*App specific code -- all elements appended to the app segment*/
const visDiv = document.createElement("div")
appSegment.appendChild(visDiv)

//
let canvas = document.createElement("canvas")
const ctx = canvas.getContext('2d')
visDiv.append(canvas)
ctx.lineWidth = 10

// Wall
ctx.strokeRect(75, 140, 150, 110)

// Door
ctx.fillRect(130, 190, 40, 60)

// Roof
ctx.beginPath()
ctx.moveTo(50, 140)
ctx.lineTo(150, 60)
ctx.lineTo(250, 140)
ctx.closePath()
ctx.stroke()

