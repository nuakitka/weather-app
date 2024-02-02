const apiKey = "e1c90ce5a917423387d192805240102"



// // http://api.weatherapi.com/v1/current.json?key=e1c90ce5a917423387d192805240102&q=London

const query = 'http://api.weatherapi.com/v1/current.json?key=${e1c90ce5a917423387d192805240102}&q=London';
// fetch(query).then((Response) => {
//     return Response.json()
// }).then((data)=>{
//     console.log(data);
// })
// получаем название города
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector(".header")
let city;

// слушаем отправку формы
form.onsubmit = function (e){
    
    // Отменяем отправку формы
    e.preventDefault();
    // Берем значения из инпута, обрезаем пробелы
    city = input.value.trim();

    // делаем запрос на сервер для получения погоды
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((Response) => {
            return Response.json()
        })
        .then((data)=> {

            if (data.error) {
                    // Если есть ошибка выводим ее

                const prevCard = document.querySelector(".card");
                if (prevCard) prevCard.remove();
                
                
                const html = `<div class = "card">${data.error.message}</div>`;
               
                
                header.insertAdjacentHTML("afterend",html);

            }else{
                
        
            console.log(data);
            console.log(data.location.name);
            console.log(data.location.country);
            console.log(data.current.temp_c);
            console.log(data.current.condition.text)
            
            const prevCard = document.querySelector(".card");
            if (prevCard) prevCard.remove();

            //отображаем полученные данные в карточке
            const html = `<div class="card">
    
                            <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
                        
                            
                            <div class = "card-weather">
                                <h2 class ="card-value">${data.current.temp_c}°с</h3>
                                <img width="188" height="188" src="static/images/2682834_cloud_day_forecast_rain_rainy_icon.png"/>
                            
                            </div>
                            <div>
                                <div class="card-description">${data.current.condition.text}</div>
                            </div>
                        </div>`;
            // Отображаем карточку на странице
            header.insertAdjacentHTML("afterend", html)
            }
        });
}