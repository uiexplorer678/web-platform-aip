  const linksData = [
      { linkName: "Apply Leave", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Apply Leave", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      { linkName: "Lorem Ipsum", link: "#" },
      
    ];

    function generateLinkList(containerId, items) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      items.forEach(({ linkName, link }) => {
        const div = document.createElement("div");
        div.className = "user-list";

        div.innerHTML = `
          <a class="user-item" href="${link}" target="_blank" rel="noopener noreferrer">
            <div class="user-text">
              <div class="text-content">${linkName}</div>
            </div>
          </a>
          <div class="external-link" onclick="window.open('${link}', '_blank')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6H6C5.47 6 4.96 6.21 4.59 6.59C4.21 6.96 4 7.47 4 8V18C4 18.53 4.21 19.04 4.59 19.41C4.96 19.79 5.47 20 6 20H16C16.53 20 17.04 19.79 17.41 19.41C17.79 19.04 18 18.53 18 18V14M14 4H20M20 4V10M20 4L10 14"
                stroke="#485563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        `;

        container.appendChild(div);
      });
    }

    generateLinkList('linkListContainer', linksData);