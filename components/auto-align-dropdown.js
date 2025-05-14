class AutoAlignDropdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.options = [];
        this.defaultOption = '';
        this.selected = '';
        this.isOpen = false;
    }

    connectedCallback() {
        try {
            this.options = JSON.parse(this.getAttribute('options')) || [];
        } catch {
            this.options = [];
        }

        this.defaultOption = this.getAttribute('default') || this.options[0] || 'Select';
        this.selected = this.defaultOption;

        this.render();
        this.setupListeners();
    }

    render() {
        const iconOnly = this.hasAttribute('icon-only');
        const noBorder = this.hasAttribute('no-border');
        const itemsHTML = this.options.map(opt =>
            `<li data-value="${opt}">${opt}</li>`
        ).join('');

        const buttonContent = iconOnly
            ? `<span class="chevron"> <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4714 14.75C10.2839 14.75 10.1277 14.6875 9.97144 14.5625L2.78394 7.5C2.50269 7.21875 2.50269 6.78125 2.78394 6.5C3.06519 6.21875 3.50269 6.21875 3.78394 6.5L10.4714 13.0312L17.1589 6.4375C17.4402 6.15625 17.8777 6.15625 18.1589 6.4375C18.4402 6.71875 18.4402 7.15625 18.1589 7.4375L10.9714 14.5C10.8152 14.6563 10.6589 14.75 10.4714 14.75Z" fill="#637381"/>
            </svg></span>`
            : `<span class="label">${this.selected}</span> <span class="chevron"> <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4714 14.75C10.2839 14.75 10.1277 14.6875 9.97144 14.5625L2.78394 7.5C2.50269 7.21875 2.50269 6.78125 2.78394 6.5C3.06519 6.21875 3.50269 6.21875 3.78394 6.5L10.4714 13.0312L17.1589 6.4375C17.4402 6.15625 17.8777 6.15625 18.1589 6.4375C18.4402 6.71875 18.4402 7.15625 18.1589 7.4375L10.9714 14.5C10.8152 14.6563 10.6589 14.75 10.4714 14.75Z" fill="#637381"/>
            </svg></span>`;

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: relative;
            display: inline-block;
          }

          button {
            cursor: pointer;
            padding: 0.5rem 1rem;
            background: white;
            border: ${noBorder ? 'none' : '1px solid #ccc'};
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            width: 146px;
            height: 38px;
            color: #637381;
            border-radius:8px;
          }

          button.icon-only {
            padding: 0.5rem;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            justify-content: center;
          }

          .chevron {
            transition: transform 0.3s ease;
                right: 10px;
    position: absolute;
    top: 10px
          }

          .chevron.up {
            transform: rotate(180deg);
          }

          ul {
            position: absolute;
            top: 100%;
            margin-top: 6px;
            min-width: 160px;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            list-style: none;
            padding: 0;
            display: none;
            z-index: 100;
          }

          ul.show {
            display: block;
          }

          ul.align-left {
            right: 0;
          }

          ul.align-right {
            left: 0;
          }

          li {
            padding: 0.5rem 1rem;
            cursor: pointer;
          }

          li:hover {
            background-color: #f0f0f0;
          }
        </style>

       
          <button class="${iconOnly ? 'icon-only' : ''}" id="trigger">${buttonContent}</button>
          <ul id="menu">${itemsHTML}</ul>
        
      `;
    }

    setupListeners() {
        const trigger = this.shadowRoot.getElementById('trigger');
        const menu = this.shadowRoot.getElementById('menu');
        const chevron = this.shadowRoot.querySelector('.chevron');
        const label = this.shadowRoot.querySelector('.label');

        trigger.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            menu.classList.toggle('show', this.isOpen);
            chevron.classList.toggle('up', this.isOpen);

            menu.classList.remove('align-left', 'align-right');

            const rect = this.getBoundingClientRect();
            const spaceRight = window.innerWidth - rect.right;
            const spaceLeft = rect.left;

            if (spaceRight < 160 && spaceLeft > 160) {
                menu.classList.add('align-left');
            } else {
                menu.classList.add('align-right');
            }
        });

        menu.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                this.selected = e.target.dataset.value;
                if (label) label.textContent = this.selected;

                this.isOpen = false;
                menu.classList.remove('show');
                chevron.classList.remove('up');

                this.dispatchEvent(new CustomEvent('change', {
                    detail: this.selected,
                    bubbles: true,
                    composed: true
                }));
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.isOpen = false;
                menu.classList.remove('show');
                chevron.classList.remove('up');
            }
        });
    }
}

customElements.define('auto-align-dropdown', AutoAlignDropdown);