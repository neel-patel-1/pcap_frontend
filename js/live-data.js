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
const addPacket = (src, dst, prot, numRows) => {
    if(tableSize < numRows){
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
        tableSize++
    }
}

createTable();

// while(1)
// {
for (let i=0; i<1000; i++){
    let packet = SamplePacket()
    setTimeout(()=> addPacket(packet.srcIp, packet.dstIp, packet.prot, 10), i*1000)
}
    
// }