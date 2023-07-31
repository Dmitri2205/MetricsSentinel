class Sentinel {
        constructor(){
            this.switch = undefined;
            this.initExtension = this.initExtension.bind(this);
            this.getComponent = this.getComponent.bind(this);
            // this.requestCallback = this.requestCallback.bind(this);
            this.state = localStorage.getItem("sentinel_state");
            this.connection = chrome.runtime.connect({name:"SentinelPort"});
            this.receiveBackgroundMessage = this.receiveBackgroundMessage.bind(this);
        }

        
        
        initExtension(){
            this.switch = document.getElementsByTagName("custom-switch")[0];
            const switchThumb = this.switch.shadow.childNodes[3];
            
            this.switch.setAttribute("state",this.state);
            switchThumb.setAttribute("state",this.state); 
            
            this.switch.addEventListener("click",(e) => {
                const newState = this.state === "is_not_active" ? "is_active" : "is_not_active";
                this.state = newState;
                this.switch.setAttribute("state", this.state);
                switchThumb.setAttribute("state", this.state);
                localStorage.setItem("sentinel_state",this.state);
                this.connection.postMessage({msg:"HI"});
            });
        };
        
        receiveBackgroundMessage(arg){
            console.log(arg)
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

    window.$MetricsSentinel = new Sentinel();