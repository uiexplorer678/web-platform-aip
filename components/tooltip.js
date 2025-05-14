class CustomTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'position'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get tooltipText() {
    return this.getAttribute('text') || '';
  }

  get position() {
    return this.getAttribute('position') || 'bottom';
  }

  render() {
    const style = `
      :host {
        position: relative;
        display: inline-block;
      }

      .tooltip-box {
        position: absolute;
        width: 16rem;
        padding: 0.75rem 1.25rem 1.25rem;
        background-color: #e5e7eb;
        border-radius: 0.5rem;
        box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
        font-family: 'Roboto', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        color: #1F2A37;
        line-height: 1.375rem;
        text-align: center;
        z-index: 100;
        display: none;
      }

      .tooltip-arrow {
        position: absolute;
        width: 18px;
        height: 10px;
      }

      :host(:hover) .tooltip-box {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      .tooltip-box[data-position="top"] {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip-box[data-position="top"] .tooltip-arrow {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip-box[data-position="bottom"] {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip-box[data-position="bottom"] .tooltip-arrow {
        bottom: 85%;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
      }

      .tooltip-box[data-position="left"] {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip-box[data-position="left"] .tooltip-arrow {
        left: 100%;
        top: 50%;
        transform: translateY(-50%) rotate(90deg);
      }

      .tooltip-box[data-position="right"] {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip-box[data-position="right"] .tooltip-arrow {
        right: 100%;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
      }
    `;

    const arrowSVG = `
      <svg viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25671 0.825883C8.65395 0.384502 9.34605 0.384502 9.74329 0.825882L18 10L0 10L8.25671 0.825883Z" fill="#EBEBEB"/>
      </svg>
    `;

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <slot></slot>
      <div class="tooltip-box" data-position="${this.position}">
        ${this.tooltipText}
        <div class="tooltip-arrow">${arrowSVG}</div>
      </div>
    `;
  }
}

customElements.define('custom-tooltip', CustomTooltip);