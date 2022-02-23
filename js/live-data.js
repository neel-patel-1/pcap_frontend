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
let TABLE_MAX = 3

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
    
    let sessCheck = ""
    if(Object.keys(packet).length > 5)
        sessCheck = packet[4].split(",")[0].split(" ")[0]
    if (!replacePacket(packet)){
        if(tableBody.childElementCount  < TABLE_MAX
                && sessCheck == "TCP"){
            //parse pack info
            let TCPInf = packet[4].split(",")
            let srcP = TCPInf[2].split(":")[1]
            let dstP = TCPInf[3].split(":")[1]
            let t = TCPInf[1]
            
            let netInf = packet[3].split(",")
            let srcIp = netInf[1].split(":")[1]
            let dstIp = netInf[2].split(":")[1]
            
            let sourceIp = document.createElement('td') 
            sourceIp.innerText = srcIp
            
            let sourcePort = document.createElement('td') 
            sourcePort.innerText = srcP

            let destIp = document.createElement('td')
            destIp.innerText = dstIp
            
            let dstPort = document.createElement('td') 
            dstPort.innerText = dstP

            let type = document.createElement('td')
            type.innerText = t

            tableRow.append(destIp, dstPort, sourceIp, sourcePort, type)
            tableBody.append(tableRow)
            tableSize++
        }
        if(tableBody.childElementCount > TABLE_MAX){
            
            tableBody.firstChild.id = 'remQueue'
            $('#remQueue').children('td, th')
                .animate({ padding: 0 })
                .wrapInner('<div />')
                .children()
                .slideUp(function() { $(this).closest('tr').remove(); });
        
        }
    }
}

/**
@param packet candidate packet for replacing table entry
@post packet added to the Table
@return true if packet replaces table entry
*/
const replacePacket = (packet) => {
    //search table for packet with matching source or dst ip
    let children = document.querySelector('.liveTableBody').children
    let fields; //row we are selecting

    //Parse Packet
    if(Object.keys(packet).length > 4){
        let TCPInf = packet[4].split(",")
        let srcP = TCPInf[2].split(":")[1]
        let dstP = TCPInf[2].split(":")[1]
        let t = TCPInf[1]
        
        let netInf = packet[3].split(",")
        let srcIp = netInf[1].split(":")[1]
        let dstIp = netInf[2].split(":")[1]


        for (let i = 1; i < children.length; i++) {
            fields = children[i].children;//check each row
            for(let j=0; j<2; j++){
                if(fields[j].innerText == srcIp || fields[j].innerText == dstIp)
                {//row replaced by newer connection
                    fields.id = 'moveUp'
                    // console.log("replace row ", i, " ip: ", fields[j].innerText)
                    fields[1].innerText = srcIp
                    fields[0].innerText = dstIp
                    return true
                }
            }
        }
    }
    return false
}

createTable()

/*register app's packet function with the packetStream*/
livePacketStream(addPacket)
