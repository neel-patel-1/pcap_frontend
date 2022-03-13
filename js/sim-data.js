
const common_subNets_8 = ["192.168", "10.0"]
const prots = ["FTP", "TELNET", "SMTP", "DNS", "DHCP", "HTTP"]

/*starter IPs*/
let dsts = Array.apply(null, Array(5)).map(function () {
    return (common_subNets_8[Math.floor((Math.random() * common_subNets_8.length))] + "."
        +(Math.floor(Math.random() * 255))+"."
        +(Math.floor(Math.random() * 255)))
})
let srcs = Array.apply(null, Array(5)).map(function () {
    return (Math.floor(Math.random() * 255))+"."
        +(Math.floor(Math.random() * 255))+"."
        +(Math.floor(Math.random() * 255))+"."
        +(Math.floor(Math.random() * 255))
})



let lID = 0 // last seen packet
let callbacks = []


/*-------------------Sim Functions---------------------*/



const querySimServer = () =>{
    intervalID = setInterval(
        () => {
            if(USELIVE) // check if user toggled live data
                clearInterval(intervalID)
            fetch("http://localhost:5000/PacketStats",{
                method: "GET",
                headers: {
                    'Content-Type':'1',
                },
            })
            .then(response => response.json())
            .then(result => {                
                if(result["id"] > lID){
                    if(Object.keys(result).find( (l) => l == "packetList"))
                        callbacks.map( (callback) => result["packetList"].map( (pkt) => callback(pkt["packet"])))
                }
            })
            .catch(error => {
                console.error('Error:', error)
                return;
            })
        },
    INTERVAL)
}


/*-------------------Server Fetch Functions---------------------*/


/**
 * @post all registered callbacks executed with packet argument from server query every INTERVAL
 * milliseconds
 */
const queryServer = () =>{
    intervalID = setInterval(
        () => {
            if(!USELIVE) // check if user untoggled live data
                clearInterval(intervalID)
            fetch("http://localhost:5000/PacketStats", {method: "GET"})
            .then(response => response.json())
            .then(result => {
                if(result["id"] > lID){//ensure packet is new
                    callbacks.map( (callback) => 
                    {
                        result["packetList"].map( (pkt) => {
                            callback(pkt["packet"])})
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error)
            })
            
        },
    INTERVAL)
}

/**
 * 
 * @param {*} callback Function to register -- called upon every server query for new packets
 * @pre None
 * @post function will be called on server query with packet argument
 */

const livePacketStream = (callback) => {
    callbacks.push(callback) // register to set of functions needed to be called
    
}

const testQuery = (needsCtr) =>{
    setInterval(
        () => {
            fetch("http://localhost:5000/PacketStats",{
                method: "GET",
                headers: {
                    'Content-Type':'1',
                },
            })
            .then(response => response.json())
            .then(result => {
                if(needsCtr){
                    console.log(result["id"])
                    result["packetList"].map((pkt) => console.log(pkt["packet"]))
                }
                console.log(result)
            })
            .catch(error => {
                console.error('Error:', error)
                return;
            })
        },
    INTERVAL)
}
// queryServer();
querySimServer()