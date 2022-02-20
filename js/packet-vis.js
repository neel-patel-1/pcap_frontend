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
ctx.textAlign = "center"

visDiv.append(canvas)

const drawLayer = (x, width, text) => {
    let ly = canvas.height/5
    let height = (canvas.height * (3/5))
    
    ctx.strokeRect(x, ly, width, height)
    height = (canvas.height * (3/5) - ctx.lineWidth * 2)
    let txts = text.split(",")
    let buff = ctx.lineWidth

    let fontSize = 12
    ctx.font = `${fontSize}px san-serif`;
    ctx.fillStyle = 'green';

    txts.map( (txt, i) => {
        console.log(txt)
        ctx.fillText(txt, x + width/2, ly + buff + (i+1) * ( (height - ctx.lineWidth *2)/txts.length) )
    })
}


const drawPacket = ( packet ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pad = canvas.width / 10
    lWid =(canvas.width - (2 * pad)) / Object.keys(packet).length
    Object.keys(packet).map(layer => drawLayer( pad + (parseInt(layer) - 2)  * lWid, lWid, packet[layer]))
    
}

livePacketStream(drawPacket);

// window.addEventListener('resize', onWindowResize, false);
// function onWindowResize(){
//     drawLayer()
// }

