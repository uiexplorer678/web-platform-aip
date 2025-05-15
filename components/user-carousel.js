class UserCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cards = [
      {
        name: 'Valie Christy',
        title: 'Completed 3 years',
        message: 'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user.png'
      },
      {
        name: 'Lim Mouris',
        description: 'Completed 4 years',
        message: 'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user2.png'
      },
      {
        name: 'Paul',
        description: 'Completed 3 years',
        message: 'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user.png'
      },
      {
        name: 'Alan',
        description: 'Completed 2 years',
        message: 'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user2.png'
      }
    ];
    this.visibleCount = 1;
    this.startIndex = 0;
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
    this.renderCarousel();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/main.css" />
      <style>
        .wc-carousel-container {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          max-width: 900px;
          margin: auto;
          padding: 0 16px;
        }

        .carousel__nav-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background-color: #ffffff;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }

        .carousel__nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .carousel__viewport {
          display: flex;
          overflow: hidden;
          flex: 1;
          gap: 16px;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .carousel__card {
            flex: 0 0 100%;
          }
        }
      </style>
      <div class="wc-carousel-container">
        <button class="carousel__nav-button" id="prevBtn">❮</button>
        <div class="carousel__viewport" id="carouselViewport"></div>
        <button class="carousel__nav-button" id="nextBtn">❯</button>
      </div>
    `;
  }

  attachEvents() {
    this.shadowRoot.getElementById('prevBtn').addEventListener('click', () => {
      if (this.startIndex > 0) {
        this.startIndex--;
        this.renderCarousel();
      }
    });

    this.shadowRoot.getElementById('nextBtn').addEventListener('click', () => {
      if (this.startIndex + this.visibleCount < this.cards.length) {
        this.startIndex++;
        this.renderCarousel();
      }
    });
  }

  renderCarousel() {
    const viewport = this.shadowRoot.getElementById('carouselViewport');
    viewport.innerHTML = ''; // clear previous

    const visibleCards = this.cards.slice(this.startIndex, this.startIndex + this.visibleCount);

    visibleCards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'carousel__card';

      // Build the card structure manually
      const userList = document.createElement('div');
      userList.className = 'work-anniversary-userlist';

      const userContainer1 = document.createElement('div');
      userContainer1.className = 'work-anniversary-usercontainer';

      const img = document.createElement('img');
      img.className = 'work-anniversary-userellipse';
      img.src = card.icon;
      img.alt = card.name;

      const titleDiv = document.createElement('div');
      titleDiv.className = 'work-anniversary-userrectangle';
      titleDiv.textContent = card.title || card.description || '';

      userContainer1.appendChild(img);
      userContainer1.appendChild(titleDiv);

      const userContainer2 = document.createElement('div');
      userContainer2.className = 'work-anniversary-usercontainer';

      const userInfo = document.createElement('div');
      userInfo.className = 'work-anniversary-userinfo';

      const userName = document.createElement('div');
      userName.className = 'work-anniversary-username';
      userName.textContent = card.name;

      const userDesignation = document.createElement('div');
      userDesignation.className = 'work-anniversary-userdesignation';
      userDesignation.textContent = card.message;

      userInfo.appendChild(userName);
      userInfo.appendChild(userDesignation);
      userContainer2.appendChild(userInfo);

      const wishContainer = document.createElement('div');
      wishContainer.className = 'work-anniversary-wishcontainer';

      const wishButton = document.createElement('div');
      wishButton.className = 'work-anniversary-wishbutton';
      wishButton.textContent = 'Wish';

      wishContainer.appendChild(wishButton);

      userList.appendChild(userContainer1);
      userList.appendChild(userContainer2);
      userList.appendChild(wishContainer);

      cardEl.appendChild(userList);

      viewport.appendChild(cardEl);
    });

    // Disable nav buttons if at boundaries
    this.shadowRoot.getElementById('prevBtn').disabled = this.startIndex === 0;
    this.shadowRoot.getElementById('nextBtn').disabled = this.startIndex + this.visibleCount >= this.cards.length;
  }
}

customElements.define('user-carousel', UserCarousel);
