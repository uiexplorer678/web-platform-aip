const cardsData = [
    { title: 'Admin Portal', description: 'Centralized platform that allows administrators to manage users, settings, permissions, and system configurations.', icon: 'assets/admin-portal.png' },
    { title: 'Exit Management', description: 'Helps organizations manage the employee exit process, including resignation, exit interviews, final settlements, asset recovery, and policy compliance.', icon: 'assets/exit-management.svg' },
    { title: 'Enquiry Registration', description: ' Offers a bid form that gathers essential project details such as scope, deadlines, and financial terms to evaluate feasibility and track bid status and amounts.', icon: 'assets/enquiry-registration.svg' },
    { title: 'Vendor MS', description: ' Software application that enables organizations to efficiently manage their vendors and suppliers by streamlining processes such as payment applications and invoicing.', icon: 'assets/vendor-ms.svg' },
    { title: 'HR System Management', description: 'An application that streamlines HR tasks like payroll, attendance, leave, recruitment, and performance in one integrated platform.', icon: 'assets/hr-system-management.svg' },
    { title: 'PM Systems', description: 'An application that helps plan, organize, manage resources, and develop resource estimates.', icon: 'assets/pm-systems.svg' },
    { title: 'Power BI Reports', description: 'offers dashboards and reports with various features, enabling users to view and download data.', icon: 'assets/power-bi.svg' }
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
        <div style="font-size: 10px; color: var(--card-desc-color);text-align:center;">${card.description}</div>
     
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
