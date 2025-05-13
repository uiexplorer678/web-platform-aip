class UserCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cards = [
      {
        name: 'Valie Christy',
        title: 'Completed 3 years',
        message:'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user.png'
      },
      {
        name: 'Lim Mouris',
        description: 'Completed 4 years',
        message:'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user2.png'
      },
      {
        name: 'Paul',
        description: 'Completed 3 years',
        message:'Designation - Project Manager Associated with us since May 2022',
        icon: 'assets/user.png'
      },
      {
        name: 'Alan',
        description: 'Completed 2 years',
        message:'Designation - Project Manager Associated with us since May 2022',
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
      <style>
        

        .wc-carousel-container {
           display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  max-width: 900px;
  margin: auto;
  padding:0 16px;
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
        }

        .carousel__card {
          background-color: #fff;
          border-radius: 12px;
          padding: 16px;
          flex: 0 0 calc(33.333% - 10.6px);
          box-sizing: border-box;
          text-align: center;
        }

        .carousel__card-icon img {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }

        .carousel__card-title {
          font-weight: 600;
          color: var(--card-title-color, #333);
          margin-bottom: 8px;
        }

        .carousel__card-description {
          font-size: 14px;
          color: var(--card-desc-color, #666);
        }

        @media (max-width: 768px) {
          .carousel__card {
            flex: 0 0 100%;
          }
        }
      </style>
 <link rel="stylesheet" href="css/main.css">
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
    viewport.innerHTML = '';

    const visibleCards = this.cards.slice(this.startIndex, this.startIndex + this.visibleCount);

    visibleCards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'carousel__card';
      cardEl.innerHTML = `
         <div class="work-anniversary-userlist">
                <div class="work-anniversary-usercontainer">
                  <img class="work-anniversary-userellipse" src="${card.icon}" />
                  <div class="work-anniversary-userrectangle">${card.title}</div>
                </div>
                <div class="work-anniversary-usercontainer">
                  <div class="work-anniversary-userinfo">
                    <div class="work-anniversary-username">${card.name}</div>
                    <div class="work-anniversary-userdesignation">${card.message}</div>
                  </div>
                </div>
                <div class="work-anniversary-wishcontainer">
                  <div class="work-anniversary-wishbutton" >Wish</div>
                </div>
              </div>
      `;
      viewport.appendChild(cardEl);
    });

    this.shadowRoot.getElementById('prevBtn').disabled = this.startIndex === 0;
    this.shadowRoot.getElementById('nextBtn').disabled = this.startIndex + this.visibleCount >= this.cards.length;
  }
}

customElements.define('user-carousel', UserCarousel);
