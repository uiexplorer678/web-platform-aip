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
    this.shadowRoot.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: relative;
        display: inline-block;
      }
      button.dropdown-trigger {
        cursor: pointer;
    background: white;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: 110px;
    height: 32px;
    color: #637381;
    border-radius: 8px;
    position: relative;
      }
      button.dropdown-icon-only {
        padding: 0.5rem;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        justify-content: center;
      }
      .dropdown-chevron {
        transition: transform 0.3s ease;
        position: absolute;
        right: 10px;
        top: 5px;
        pointer-events: none;
      }
      .dropdown-chevron.up {
        transform: rotate(180deg);
      }
      ul.dropdown-menu {
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
      ul.dropdown-menu.show {
        display: block;
      }
      ul.dropdown-menu.align-left {
        right: 0;
        left: auto;
      }
      ul.dropdown-menu.align-right {
        left: 0;
        right: auto;
      }
      li.dropdown-item {
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      li.dropdown-item:hover {
        background-color: #f0f0f0;
      }
      .dropdown-label {
        padding-left:8px;
      }
    `;
    this.shadowRoot.appendChild(style);

    const iconOnly = this.hasAttribute('icon-only');
    const noBorder = this.hasAttribute('no-border');

    const button = document.createElement('button');
    button.id = 'dropdown-trigger';
    button.className = 'dropdown-trigger';
    if (iconOnly) {
      button.classList.add('dropdown-icon-only');
      if (noBorder) button.style.border = 'none';
    } else {
      if (noBorder) button.style.border = 'none';
    }
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'dropdown-menu');

    if (!iconOnly) {
      const labelSpan = document.createElement('span');
      labelSpan.className = 'dropdown-label';
      labelSpan.textContent = this.selected;
      button.appendChild(labelSpan);
    }

    const chevronSpan = document.createElement('span');
    chevronSpan.className = 'dropdown-chevron';
    chevronSpan.setAttribute('aria-hidden', 'true');
    chevronSpan.innerHTML = `
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4714 14.75C10.2839 14.75 10.1277 14.6875 9.97144 14.5625L2.78394 7.5C2.50269 7.21875 2.50269 6.78125 2.78394 6.5C3.06519 6.21875 3.50269 6.21875 3.78394 6.5L10.4714 13.0312L17.1589 6.4375C17.4402 6.15625 17.8777 6.15625 18.1589 6.4375C18.4402 6.71875 18.4402 7.15625 18.1589 7.4375L10.9714 14.5C10.8152 14.6563 10.6589 14.75 10.4714 14.75Z" fill="#637381"/>
      </svg>`;
    button.appendChild(chevronSpan);

    this.shadowRoot.appendChild(button);

    const ul = document.createElement('ul');
    ul.id = 'dropdown-menu';
    ul.className = 'dropdown-menu';
    ul.setAttribute('role', 'listbox');
    ul.tabIndex = -1;
    this.shadowRoot.appendChild(ul);

    this.options.forEach(opt => {
      const li = document.createElement('li');
      li.className = 'dropdown-item';
      li.textContent = opt;
      li.dataset.value = opt;
      li.setAttribute('role', 'option');
      li.tabIndex = -1;
      ul.appendChild(li);
    });
  }

  setupListeners() {
    const trigger = this.shadowRoot.getElementById('dropdown-trigger');
    const menu = this.shadowRoot.getElementById('dropdown-menu');
    const chevron = this.shadowRoot.querySelector('.dropdown-chevron');
    const label = this.shadowRoot.querySelector('.dropdown-label');

    trigger.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      menu.classList.toggle('show', this.isOpen);
      chevron.classList.toggle('up', this.isOpen);
      trigger.setAttribute('aria-expanded', this.isOpen);

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
        trigger.setAttribute('aria-expanded', 'false');

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
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

customElements.define('auto-align-dropdown', AutoAlignDropdown);
