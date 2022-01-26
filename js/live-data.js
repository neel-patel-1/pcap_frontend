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
    scoreboardTable.append(scoreboardTableHead)
    let tableBody = document.createElement('tbody')
    theTable.append(tableBody)
    tableDiv.append(theTable)
}