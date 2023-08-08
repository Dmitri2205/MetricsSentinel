const runtime = chrome.runtime;

class Sentinel {
        constructor(runtime){
            this.runtime = runtime;
            this.switch = undefined;
            this.initExtension = this.initExtension.bind(this);
            this.getComponent = this.getComponent.bind(this);
            // this.requestCallback = this.requestCallback.bind(this);
            this.state;
        }

        
        
        async initExtension(){
            this.state = await localStorage.getItem("sentinel_state");
            this.runtime.onMessage.addListener((msg)=>this.#receiveBackgroundMessage(msg));
            document.body.querySelector(".guard_status").appendChild(document.createElement("custom-switch"));
            this.switch = document.getElementsByTagName("custom-switch")[0];
            
            this.switch.setAttribute("state",this.state);
            this.runtime.sendMessage(this.state);
            
            this.switch.addEventListener("click",(e) => {
                const newState = this.state === "is_not_active" ? "is_active" : "is_not_active";
                this.state = newState;
                this.switch.setAttribute("state", this.state);
                localStorage.setItem("sentinel_state",this.state);
                this.runtime.sendMessage({state:this.state});
            });
        };
        
        #receiveBackgroundMessage(reqData){
            console.log("MSG FROM POPUP:",reqData)
            this.#addToList(reqData);
        }
        
        #addToList(reqData){
            const stopList = ["tabId","frameId","frameType","parentFrameId","requestId","documentLifecycle"];
            let list = document.querySelector("#requests_list");
            console.log(list);
            const listItem = document.createElement("li");
            for(let pair of Object.entries(reqData)){
                let [pairKey,pairValue] = pair;
                if(!stopList.includes(pairKey)){
                    if(pairKey === "timeStamp") pairValue = new Date(pairValue);
                    const span = document.createElement("span");
                    span.innerText = `${pairKey}: ${pairValue}`;
                    listItem.appendChild(span);
                }
            };
            list.appendChild(listItem);
            // list.scrollTop = list.scrollHeight;
        }

        
        async getComponent(path,elId = null){
            const response = await fetch(path);
            const rawHtml = response.text();
            return rawHtml.then((result) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(result, "text/html");
                if(elId){
                    var template = doc.head.querySelector('template');
                    return template;
                }
                return result;
            });
        }
        
        _onPropertyChanged(property){
            console.log("Property changed",property)
        }
    }

    window.$MetricsSentinel = new Sentinel(runtime);
    window.$MetricsSentinel.initExtension();
    window.onbeforeunload = runtime.onMessage.removeListener((msg)=> Sentinel.receiveBackgroundMessage(msg));