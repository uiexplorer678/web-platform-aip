class CustomTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'position'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.styleEl = document.createElement('style');
    this.styleEl.textContent = `
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

    this.shadowRoot.appendChild(this.styleEl);

    this.slotEl = document.createElement('slot');
    this.shadowRoot.appendChild(this.slotEl);

    this.tooltipBox = document.createElement('div');
    this.tooltipBox.className = 'tooltip-box';
    this.shadowRoot.appendChild(this.tooltipBox);

    this.tooltipArrow = document.createElement('div');
    this.tooltipArrow.className = 'tooltip-arrow';
    this.tooltipBox.appendChild(this.tooltipArrow);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 18 10');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', svgNS);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M8.25671 0.825883C8.65395 0.384502 9.34605 0.384502 9.74329 0.825882L18 10L0 10L8.25671 0.825883Z');
    path.setAttribute('fill', '#EBEBEB');

    svg.appendChild(path);
    this.tooltipArrow.appendChild(svg);
  }

  connectedCallback() {
    this._updateTooltip();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this._updateTooltip();
    }
  }

  get tooltipText() {
    return this.getAttribute('text') || '';
  }

  get position() {
    return this.getAttribute('position') || 'bottom';
  }

  _updateTooltip() {
    this.tooltipBox.dataset.position = this.position;

    while (this.tooltipBox.firstChild && this.tooltipBox.firstChild !== this.tooltipArrow) {
      this.tooltipBox.removeChild(this.tooltipBox.firstChild);
    }

    const textNode = document.createTextNode(this.tooltipText);
    this.tooltipBox.insertBefore(textNode, this.tooltipArrow);
  }
}

customElements.define('custom-tooltip', CustomTooltip);
