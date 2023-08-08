class Switch extends HTMLElement {
  
  constructor() {
    super();
    this.shadow = this.attachShadow({mode:'open'});
    this.TEMPLATE_HTML = '';
    this.switchEl = undefined;
    // элемент создан
  };
  
  linkClick(event){
    // event.preventDefault();
    alert(event.target.href);
  }
  
  async connectedCallback() {
    const template = await window?.$MetricsSentinel?.getComponent("components/switch/index.html","switch-template");
    let clone = template.content.cloneNode(true)
    this.shadow.appendChild(clone);
    this.switchEl = this.shadow.querySelector("#switch");
    const state = this.getAttribute("state");
    if(state === "is_active"){
      this.switchEl.classList.add("is_active");
    }
  }
  
  disconnectedCallback() {
    clearTimeout(this.timer);
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }
  
  static get observedAttributes() {
    return ["state"];
  }
  
  attributeChangedCallback(property, oldValue, newValue) {
    console.log(property,oldValue,newValue); 
      newValue ===  "is_active" ? 
      this.switchEl?.classList.add("is_active") :
      this.switchEl?.classList.remove("is_active") ;
}
    
    adoptedCallback() {
      // вызывается, когда элемент перемещается в новый документ
      // (происходит в document.adoptNode, используется очень редко)
    }

   
  };

customElements.define("custom-switch", Switch);