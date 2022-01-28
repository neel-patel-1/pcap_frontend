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
const TABLE_MAX = 10
let numRows = 10

/*
@pre None
@post Table added to the app div
@returns None
*/
const createTable = () => {
    while(tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild)
    let theTable = document.createElement("table")
    theTable.id = "liveTable"
    let tableHead = document.createElement('thead')
    tableHead.id = "liveTableHead"
    let tableHeaderRow = document.createElement('tr')
    tableHeaderRow.id = 'liveTableHeaderRow'
    tableHeaders.forEach(header => {
        let tableHeadCol = document.createElement('th')
        tableHeadCol.innerText = header
        tableHeaderRow.append(tableHeadCol)
    })
    tableHead.append(tableHeaderRow)
    theTable.append(tableHead)
    let tableBody = document.createElement('tbody')
    theTable.append(tableBody)
    tableDiv.append(theTable)
}


/*
@pre Table appended to the DOM
@post packet added to the Table
@returns None
*/
const addPacket = (packet) => {
    const table = document.querySelector('#liveTable')
    let tableRow = document.createElement('tr')
    tableRow.id = 'tableBodyRow'

    let sourceIp = document.createElement('td')
    sourceIp.innerText = packet.srcIp

    let dstIp = document.createElement('td')
    dstIp.innerText = packet.dstIp

    let protocol = document.createElement('td')
    protocol.innerText = packet.prot

    tableRow.append(sourceIp, dstIp, protocol)
    table.append(tableRow)
    tableSize++
}
createTable()

/*register app's packet function with the packetStream*/
packetStream(addPacket)
