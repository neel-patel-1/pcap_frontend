/*
Application implementing a dynamic table showing traffic intercepted entering and 
exiting the Watcher
*/

/*Selecting the corresponding div for the app*/
appSegment = document.querySelector("#live")

/*App specific code -- all elements appended to the app segment*/
const tableDiv = document.createElement("div")
appSegment.appendChild(tableDiv)

let tableHeaders = ["Destination IP" ,"Source IP", "Protocol"] 
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


    if(tableBody.childElementCount  < TABLE_MAX){ //max number of rows
        //create new table entry
        let sourceIp = document.createElement('td')
        sourceIp.class = 
        sourceIp.innerText = packet.srcIp

        let dstIp = document.createElement('td')
        dstIp.innerText = packet.dstIp

        let protocol = document.createElement('td')
        protocol.innerText = packet.prot

        tableRow.append(dstIp, sourceIp, protocol)
        tableBody.append(tableRow)
        tableSize++
    }
    else{
        if (!replacePacket(packet)){
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
    for (let i = 1; i < children.length; i++) {
        fields = children[i].children;//check each row
        for(let j=0; j<2; j++){
            if(fields[j].innerText == packet.srcIp || fields[j].innerText == packet.dstIp)
            {//row replaced by newer connection
                fields.id = 'moveUp'
                // console.log("replace row ", i, " ip: ", fields[j].innerText)
                fields[1].innerText = packet.srcIp
                fields[0].innerText = packet.dstIp
                return true
            }
        }
    }
    return false
}


createTable()

/*register app's packet function with the packetStream*/
packetStream(addPacket)
