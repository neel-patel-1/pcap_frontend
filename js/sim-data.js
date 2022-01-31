
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

const REPEAT_CHANCE = 0.5

/*
@pre None
@post None
@return Sample Source IP
*/
let getSrcIp = () => {
    if(Math.random() > REPEAT_CHANCE){
        return (Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)) +"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    }else{
        return srcs[Math.floor((Math.random() * srcs.length))]
    } 
}

/*
@pre None
@post None
@return Sample Destination IP
*/
let getDstIp = () => {
    if(Math.random() > REPEAT_CHANCE){
        return common_subNets_8[Math.floor((Math.random() * common_subNets_8.length))] +"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    }else{
        return dsts[Math.floor((Math.random() * srcs.length))]
    } 
}

/*
@pre None
@post None
@return Sample Packet with src IP, dst IP, and protocol
*/
function SamplePacket(){
    let packet = {
        srcIp: getSrcIp(),              
        dstIp: getDstIp(),
        prot:  prots[Math.floor(Math.random()*prots.length)]
    }
    srcs.push(packet.srcIp)
    srcs.shift()
    dsts.push(packet.dstIp)
    dsts.shift()
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
