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

const addPacket = (src, dst, prot, row) => {
    const table = document.querySelector('#liveTable')
    let tableRow = document.createElement('tr')
    tableRow.id = 'tableBodyRow'

    let sourceIp = document.createElement('td')
    sourceIp.innerText = src

    let dstIp = document.createElement('td')
    dstIp.innerText = dst

    let protocol = document.createElement('td')
    protocol.innerText = prot

    tableRow.append(dstIp, sourceIp, protocol)
    table.append(tableRow)
}

createTable();
addPacket("127.0.0.1", "192.168.1.1", "TCP", 1)