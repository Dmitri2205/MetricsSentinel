(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "<all_urls>"
        ]
    };
   
    function handleBackgroundMessage(arg){
        const requestsHandler = (details) => {
            const { tabId, requestId } = details;
                if (!tabStorage.hasOwnProperty(tabId)) {
                    return;
                }
                
                tabStorage[tabId].requests[requestId] = {
                    requestId: requestId,
                    url: details.url,
                    startTime: details.timeStamp,
                    status: 'pending'
                };
                console.log(tabStorage[tabId].requests[requestId]);
        };

        if(arg === "is_active"){
            chrome.webRequest.onBeforeRequest.addListener(((details) =>requestsHandler(details)), networkFilters);
        }else{
            chrome.webRequest.onBeforeRequest.removeListener(requestsHandler);
        }
  
    };

    chrome.runtime.onConnect.addListener((port)=>{
        port.onMessage.addListener((arg)=>handleBackgroundMessage(arg));
    });

}());