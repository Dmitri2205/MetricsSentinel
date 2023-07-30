class Sentinel {
        constructor(){
            this.state = "is_not_active";
            this.startGuardButton = document.getElementById("start_guard_btn");
            this.initExtension = this.initExtension.bind(this);
            this.getComponent = this.getComponent.bind(this);
        }

        initExtension(){
            document.addEventListener("DOMContentLoaded",()=>{
                this.startGuardButton.addEventListener("click",(e) => {
                    const state = (this.state === "is_not_active" ? "is_active" : "is_not_active")    
                    this.state = state; 
                    e.target.setAttribute("state",state);
                });

            });
        };

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

        createElemProxy = (el) =>{
            return new Proxy();
        } 

}

window.$MetricsSentinel = new Sentinel();
window.$MetricsSentinel.initExtension();