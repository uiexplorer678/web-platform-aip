class FullwidthCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.images = [
      'assets/Pic-1.JPEG',
      'assets/Pic-2.JPEG',
      'assets/Pic-3.jpg',
      'https://picsum.photos/id/1020/1600/900',  'assets/Pic-1.JPEG',
      'assets/Pic-2.JPEG',
      'assets/Pic-3.jpg',
      'https://picsum.photos/id/1020/1600/900'
    ];

    this.currentIndex = 0;
    this.autoSlideInterval = 5000;
    this.timer = null;
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
    this.startAutoSlide();
  }

  render() {
    const style = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 338px;
          overflow: hidden;
          position: relative;
        }

        .slide-container {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease-in-out;
        }

        .slide {
          flex: 0 0 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 2;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .carousel-dots {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          z-index: 3;
        }

        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin: 0 4px;
          background-color: #bbb;
          border-radius: 50%;
          transition: background-color 0.3s;
          cursor: pointer;
        }

        .dot.active {
          background-color: #fff;
        }

        @media (max-width: 768px) {
          .button {
            padding: 0.75rem;
            font-size: 1.2rem;
          }
        }
      </style>
    `;

    const slides = this.images
      .map(url => `<div class="slide" style="background-image: url('${url}')"></div>`)
      .join('');

    const dots = this.images
      .map((_, i) => `<span class="dot${i === this.currentIndex ? ' active' : ''}"></span>`)
      .join('');

    const html = `
      ${style}
      <div class="slide-container" id="slide-container">
        ${slides}
      </div>
      <button class="button prev" id="prev">&#10094;</button>
      <button class="button next" id="next">&#10095;</button>
      <div class="carousel-dots" id="carousel-dots">
        ${dots}
      </div>
    `;

    this.shadowRoot.innerHTML = html;
  }

  setupListeners() {
    this.shadowRoot.getElementById('next').addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoSlide();
    });

    this.shadowRoot.getElementById('prev').addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoSlide();
    });

    this.shadowRoot.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });
  }

  updateSlide() {
    const slideContainer = this.shadowRoot.getElementById('slide-container');
    slideContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.updateDots();
  }

  updateDots() {
    const dots = this.shadowRoot.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlide();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlide();
  }

  startAutoSlide() {
    this.timer = setInterval(() => this.nextSlide(), this.autoSlideInterval);
  }

  resetAutoSlide() {
    clearInterval(this.timer);
    this.startAutoSlide();
  }
}

customElements.define('fullwidth-carousel', FullwidthCarousel);
