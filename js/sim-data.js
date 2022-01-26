
common_subNets_8 = ["192.168", "10.0"]
prots = ["FTP", "TELNET", "SMTP", "DNS", "DHCP", "HTTP"]
function SamplePacket(){
    let packet = {
        srcIp: (Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)) +"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
        dstIp: common_subNets_8[Math.floor((Math.random() * common_subNets_8.length))]+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)),
        prot:  prots[Math.floor(Math.random()*prots.length)]
    }
    return packet
}
