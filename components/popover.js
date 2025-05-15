class PopoverComponent extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .modal-popover-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .modal-popover-container {
        padding: 50px;
        background: white;
        box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 35px;
        width: 90%;
        max-width: 500px;
      }

      .modal-popover-header {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 18px;
      }

      .modal-popover-title {
        color: #111928;
        font-size: 24px;
        font-family: Inter, sans-serif;
        font-weight: 600;
        line-height: 30px;
        word-wrap: break-word;
      }

      .modal-popover-underline {
        width: 90px;
        height: 3px;
        background: #3758F9;
        border-radius: 2px;
      }

      .modal-popover-body-slot {
        align-self: stretch;
        height: 271px;
        padding: 16px 24px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 300px;
      }

      ::slotted([slot="footer"]) {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      @media (max-width: 1024px) {
        .modal-popover-overlay {
          width:100%;
          height:100%
        }
      }
    `;

    this.overlay = document.createElement("div");
    this.overlay.classList.add("modal-popover-overlay");

    this.container = document.createElement("div");
    this.container.classList.add("modal-popover-container");

    this.header = document.createElement("div");
    this.header.classList.add("modal-popover-header");

    this.titleElem = document.createElement("div");
    this.titleElem.classList.add("modal-popover-title");
    // default title if not set as attribute:
    this.titleElem.textContent = this.getAttribute('title') || "Ticket Details";

    this.underline = document.createElement("div");
    this.underline.classList.add("modal-popover-underline");

    this.header.appendChild(this.titleElem);
    this.header.appendChild(this.underline);

    this.bodyWrapper = document.createElement("div");
    this.bodyWrapper.classList.add("modal-popover-body-slot");

    const bodySlot = document.createElement("slot");
    bodySlot.name = "body";

    this.bodyWrapper.appendChild(bodySlot);

    this.footerSlot = document.createElement("slot");
    this.footerSlot.name = "footer";

    this.container.appendChild(this.header);
    this.container.appendChild(this.bodyWrapper);
    this.container.appendChild(this.footerSlot);

    this.overlay.appendChild(this.container);
    this.shadowRoot.append(style, this.overlay);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'title' && this.titleElem) {
      this.titleElem.textContent = newVal || "Ticket Details";
    }
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
