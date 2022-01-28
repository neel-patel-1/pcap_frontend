
common_subNets_8 = ["192.168", "10.0"]
prots = ["FTP", "TELNET", "SMTP", "DNS", "DHCP", "HTTP"]

/*
@pre None
@post None
@return Sample Packet with src IP, dst IP, and protocol
*/
function SamplePacket(){
    let packet = {
        srcIp: (Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)) +"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
        dstIp: common_subNets_8[Math.floor((Math.random() * common_subNets_8.length))]+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
        prot:  prots[Math.floor(Math.random()*prots.length)]
    }
    return packet
}

/*
@pre None
@param packetResponder is a function taking a packet object as an argument
@post packetResponder is called upon arrival of a packet
@return none
*/
function packetStream(packetResponder){
    let genPacket = new Promise( (resolve, reject) =>{
        setTimeout( () => {resolve(SamplePacket())}, Math.random()*2000 + 250 )
    })
    genPacket.then( (packet) => {packetResponder(packet); packetStream(packetResponder)} )
}

// function packResponse(packet){console.log(packet)}
// packetStream(packResponse)
