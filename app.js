const apiKey = 'afc9a0f7e187248702de4809263f5eb4';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const lang = 'ru';
const units = 'si'; // Цельсии вместо фаренгейтов
const placeholder = document.querySelector('.weather');
const skycons = new Skycons({ color: '#fff' });

const formatDate = (time) => {
    const date = new Date(time * 1000);
    const formattedDate = date.toLocaleString('ru', {month: 'long', day: 'numeric', weekday: 'long'});
    return formattedDate;
}


window.addEventListener('load', () => {
    let long = 50.15;
    let lat = 53.20006;

    fetch(`${proxy}https://api.darksky.net/forecast/${apiKey}/${lat},${long}?lang=${lang}&units=${units}&exclude=flags`)
      .then(res => res.json())
      .then(data => {
          // console.log(data);
          document.querySelector('.app__subheader').innerHTML = data.daily.summary;
          document.querySelector('.app__date').innerHTML = `Сегодня ${formatDate(data.currently.time)}`;
          document.querySelector('.app__temp').innerHTML = `${Math.round(data.currently.temperature)} °C`;
          document.querySelector('.app__feel').innerHTML = `Ощущается как ${Math.round(data.currently.apparentTemperature)} °C`;
          document.querySelector('.app__desc').innerHTML = data.hourly.summary;
          skycons.set('icon', data.currently.icon);
          skycons.play();
          data.daily.data.forEach(day => {
              let output = `
                  <div class="weather-item">
                    <h3 class="weather-item__date">${formatDate(day.time)}</h3>
                    <p class="weather-item__temp"><i class="fas fa-temperature-high"></i>
                    Максимальная температура за день: ${Math.round(day.temperatureHigh)} °C</p>
                    <p class="weather-item__temp"><i class="fas fa-temperature-low"></i>
                    Минимальная температура за день: ${Math.round(day.temperatureMin)} °C</p>
                    <p class="weather-item__desc"><i class="fas fa-satellite-dish"></i> ${day.summary}</p>
                    <p class="weather-item__precip"><i class="fas fa-umbrella"></i> Вероятность осадков: ${Math.round(day.precipProbability * 100)}%</p>
                    <p class="weather-item__humidity"><i class="fas fa-tint"></i> Влажность: ${Math.round(day.humidity * 100)}%</p>
                    <p class="weather-item__wind"><i class="fas fa-wind"></i> Скорость ветра: ${Math.round(day.windSpeed)} М/с</p>
                  </div>
              `;
              placeholder.insertAdjacentHTML('beforeend', output);
          })
          $('.weather').slick({
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              draggable: false,
              responsive: [
                      {
                          breakpoint: 1024,
                          settings: {
                              slidesToShow: 3
                          }
                      },
                      {
                          breakpoint: 800,
                          settings: {
                              slidesToShow: 1,
                              arrows: false,
                              dots: true
                          }
                      }
                  ]
          });
      });
});
