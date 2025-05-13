const cardsData = [
    { title: 'Admin Portal', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/icon-1.png' },
    { title: 'Exit Management', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/exit.png' },
    { title: 'Enquiry Registration', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/icon-2.png' },
    { title: 'Portal 4', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/icon-1.png' },
    { title: 'Portal 5', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/exit.png' },
    { title: 'Portal 6', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: 'assets/icon-2.png' }
];

const visibleCount = 3;
let startIndex = 0;

const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderCarousel() {
    // Clear old cards
    track.innerHTML = '';

    // Slice visible cards
    const visibleCards = cardsData.slice(startIndex, startIndex + visibleCount);

    // Render visible cards
    visibleCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'carousel-card';
        cardDiv.innerHTML = `
        
      <div data-layer="carousel-icon" class="carousel-icon">
  <div data-svg-wrapper data-layer="question-mark-circle" class="QuestionMarkCircle">
    <img src="${card.icon}" alt="Question Mark Icon" width="41" height="40" />
  </div>
</div>
        <div style="font-weight: 600; color: var(--card-title-color);text-align:center;">${card.title}</div>
        <div style="font-size: 14px; color: var(--card-desc-color);text-align:center;">${card.description}</div>
     
      `;
        track.appendChild(cardDiv);
    });

    // Toggle buttons
    prevBtn.disabled = startIndex === 0;
    nextBtn.disabled = startIndex + visibleCount >= cardsData.length;
}

prevBtn.addEventListener('click', () => {
    if (startIndex > 0) {
        startIndex--;
        renderCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (startIndex + visibleCount < cardsData.length) {
        startIndex++;
        renderCarousel();
    }
});

// Initial load
renderCarousel();
