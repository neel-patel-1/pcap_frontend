/*
Application implementing a dynamic table showing traffic intercepted entering and 
exiting the Watcher
*/

/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#live")

/*App specific code -- all elements appended to the app segment*/
const tableDiv = document.createElement("div")
appSegment.appendChild(tableDiv)

let tableHeaders = ["Destination IP" ,"Port", "Source IP",  "Port", "Type"]
let tableSize = 0
let TABLE_MAX = 20

/**
@pre None
@post Table added to the app div
@returns None
*/
const createTable = () => {
    while(tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild)
    let theTable = document.createElement("table")
    theTable.className = "liveTable"
    let tableHead = document.createElement('thead')
    tableHead.className = "liveTableHead"
    let tableHeaderRow = document.createElement('tr')
    tableHeaderRow.className = 'liveTableHeaderRow'
    tableHeaders.forEach(header => {
        let tableHeadCol = document.createElement('th')
        tableHeadCol.innerText = header
        tableHeaderRow.append(tableHeadCol)
    })
    tableHead.append(tableHeaderRow)
    theTable.append(tableHead)
    let tableBody = document.createElement('tbody')
    tableBody.className = 'liveTableBody'
    theTable.append(tableBody)
    tableDiv.append(theTable)
}

/**
@pre Table appended to the DOM
@post packet added to the Table
@returns None
*/
const addPacket = (packet) => {
    const tableBody = document.querySelector('.liveTableBody')
    let tableRow = document.createElement('tr')
    tableRow.id = 'tableBodyRow'
    
    if(Object.keys(packet).find( (l) => l == 4)){
        //replace comma in tcp type
        let TCPInf = packet[4].replace(/\[([A-Z]+), ([A-Z]+)\]/, '[$1 $2]').split(", ")
        // console.log(TCPInf)
        if (TCPInf[0].split(" ")[0] == "TCP" && TCPInf.length > 3){
            
            let srcP = TCPInf[2].split(": ")[1]
            let dstP = TCPInf[3].split(": ")[1]
            let t = TCPInf[1]

            //parse network layer info
            let netInf = packet[3].split(", ")
            let srcIp = netInf[1].split(": ")[1]
            let dstIp = netInf[2].split(": ")[1]
            if(!replacePacket(TCPInf, srcIp, dstIp) && tableBody.childElementCount  < TABLE_MAX ){

                let sourceIp = document.createElement('td') 
                sourceIp.innerText = srcIp
                
                let sourcePort = document.createElement('td') 
                if(srcP)
                    sourcePort.innerText = srcP
                else
                    sourcePort.innerText = "Unknown"

                let destIp = document.createElement('td')
                destIp.innerText = dstIp
                
                let dstPort = document.createElement('td') 
                if(dstP)
                    dstPort.innerText = dstP
                else
                    dstPort.innerText = "Unknown"

                let type = document.createElement('td')
                type.innerText = t
                    
                tableRow.append(destIp, dstPort, sourceIp, sourcePort, type)
                tableBody.append(tableRow)
                tableSize++
            }
            if(tableBody.childElementCount >= TABLE_MAX){
                tableBody.firstChild.id = 'remQueue'
                $('#remQueue').children('td, th')
                    .animate({ padding: 0 })
                    .wrapInner('<div />')
                    .children()
                    .slideUp(function() { $(this).closest('tr').remove(); });
            }
        }
    }
}

/**
@param packet candidate packet for replacing table entry
@post packet added to the Table
@return true if packet replaces table entry
*/
const replacePacket = (TCPInf, srcIp, dstIp) => {
    //search table for packet with matching source or dst ip
    let children = document.querySelector('.liveTableBody').children
    let fields; //row we are selecting

    //Parse Packet
    let srcP = TCPInf[2].split(":")[1]
    let dstP = TCPInf[2].split(":")[1]
    let t = TCPInf[1]
 
    for (let i = 0; i < children.length; i++) {
        fields = children[i].children;//check each row
        
        for(let j=0; j<2; j++){
            if(fields[j].innerText == srcIp || fields[j].innerText == dstIp)
            {//row replaced by newer connection
                Array.from(fields).map( (f) => {
                    f.className = "changeColor"
                    setTimeout( () => {
                        f.className = ""
                    }, 250)
                })
                // console.log("replace row ", i, " ip: ", fields[j].innerText)
                fields[2].innerText = srcIp
                fields[1].innerText = srcP
                fields[3].innerText = dstP
                fields[0].innerText = dstIp
                // console.log("replaced packet")
                return true
            }
        }
    }
    
    return false
}

createTable()

/*register app's packet function with the packetStream*/
livePacketStream(addPacket)
