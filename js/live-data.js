/*
Application implementing a dynamic table showing traffic intercepted entering and 
exiting the Watcher
*/

/*Selecting the corresponding div for the app*/
const appSegment = document.querySelector("#live")

/*App specific code -- all elements appended to the app segment*/
const tableDiv = document.createElement("div")
appSegment.appendChild(tableDiv)

let tableHeaders = ["Destination IP" ,"Source IP", "Protocol"] 
let tableSize = 0
let TABLE_MAX = 10
let numRows = 10

/*
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


/*
@pre Table appended to the DOM
@post packet added to the Table
@returns None
*/
const addPacket = (packet) => {
    const tableBody = document.querySelector('.liveTableBody')
    let tableRow = document.createElement('tr')
    tableRow.id = 'tableBodyRow'


    if(tableBody.childElementCount  < TABLE_MAX){ //max number of rows
        //create new table entry
        let sourceIp = document.createElement('td')
        sourceIp.class = 
        sourceIp.innerText = packet.srcIp

        let dstIp = document.createElement('td')
        dstIp.innerText = packet.dstIp

        let protocol = document.createElement('td')
        protocol.innerText = packet.prot

        tableRow.append(sourceIp, dstIp, protocol)
        tableBody.append(tableRow)
        tableSize++
    }
    else{
        replacePacket(packet)
    }
}

const replacePacket = (packet) => {
    //search table for packet with matching source or dst ip
    let children = document.querySelector('.liveTableBody').children
    console.log(children)
    for (let i = 1; i < children.length; i++) {
        let fields = children[i].children;
        for(let j=0; j<2; j++){
            if(fields[j].innerText == packet.srcIp || fields[j].innerText == packet.dstIp)
            {
                //replace packet row
            }
        }
        
        // if( == packet.srcIp
        //     || packetRow.firstChild..innerText == packet.srcIp)
        // console.log(packetRow)
    }
}
createTable()

/*register app's packet function with the packetStream*/
packetStream(addPacket)
