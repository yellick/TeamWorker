function hide_preloader() {
    //console.log("hide_preloader +")
    
    let prel = $("#preloader");

    prel.css("opacity", "0");

    setTimeout(
        () => {
            prel.css("display", "none");
        },
        300
    );
}

function show_preloader() {
    let prel = $("#preloader");
    
    prel.css("display", "flex");
    prel.css("background", "rgba(0, 0, 0, 0.2)");
    prel.css("transition", "0.3s");
    prel.css("opacity", "1");
}