class ApplicationsCarousel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.cardsData = [
        { title: 'Admin Portal', description: 'Centralized platform that allows administrators to manage users, settings, permissions, and system configurations.', icon: 'assets/admin-portal.png' },
        { title: 'Exit Management', description: 'Helps organizations manage the employee exit process, including resignation, exit interviews, final settlements, asset recovery, and policy compliance.', icon: 'assets/exit-management.svg' },
        { title: 'Enquiry Registration', description: 'Offers a bid form that gathers essential project details such as scope, deadlines, and financial terms to evaluate feasibility and track bid status and amounts.', icon: 'assets/enquiry-registration.svg' },
        { title: 'Vendor MS', description: 'Software application that enables organizations to efficiently manage their vendors and suppliers by streamlining processes such as payment applications and invoicing.', icon: 'assets/vendor-ms.svg' },
        { title: 'HR System Management', description: 'An application that streamlines HR tasks like payroll, attendance, leave, recruitment, and performance in one integrated platform.', icon: 'assets/hr-system-management.svg' },
        { title: 'PM Systems', description: 'An application that helps plan, organize, manage resources, and develop resource estimates.', icon: 'assets/pm-systems.svg' },
        { title: 'Power BI Reports', description: 'Offers dashboards and reports with various features, enabling users to view and download data.', icon: 'assets/power-bi.svg' }
      ];
  
      this.visibleCount = 3;
      this.startIndex = 0;
    }
  
    connectedCallback() {
      this.renderComponent();
      this.renderCards();
      this.addEventListeners();
    }
  
    renderComponent() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/main.css'; 
  
      const container = document.createElement('div');
      container.classList.add('carousel-container');
  
      this.prevBtn = document.createElement('button');
      this.prevBtn.className = 'carousel-button prev';
      this.prevBtn.disabled = true;
      this.prevBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="icon">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;
  
      const trackWrapper = document.createElement('div');
      trackWrapper.className = 'carousel-track-wrapper';
  
      this.track = document.createElement('div');
      this.track.className = 'carousel-track';
      trackWrapper.appendChild(this.track);
  
      this.nextBtn = document.createElement('button');
      this.nextBtn.className = 'carousel-button next';
      this.nextBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="icon">
      <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;
  
      container.append(this.prevBtn, trackWrapper, this.nextBtn);
      this.shadowRoot.append(link, container);
    }
  
    renderCards() {
      this.track.innerHTML = '';
      const visibleCards = this.cardsData.slice(this.startIndex, this.startIndex + this.visibleCount);
  
      visibleCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'carousel-card';
  
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'carousel-icon';
        const iconImg = document.createElement('img');
        iconImg.src = card.icon;
        iconImg.alt = card.title;
        iconImg.width = 41;
        iconImg.height = 40;
        iconWrapper.appendChild(iconImg);
  
        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-title';
        titleDiv.textContent = card.title;
  
        const descDiv = document.createElement('div');
        descDiv.className = 'card-description';
        descDiv.textContent = card.description;
  
        cardDiv.append(iconWrapper, titleDiv, descDiv);
        this.track.appendChild(cardDiv);
      });
  
      this.prevBtn.disabled = this.startIndex === 0;
      this.nextBtn.disabled = this.startIndex + this.visibleCount >= this.cardsData.length;
    }
  
    addEventListeners() {
      this.prevBtn.addEventListener('click', () => {
        if (this.startIndex > 0) {
          this.startIndex--;
          this.renderCards();
        }
      });
  
      this.nextBtn.addEventListener('click', () => {
        if (this.startIndex + this.visibleCount < this.cardsData.length) {
          this.startIndex++;
          this.renderCards();
        }
      });
    }
  }
  
  customElements.define('applications-carousel', ApplicationsCarousel);
  