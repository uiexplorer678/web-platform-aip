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
     
      
    ];

    function generateLinkList(containerId, items) {
      const container = document.getElementById(containerId);
      container.textContent = ''; 
    
      items.forEach(({ linkName, link }) => {
        const div = document.createElement('div');
        div.className = 'quicklink-list';
    
        const a = document.createElement('a');
        a.className = 'quicklink-user-item';
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    
        const aInnerDiv = document.createElement('div');
        aInnerDiv.className = 'quicklink-user-text';
    
        const textContentDiv = document.createElement('div');
        textContentDiv.className = 'quicklink-text-content';
        textContentDiv.textContent = linkName;
    
        aInnerDiv.appendChild(textContentDiv);
        a.appendChild(aInnerDiv);
    
        const extLinkDiv = document.createElement('div');
        extLinkDiv.className = 'quicklink-external-link';
    
        extLinkDiv.addEventListener('click', () => {
          window.open(link, '_blank');
        });
    
        const svgNS = 'http://www.w3.org/2000/svg';
    
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', svgNS);
    
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M10 6H6C5.47 6 4.96 6.21 4.59 6.59C4.21 6.96 4 7.47 4 8V18C4 18.53 4.21 19.04 4.59 19.41C4.96 19.79 5.47 20 6 20H16C16.53 20 17.04 19.79 17.41 19.41C17.79 19.04 18 18.53 18 18V14M14 4H20M20 4V10M20 4L10 14');
        path.setAttribute('stroke', '#485563');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
    
        svg.appendChild(path);
        extLinkDiv.appendChild(svg);
    
        div.appendChild(a);
        div.appendChild(extLinkDiv);
    
        container.appendChild(div);
      });
    }
    

    generateLinkList('quicklinksstack', linksData);