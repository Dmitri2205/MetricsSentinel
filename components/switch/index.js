class Switch extends HTMLElement {
  
  constructor() {
    super();
    this.shadow = this.attachShadow({mode:'closed'});
    this.TEMPLATE_HTML = '';
    this.setAttribute('state',window.$MetricsSentinel.state);
    // элемент создан
  };
  
  linkClick(event){
    // event.preventDefault();
    alert(event.target.href);
  }
  
  async connectedCallback() {
    const template = await window.$MetricsSentinel.getComponent("/components/switch/index.html","switch-template");
    let clone = template.content.cloneNode(true)
    this.shadow.appendChild(clone);
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
    if(oldValue === newValue){
         this[property] = newValue;
    }
}
    
    adoptedCallback() {
      // вызывается, когда элемент перемещается в новый документ
      // (происходит в document.adoptNode, используется очень редко)
    }

   
  };

customElements.define("custom-switch", Switch);