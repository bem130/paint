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
        }
        if (pointer=="x") { // ctrl+x
            cnv_history_trash.push(cnv_history.pop());
            ctx.putImageData(cnv_history[cnv_history.length-1],0,0);
            continue;
        }
        drawpath(pointer,penType);
        yield;
    }
    endpath();
}
var playbackId;
async function playbackFile(path,clear=true) {
    playbackId = Math.floor(Math.random()*100000);
    if (clear) {init();}
    let res = await fetch("./pointerTrajectory/"+path,{cache:"reload"});
    let text = await res.text();
    let gen = startEmu(text);
    let loop = (g,pbid)=>{
        if (pbid!=playbackId) {
            return;
        }
        let res = g.next();
        if (!res.done) {
            setTimeout(loop,0,g,pbid);
        }
        else {
            console.log("done")
        }
    }
    for (let i=0;i<5;i++) {
        loop(gen,playbackId);
    }
}