const urls = {urls:["<all_urls>"]};

chrome.runtime.onMessage.addListener((...args)=>{
    console.log(args[0]);
    const state = args[0];
    let timerID = null;

    const reqListener = (reqType,reqData) => {
            clearInterval(timerID);
            timerID = setTimeout(()=>{
                // console.log(`Req ${reqType} sended:initiator:${reqData.initiator}, url: ${reqData.url}, type:${reqData.type}`);
                chrome.runtime.sendMessage({...reqData,reqType});
            },500);
            
    };

    if(state === "is_active"){
        chrome.webRequest.onBeforeRequest.addListener((req)=>reqListener("reqOptions",req),urls);
        chrome.webRequest.onBeforeSendHeaders.addListener((req)=>reqListener("headers",req),urls);
    }else{
        chrome.webRequest.onBeforeRequest?.removeListener((req)=>reqListener("",req),urls);
        chrome.webRequest.onBeforeSendHeaders?.removeListener((req)=>reqListener("",req),urls); 
    };
})