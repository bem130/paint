function* startEmu(data) {
    let penType = (()=>{
        if (document.querySelector("#Eraser").dataset.stat=="on") {
            return "eraser"
        }
        return document.querySelector("#PenType").dataset.value;
    })();
    for (let pointer of JSON.parse(data)) {
        if (pointer.speed==null) {
            endpath();
            yield;
        }
        if (pointer=="x") { // ctrl+x
            cnv_history_trash.push(cnv_history.pop());
            ctx.putImageData(cnv_history[cnv_history.length-1],0,0);
            continue;
        }
        drawpath(pointer,penType);
    }
    endpath();
}
async function playbackFile(path) {
    init();
    let res = await fetch("./pointerTrajectory/"+path,{cache:"reload"});
    let text = await res.text();
    let gen = startEmu(text);
    let loop = (g)=>{
        let res = g.next();
        if (!res.done) {
            setTimeout(loop,0,g);
        }
        else {
            console.log("done")
        }
    }
    loop(gen);
}