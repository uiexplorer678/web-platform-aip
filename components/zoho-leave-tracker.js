class ZohoTicketTracker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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

  render() {
    this.shadowRoot.innerHTML = `
       <link rel="stylesheet" href="css/main.css">
        <div class="zoho-leave-container">
        <div class="zoho-container">
          <div class="zoho-ticket-tracker">${this.title}</div>
          ${this.showSeeAll ? `
             <div class="zoho-badge">See All</div>` : ''}
        </div>
        <div class="user-input">
         <div class="search-box">
  <input type="text" placeholder="Search..." id="searchInput" />
  <span class="icon" id="searchIcon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M6.4 1.575C7.775 1.575 9.068 2.078 10.074 2.991L10.271 3.179C12.217 5.1 12.38 8.148 10.821 10.28L10.541 10.664L10.91 10.963L15.035 14.313C15.047 14.323 15.058 14.338 15.058 14.349C15.059 14.362 15.057 14.385 15.035 14.413C15.031 14.418 15.025 14.421 15.000 14.425C14.978 14.418 14.966 14.411 14.954 14.402L10.79 11.036L10.456 10.766L10.138 11.056C9.102 12 7.795 12.525 6.4 12.525C4.933 12.525 3.56 11.953 2.529 10.922C0.399 8.792 0.399 5.308 2.529 3.179C3.56 2.147 4.933 1.575 6.4 1.575Z"
         stroke="#6B7280"/>
    </svg>
  </span>
</div>
        </div>
      </div>
      `;
    this.setupInputBehavior();
  }
  setupInputBehavior() {
    const input = this.shadowRoot.getElementById('searchInput');
    const icon = this.shadowRoot.getElementById('searchIcon');
    const toggleIcon = () => {
      icon.classList.toggle('hidden', input.value.trim().length > 0);
    };
    input.addEventListener('input', toggleIcon);
    toggleIcon(); // Initial state
  }
}


customElements.define('zoho-ticket-tracker', ZohoTicketTracker);
