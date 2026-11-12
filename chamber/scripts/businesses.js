const businessList = document.querySelector("#business-list");
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

gridBtn.addEventListener('click', () => {
  businessList.classList.add('grid');
  businessList.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  businessList.classList.add('list');
  businessList.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

async function getBusinessData() {
  try {
    const response = await fetch('data/members.json'); 
    const data = await response.json();
    displayBusinesses(data.members);
  } catch (error) {
    console.error('Error loading business data:', error);
  }
}

function displayBusinesses(members) {
  businessList.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');

    card.innerHTML = `
      <div class="card-header">
        <h2>${member.name}</h2>
        <p class="tagline">${member.tagline}</p>
      </div>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <div class="card-info">
        <p><strong>ADDRESS:</strong> ${member.addresses}</p>
        <p><strong>PHONE:</strong> ${member.phone_number}</p>
        <p><strong>URL:</strong> <a href="${member.website_url}" target="_blank">${member.website_url.replace('https://', '')}</a></p>
      </div>
    `;

    businessList.appendChild(card);
  });
}

getBusinessData();