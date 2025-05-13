const feeds = [
    { title: "Post about AI trends", author: "Jane Doe", time: "2h ago" },
    { title: "Company culture insights", author: "Acme Corp", time: "5h ago" },
    { title: "Hiring tips from experts", author: "John Smith", time: "1d ago" },
  ];

  function renderLinkedInFeedsCard(titleText = "Linkedin Feeds", feedItems = []) {
    const container = document.getElementById("linkedin-feeds");

    let feedHtml = feedItems.map(feed =>
      `<div class="linkedin-feed-item">
        <div class="linkedin-feed-title">${feed.title}</div>
        <div class="linkedin-feed-meta">By ${feed.author} • ${feed.time}</div>
      </div>`
    ).join('');

    container.innerHTML = `
      <div class="linkedin-card-header">
        <div class="linkedin-card-title">
          ${titleText}
          
        </div>
        <div class="linkedin-badge">See All</div>
      </div>
      <div class="linkedin-feed-list">
        ${feedHtml}
      </div>
    `;
  }

  // Initialize with data
  renderLinkedInFeedsCard("Linkedin Feeds", feeds);