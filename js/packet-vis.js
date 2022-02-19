/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#packet")

/*App specific code -- all elements appended to the app segment*/
const visDiv = document.createElement("div")
visDiv.id = "packDiv"
visDiv.setAttribute('position', 'relative')
appSegment.appendChild(visDiv)

// create canvas
let canvas = document.createElement("canvas")
canvas.id = "packCanv"
canvas.setAttribute('width', String(window.innerWidth * (4/5)))
canvas.setAttribute('height', String(window.innerHeight * (2/5)))
const ctx = canvas.getContext('2d')
ctx.lineWidth = 10

visDiv.append(canvas)

const drawLayer = (x, width, text) => {
    let ly = canvas.height/5
    let height = canvas.height/5
    ctx.strokeRect(x, ly, width, canvas.height * (3/5))
    ctx.fillText(text, x + width/2, canvas.height/2, width)
}


const drawPacket = ( packet ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pad = canvas.width / 10
    lWid =(canvas.width - (2 * pad)) / Object.keys(packet).length
    Object.keys(packet).map(layer => drawLayer( pad + (parseInt(layer) - 2)  * lWid, lWid, packet[layer]))
    
}

// drawPacket({2:"l2", 3: "l3", 4:""})
livePacketStream(drawPacket);

// Wall
// ctx.strokeRect(75, 140, 150, 110)


// // Door
// ctx.fillRect(130, 190, 40, 60)

// // Roof
// ctx.beginPath()
// ctx.moveTo(50, 140)
// ctx.lineTo(150, 60)
// ctx.lineTo(250, 140)
// ctx.closePath()
// ctx.stroke()

window.addEventListener('resize', onWindowResize, false);
function onWindowResize(){
    drawLayer()
}

