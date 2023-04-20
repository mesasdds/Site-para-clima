const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const weatherEl = document.getElementById('weather');
const body = document.querySelector('body');
const locationBtn = document.getElementById('location-btn');
const imagem = document.getElementById('img');


searchBtn.addEventListener('click', () => {
	const cityName = cityInput.value;
	const apiKey = 'SUA KEY AQUI';
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt_br&units=metric`;

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			temperatureEl.textContent = `Temperatura: ${data.main.temp}°C`;
			weatherEl.textContent = `Clima atual: ${data.weather[0].description}`;
			let state = data.sys.country;
			if(state == 'BR'){
				const CountryNameApi = `https://restcountries.com/v3.1/alpha/${state}`
				fetch(CountryNameApi)
 	 			.then(response => response.json())
  				.then(data =>{
					//console.log(data.name);
    				const countryName = data[0].name.nativeName.por.common;
    				console.log(countryName); // "Brazil"
					const Country = document.getElementById('country_Check');
					Country.textContent = `${countryName}`;
				})
  				.catch(error => console.error(error));
			}else{
				const CountryNameApi = `https://restcountries.com/v3.1/alpha/${state}`
				fetch(CountryNameApi)
 	 			.then(response => response.json())
  				.then(data =>{
					//console.log(data.name);
    				const countryName = data[0].name.common;
    				console.log(countryName);
					const Country = document.getElementById('country_Check');
					Country.textContent = `${countryName}`;
				})
  				.catch(error => console.error(error));
			}

			img.src = `../src/${data.weather[0].icon}.png`;
			locationEl.textContent = `Localização: ${data.name}, ${data.sys.country}`;
			const weather = data.weather[0].main.toLowerCase();
			body.classList = '';
			body.classList.add(weather);
		})
		.catch(error => console.log('Error:', error));
});

locationBtn.addEventListener('click', () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const apiKey = 'SUA KEY AQUI';
			const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;

			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					locationEl.textContent = `Localização: ${data.name}, ${data.sys.country}`;
					temperatureEl.textContent = `Temperatura: ${data.main.temp}°C`;
					weatherEl.textContent = `Clima atual: ${data.weather[0].description}`;
					
					const state = data.sys.country;

					if(state == 'BR'){
						const CountryNameApi = `https://restcountries.com/v3.1/alpha/${state}`
						fetch(CountryNameApi)
						  .then(response => response.json())
						  .then(data =>{
							//console.log(data.name);
							const countryName = data[0].name.nativeName.por.common;
							console.log(countryName); // "Brazil"
							const Country = document.getElementById('country_Check');
							Country.textContent = `${countryName}`;
						})
						  .catch(error => console.error(error));
					}


					img.src = `C:/Users/ROBSON/Desktop/Weather/src/${data.weather[0].icon}.png`;

					const weather = data.weather[0].main.toLowerCase();
					body.classList = '';
					body.classList.add(weather);
				})
				.catch(error => console.log('Error:', error));
		});
	} else {
		alert('Geolocation is not supported by this browser.');
	}
});
