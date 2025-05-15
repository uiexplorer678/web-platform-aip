class PopoverComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      const style = document.createElement("style");
      style.textContent = `
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .popover {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        ::slotted([slot="footer"]) {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        @media (max-width: 878px) {
          .overlay {
            width:100%;
            height:100%;
          }
        }
      `;
  
      this.overlay = document.createElement("div");
      this.overlay.classList.add("overlay");
  
      const popover = document.createElement("div");
      popover.classList.add("popover");
  
      const bodySlot = document.createElement("slot");
      bodySlot.name = "body";
  
      const footerSlot = document.createElement("slot");
      footerSlot.name = "footer";
  
      popover.appendChild(bodySlot);
      popover.appendChild(footerSlot);
      this.overlay.appendChild(popover);
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(this.overlay);
    }
  
    connectedCallback() {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) this.close();
      });
  
      this.shadowRoot.addEventListener("click", (e) => {
        if (e.target.classList.contains("save-btn")) {
          this.dispatchEvent(new Event("save"));
          this.close();
        } else if (e.target.classList.contains("cancel-btn")) {
          this.dispatchEvent(new Event("cancel"));
          this.close();
        }
      });
  
      this._escHandler = (e) => {
        if (e.key === "Escape") this.close();
      };
      document.addEventListener("keydown", this._escHandler);
    }
  
    disconnectedCallback() {
      document.removeEventListener("keydown", this._escHandler);
    }
  
    open() {
      this.overlay.style.display = "flex";
    }
  
    close() {
      this.overlay.style.display = "none";
    }
  }
  
  customElements.define("popover-component", PopoverComponent);
  