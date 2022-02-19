class Forecast {
    constructor() {
        this.key = 'UoOmutaK4In6lK7eWJUr59iIWW1TbiNO';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {
            cityDets,
            weather
        }
    }
    // get City information;
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const responce = await fetch(this.cityURI + query);
        const data = await responce.json();
        return data[0];
    }
    // get Weather information;
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const responce = await fetch(this.weatherURI + query);
        const data = await responce.json();
        return data[0];
    }
}