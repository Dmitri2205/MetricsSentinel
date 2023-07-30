class Sentinel {
        constructor(){
            this.state = "is_not_active";
            this.switch = undefined;
            this.initExtension = this.initExtension.bind(this);
            this.getComponent = this.getComponent.bind(this);
            this.requestCallback = this.requestCallback.bind(this);
            this.runRequestsListener = this.runRequestsListener.bind(this);
        }

        initExtension(){
            this.switch = document.getElementsByTagName("custom-switch")[0].shadow.childNodes[3];
            this.switch.setAttribute("state", this.state); 
            this.switch.addEventListener("click",(e) => {
                const state = (this.state === "is_not_active" ? "is_active" : "is_not_active")    
                this.state = state;
                this.switch.setAttribute("state", this.state);
            });
        };

        setSentinelStatus(argument = null){
            console.log(argument);
        }

        runRequestsListener(){
            const filter = (a) =>  console.log(a);
            chrome.webRequest.onBeforeRequest.addListener(
                this.requestCallback,
                filter
            );
        }

        requestCallback(any){
            console.log("REQUEST CALLBACK:",any);
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
}

window.$MetricsSentinel = new Sentinel();