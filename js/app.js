const cityForm = document.querySelector('.change-loc');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const label = document.querySelector('label');
const forecast = new Forecast();

const updateUI = data => {
    // destructure properties;
    // const { cityDets, weather } = data;
    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details template;
    details.innerHTML = `
        <h5 class="text-muted">${cityDets.EnglishName}</h5>
        <div class="cond">${weather.WeatherText}</div>
        <div class="temp">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icons;
    // Ternary Operator;
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // remove the d-none class if exist;
    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');
}

cityForm.addEventListener('submit', e => {
    // prevent defualt actions;
    e.preventDefault();

    // get city value;
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city;
    forecast.updateCity(city)
        .then(data => {
            updateUI(data);
            label.textContent = 'Enter a location for Weather information';
            label.style.color = '#6c757d'
        })
        .catch(() => {
            label.textContent = 'Enter a valid location';
            label.style.color = 'red';
        });

    // set local storage;
    localStorage.setItem('city', city);
});

// storing the city if exist;
if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUI(data);
            label.textContent = 'Enter a location for Weather information';
            label.style.color = '#6c757d'
        })
        .catch(() => {
            label.textContent = 'Enter a valid location';
            label.style.color = 'red';
        });
}