const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const dateInput = document.querySelector('#datepicker');

async function fetchAPODByDate(date) {
  const formattedDate = date.toISOString().split('T')[0];

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //Display Data
    displayAPOD(data);
  } catch (err) {
    document.querySelector('#app').innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

function displayAPOD(data) {
  let media;

  if (data.media_type === 'image') {
    media = `<img src="${data.url}" alt="${data.title}"/>`;
  } else {
    media = `<video src="${data.url}" controls></video>`;
  }

  document.querySelector('#app').innerHTML = `
    <h1>${data.title}</h1>
    ${media}
    <p>${data.explanation}</p>
    <p><small>NASA APOD - ${data.date}</small></p>
  `;
}

//event listener
dateInput.addEventListener('change', (event) => {
  const selectedDate = new Date(event.target.value);
  fetchAPODByDate(selectedDate);
});

//Load current date on page load
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  dateInput.value = today.toISOString().split('T')[0];
  fetchAPODByDate(today);
});