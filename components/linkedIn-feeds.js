const feeds = [
  { title: "Post about AI trends", author: "Jane Doe", time: "2h ago" },
  { title: "Company culture insights", author: "Acme Corp", time: "5h ago" },
  { title: "Hiring tips from experts", author: "John Smith", time: "1d ago" },
];

function renderLinkedInFeedsCard(titleText = "Linkedin Feeds", feedItems = []) {
  const container = document.getElementById("linkedin-feeds");

  let feedHtml = feedItems.map(feed =>
    `<div class="linkedin-feed-item-wrapper">
    <img src="assets/user.png" alt="info" class="icon" width="24" height="24"/>
    <div class="linkedin-feed-item">
        <div class="linkedin-feed-title">${feed.title}</div>
        <div class="linkedin-feed-meta">By ${feed.time}</div>
        <div class="linkedin-feed-deesc">By ${feed.author}</div>
      </div>
      <div>
      <img src="assets/linkedIn.png" alt="info" class="icon" />
      </div></div>
      `
  ).join('');

  container.innerHTML = `
      <div class="linkedin-card-header">
        <div class="linkedin-card-title">
          ${titleText}
        </div>
        <div class="see-all-container">
        <div class="see-all-button">See All</div>
      </div>
      </div>
      <div class="linkedin-feed-list">
        ${feedHtml}
      </div>
    `;
}

// Initialize with data
renderLinkedInFeedsCard("Linkedin Feeds", feeds);