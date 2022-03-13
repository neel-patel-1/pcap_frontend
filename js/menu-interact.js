/*Menu buttons will hide all divs except users choice */
/*We are just swapping the app displayed within the appSpace div*/

/*
    @param None
    @post event listeners added to all menu buttons toggling
    the app displayed in the app div
    @return None
*/
function menuInit(){
    const appSpace = document.querySelector('#app')
    const menu = document.querySelector('#menu-options')

    for (let i = 0; i < menu.children.length; i++) {
        if(menu.children[i].firstElementChild.id != "toggle" && 
            menu.children[i].firstElementChild.id != "range"){
            menu.children[i].addEventListener('click', () =>{
                let showappName = menu.children[i].firstElementChild.id.slice(7)
                // console.log('show: ', showappName)
                document.querySelector('#' + showappName).hidden = false
                for (let j = 0; j < menu.children.length; j++){
                    if(menu.children[j].firstElementChild.id != menu.children[i].firstElementChild.id
                        && menu.children[j].firstElementChild.id != "toggle"
                        && menu.children[i].firstElementChild.id != "range"){
                        let hideappName = menu.children[j].firstElementChild.id.slice(7)
                        document.querySelector('#' + hideappName).hidden = true
                    }
                }
            })
        }
    
    }
}

document.querySelector("#clktoggle").addEventListener('change', () =>{
    USELIVE=!USELIVE
    if(!USELIVE){
        clearInterval(intervalID)
        querySimServer()
    }else{
        clearInterval(intervalID)
        queryServer()
    }
})
document.querySelector("#myRange").addEventListener('input', (e) => {
    INTERVAL = (5000 - e.target.value)
    if(!USELIVE){
        clearInterval(intervalID)
        querySimServer()
    }
})
menuInit();