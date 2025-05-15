class ZohoTicketTracker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'show-see-all'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  get title() {
    return this.getAttribute('title') || 'Zoho Ticket Tracker';
  }

  get showSeeAll() {
    return this.getAttribute('show-see-all') === 'true';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    while (shadow.firstChild) {
      shadow.removeChild(shadow.firstChild);
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/main.css';
    shadow.appendChild(link);

    const zohoLeaveContainer = document.createElement('div');
    zohoLeaveContainer.className = 'zoho-leave-container';

    const zohoContainer = document.createElement('div');
    zohoContainer.className = 'zoho-container';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'zoho-ticket-tracker';
    titleDiv.textContent = this.title;
    zohoContainer.appendChild(titleDiv);
    if (this.showSeeAll) {
      const seeAllContainer = document.createElement('div');
      seeAllContainer.className = 'see-all-container';

      const seeAllButton = document.createElement('div');
      seeAllButton.className = 'see-all-button';
      seeAllButton.textContent = 'See All';

      seeAllButton.addEventListener('click', () => {
        const popover = document.getElementById('myPopover');
        if (popover && typeof popover.open === 'function') {
          popover.open();
        } else {
          console.warn('Popover element with id "myPopover" not found or does not have an open() method.');
        }
      });

      seeAllContainer.appendChild(seeAllButton);
      zohoContainer.appendChild(seeAllContainer);
    }

    zohoLeaveContainer.appendChild(zohoContainer);
    const userInput = document.createElement('div');
    userInput.className = 'user-input';

    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search...';
    input.id = 'searchInput';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon';
    iconSpan.id = 'searchIcon';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', svgNS);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M6.4 1.575C7.775 1.575 9.068 2.078 10.074 2.991L10.271 3.179C12.217 5.1 12.38 8.148 10.821 10.28L10.541 10.664L10.91 10.963L15.035 14.313C15.047 14.323 15.058 14.338 15.058 14.349C15.059 14.362 15.057 14.385 15.035 14.413C15.031 14.418 15.025 14.421 15.000 14.425C14.978 14.418 14.966 14.411 14.954 14.402L10.79 11.036L10.456 10.766L10.138 11.056C9.102 12 7.795 12.525 6.4 12.525C4.933 12.525 3.56 11.953 2.529 10.922C0.399 8.792 0.399 5.308 2.529 3.179C3.56 2.147 4.933 1.575 6.4 1.575Z');
    path.setAttribute('stroke', '#6B7280');

    svg.appendChild(path);
    iconSpan.appendChild(svg);

    searchBox.appendChild(input);
    searchBox.appendChild(iconSpan);

    userInput.appendChild(searchBox);
    zohoLeaveContainer.appendChild(userInput);

    shadow.appendChild(zohoLeaveContainer);

    this.setupInputBehavior(input, iconSpan);
  }

  setupInputBehavior(input, icon) {
    const toggleIcon = () => {
      icon.classList.toggle('hidden', input.value.trim().length > 0);
    };
    input.addEventListener('input', toggleIcon);
    toggleIcon();
  }
}

customElements.define('zoho-ticket-tracker', ZohoTicketTracker);
