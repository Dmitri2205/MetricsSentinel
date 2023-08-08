const runtime = chrome.runtime;

class Sentinel {
        constructor(runtime){
            this.runtime = runtime;
            this.switch = undefined;
            this.initExtension = this.initExtension.bind(this);
            this.getComponent = this.getComponent.bind(this);
            // this.requestCallback = this.requestCallback.bind(this);
            this.state = localStorage.getItem("sentinel_state");
            this.receiveBackgroundMessage = this.receiveBackgroundMessage.bind(this);
        }

        
        
        async initExtension(){
            document.body.querySelector(".guard_status").appendChild(document.createElement("custom-switch"));
            this.switch = document.getElementsByTagName("custom-switch")[0];
            // const switchThumb = this.switch.shadow.childNodes[3];
            
            this.switch.setAttribute("state",this.state);
            // switchThumb.setAttribute("state",this.state);
            this.runtime.sendMessage(this.state);
            
            this.switch.addEventListener("click",(e) => {
                const newState = this.state === "is_not_active" ? "is_active" : "is_not_active";
                this.state = newState;
                this.switch.setAttribute("state", this.state);
                // switchThumb.setAttribute("state", this.state);
                localStorage.setItem("sentinel_state",this.state);
                this.runtime.sendMessage({
                    state:this.state,
                });
            });
        };
        
        receiveBackgroundMessage(msg){
            console.log("MSG FROM POPUP:",msg)
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