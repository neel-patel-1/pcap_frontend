
outside_subNets_8 = []
common_subNets_8 = []
function samplePacket(){
    this.srcIp = outside_subNets_8[(Math.random() * subNets_8.size())]+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
    this.dstIp = common_subNets_8[(Math.random() * common_subNets_8.size())]+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
}