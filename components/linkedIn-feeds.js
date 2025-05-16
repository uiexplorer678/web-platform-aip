const feeds = [
  { title: "Post about AI trends", author: "Our series of user friendly tools to support your needs for seamless our series of user friendly tools to support your needs for seamless a our series of user friendly tools to support your needs for seamless...", time: "2h ago" },
  { title: "Company culture insights", author: "Our series of user friendly tools to support your needs for seamless our series of user friendly tools to support your needs for seamless a our series of user friendly tools to support your needs for seamless...", time: "5h ago" },
  { title: "Hiring tips from experts", author: "Our series of user friendly tools to support your needs for seamless our series of user friendly tools to support your needs for seamless a our series of user friendly tools to support your needs for seamless...", time: "1d ago" },
];

function renderLinkedInFeedsCard(titleText = "Linkedin Feeds", feedItems = []) {
  const container = document.getElementById("linkedin-feeds");
  container.textContent = '';
  const header = document.createElement('div');
  header.classList.add('linkedin-card-header');

  const title = document.createElement('div');
  title.classList.add('linkedin-card-title');
  title.textContent = titleText;

  const seeAllContainer = document.createElement('div');
  seeAllContainer.classList.add('see-all-container');

  const seeAllButton = document.createElement('div');
  seeAllButton.classList.add('see-all-button');
  seeAllButton.textContent = 'See All';

  seeAllContainer.appendChild(seeAllButton);
  header.appendChild(title);
  header.appendChild(seeAllContainer);

  const feedList = document.createElement('div');
  feedList.classList.add('linkedin-feed-list');

  feedItems.forEach(feed => {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('linkedin-feed-item-wrapper');

    const userIcon = document.createElement('img');
    userIcon.src = 'assets/user.png';
    userIcon.alt = 'info';
    userIcon.classList.add('icon');
    userIcon.width = 32;
    userIcon.height = 32;

    const feedItem = document.createElement('div');
    feedItem.classList.add('linkedin-feed-item');

    const feedTitle = document.createElement('div');
    feedTitle.classList.add('linkedin-feed-title');
    feedTitle.textContent = feed.title;

    const feedMeta = document.createElement('div');
    feedMeta.classList.add('linkedin-feed-meta');
    feedMeta.textContent = `By ${feed.time}`;

    const feedAuthor = document.createElement('div');
    feedAuthor.classList.add('linkedin-feed-deesc');
    feedAuthor.textContent = `By ${feed.author}`;

    feedItem.appendChild(feedTitle);
    feedItem.appendChild(feedMeta);
    feedItem.appendChild(feedAuthor);

    const linkedInIconWrapper = document.createElement('div');
    const linkedInIcon = document.createElement('img');
    linkedInIcon.src = 'assets/linkedIn.png';
    linkedInIcon.alt = 'info';
    linkedInIcon.width = '20';
    linkedInIcon.height ='20';
    linkedInIcon.classList.add('icon');

    linkedInIconWrapper.appendChild(linkedInIcon);

    itemWrapper.appendChild(userIcon);
    itemWrapper.appendChild(feedItem);
    itemWrapper.appendChild(linkedInIconWrapper);

    feedList.appendChild(itemWrapper);
  });

  container.appendChild(header);
  container.appendChild(feedList);
}


renderLinkedInFeedsCard("Linkedin Feeds", feeds);