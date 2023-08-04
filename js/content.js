export const runtime = chrome.runtime;
const tabs = chrome.tabs;
export const $MetricsSentinel = new Sentinel();
export const port = runtime.connect({name:"SentinelPort"});
port.onMessage.addListener(handleMessage)

function handleMessage(msg){
    tabs.query({active:true}).then((tabs)=>{
        console.log(tabs[0].id.msg);
    });
}


