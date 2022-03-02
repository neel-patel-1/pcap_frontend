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

//color map
let protColor = new Map()
//safety packet in case of redraw
let lpack = null

visDiv.append(canvas)

const drawLayer = (x, width, text) => {
    let ly = canvas.height/5
    let height = (canvas.height * (3/5))
    
    ctx.strokeRect(x, ly, width, height)
    let txts = text.split(",")
    let buff = ctx.lineWidth

    let fontSize = 24
    ctx.font = `${fontSize}px system-ui bold`
    

    // console.log(text.split(" ")[0])
    if(!protColor.has(text.split(" ")[0])){
        protColor.set(text.split(" ")[0], generateDarkColorHex())
    }
    ctx.fillStyle = protColor.get(text.split(" ")[0])
    
    ctx.fillRect(x+ctx.lineWidth/2, ly + ctx.lineWidth/2, width - ctx.lineWidth, height- ctx.lineWidth)

    txts.map( (txt, i) => {
        ctx.fillStyle = 'white';
        ctx.fillText(txt, x + width/2, ly + buff + (i+1) * ( (height - ctx.lineWidth *4)/txts.length), width )
    })
}


const drawPacket = ( packet ) => {
    //save packet in case of redraw
    lpack = packet
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pad = canvas.width / 10
    lWid =(canvas.width - (2 * pad)) / Object.keys(packet).length
    Object.keys(packet).map( (layer,i) => drawLayer( pad + /*(parseInt(layer) - 2)*/ i  * lWid, lWid, packet[layer]))
    
}

function onWindowResize(){
    canvas.setAttribute('width', String(window.innerWidth * (4/5)))
    canvas.setAttribute('height', String(window.innerHeight * (2/5)))
    ctx.lineWidth = 10
    ctx.textAlign = "center"
    if(lpack != null)
        drawPacket(lpack)
}



livePacketStream(drawPacket);

window.addEventListener('resize', onWindowResize, false);


