function main(){
    //console.log("main +")
    hide_preloader()
    
    $("#u_profile").on("click", () => { show_u_modal() })
    $("#fill").on("click", () => { show_u_modal() })
}

function hide_preloader() {
    //console.log("hide_preloader +")
    
    let prel = $("#preloader");

    prel.css("opacity", "0");

    setTimeout(
        () => {
            prel.remove();
        },
        300
    );
}

function show_u_modal() {
    let modal = $("#u_profile_modal");
    let fill = $("#fill");
    
    if ( !(modal.hasClass("u_profile_modal--active")) ) {
        
        fill.css("display","block");
        
        modal.css("display","flex");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
    } else {
        
        fill.css("display","none");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
        modal.css("display","none");
        
    };
    
    
}

$(document).ready(main());