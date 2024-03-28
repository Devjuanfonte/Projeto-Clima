var apiKey = "84f533dc95796afa3dd8931698c1bdc5"; // chave de acesso da API OpenWeather
var unsplashApiKey = "43ajNtqw8OiHxpjL-Yx-TvdBmcV9g90MgfoB_mUKZ10" // chave da API Unplash

function catchData() {
    var cityInput = document.querySelector('.cidade');
    let city = cityInput.value.trim(); // recebendo o valor do input digitado no HTML (removendo espaços em branco extras)
    let cityActual = document.querySelector('.actual');

    if(city !== ''){  // Checar se o usuário digitou o nome da cidade
        cityActual.innerHTML = city.toUpperCase();    

        var openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=${apiKey}`; // URL de acesso a API do OpenWeather, incluindo o idioma em português
        var unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`; // URL de acesso a API do Unsplash para buscar uma foto da cidade

        fetch(openWeatherUrl) // Requisição para a API do OpenWeather
            .then(function(response) {
                if (!response.ok) { // fazendo uma verificação de ok da requisição feita à API
                    throw new Error('Cidade não encontrada');
                }
                return response.json();
            })
            .then(function(data) {   // tratando os dados do OpenWeatherMap
                var temperaturaCelsius = Math.round(data.main.temp - 273.15); // Convertendo a temperatura de Kelvin para Celsius           
                var velocidadeVentoKmH = Math.round(data.wind.speed * 3.6);  // Convertendo a velocidade do vento de metros por segundo para km/h
                var tempo = data.weather[0].description; // Descrição do tempo

                let tempInfo = document.querySelector('.temp'); // Selecionando o elemento HTML para exibir a temperatura
                let windInfo = document.querySelector('.wind'); // Selecionando o elemento HTML para exibir a velocidade do vento
                let tempoInfo = document.querySelector('.sky'); // Selecionando o elemento HTML para exibir a descrição do tempo
                let photoContainer = document.querySelector('.photo'); // Selecionando o elemento HTML que conterá a foto

                tempInfo.innerHTML = `Temperatura: ${temperaturaCelsius}°C`;
                windInfo.innerHTML = `Vento: ${velocidadeVentoKmH} km/H`;
                tempoInfo.innerHTML = tempo;

                // Após obter os dados do OpenWeatherMap, vamos buscar uma foto da cidade usando a API do Unsplash
                fetch(unsplashUrl) // Requisição para a API do Unsplash
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) { // Tratando os dados do Unsplash
                        if (data.results.length > 0) { // Verificando se há resultados de fotos
                            var photoUrl = data.results[0].urls.regular; // URL da foto
                            photoContainer.style.backgroundImage = `url(${photoUrl})`; // Define o fundo da div como a URL da foto
                            photoContainer.style.display = 'block'; // Exibe a div da foto
                        } else {
                            console.log('Foto da cidade não encontrada.');
                        }
                    })
                    .catch(function(error) {
                        console.error('Erro ao obter foto da cidade do Unsplash:', error);
                    });
            })
            .catch(function(error) {
                console.error('Erro ao obter dados do OpenWeatherMap:', error);
            });
    } else{
        alert('Digite o nome da cidade');
    }    
}
