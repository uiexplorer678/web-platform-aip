class FullwidthCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.images = [
      'assets/Pic-2.jpeg',
      'assets/Pic-3.jpeg',
      'assets/Pic-2.jpg',
      'assets/Pic-3.jpeg',
      'assets/Pic-2.jpeg',
      'assets/Pic-3.jpg',
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
    const style = document.createElement('style');
    style.textContent = `
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
    `;

    const container = document.createElement('div');
    container.classList.add('slide-container');
    container.id = 'slide-container';

    this.images.forEach(url => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.style.backgroundImage = `url('${url}')`;
      container.appendChild(slide);
    });

    const prevBtn = document.createElement('button');
    prevBtn.className = 'button prev';
    prevBtn.id = 'prev';
    prevBtn.textContent = '❮';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'button next';
    nextBtn.id = 'next';
    nextBtn.textContent = '❯';

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    dotsContainer.id = 'carousel-dots';

    this.images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === this.currentIndex) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    this.shadowRoot.append(style, container, prevBtn, nextBtn, dotsContainer);
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
