var city = localStorage.getItem(localStorage.length);
weatherUpdate()
var i = 0;

$("#searchBut").on("click", function () {
    city = $("#cityInput").val()
    weatherUpdate ()
    
    // var playerName = getName.val()
    // nameOrder == 0 ? nameOrder +=1 : nameOrder +=2; 
    // scoreOrder += 2
    // console.log(nameOrder)
    // console.log(scoreOrder)
    // localStorage.setItem (nameOrder,playerName)
    // localStorage.setItem (scoreOrder,score)
    // scoreboardLoad()
    // score = 0;
    
    localStorage.setItem(i+1, city)
    var cityBut =  localStorage.getItem (i+1)
    cityBut = $("<button class = 'cityBut list-group-item list-group-item-action' >" + city + "</button>")  .on("click", function () {
        city = $(this).text()
        weatherUpdate ()
    })
    $("#searchHty").append (cityBut).css("width","100%")
})
function weatherUpdate () {
    $(".dayCard").remove()

    var todayAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=62a27c25912cca94b3ca4f5f5f16b409";
    var locationAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=62a27c25912cca94b3ca4f5f5f16b409";


    // Get today's conditions
    $.ajax({
        url:todayAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var todayTemp = (response.main.temp - 273.15).toFixed(1);                       
        var humidity = 60;
        var wind = (response.wind.speed * 1.60934).toFixed(1);
        var icon = (response.weather[0].icon);
        $("#cityName").text(city)
        $("#todayDate").text("(" +moment().format('DD/MM/YYYY')+ ")")
        $("#todayIcon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        $("#temperature").text("TemperatureL: " + todayTemp + "°C")
        $("#humidity").text("Humidity: " + humidity + "%")
        $("#windSpeed").text("Wind Speed: " + wind + "km/h")
        
        })

    // Get coordinates and UVI
    $.ajax({
        url:locationAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        lat = response[0].lat
        lon = response[0].lon
        var todayUVI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=metric&appid=62a27c25912cca94b3ca4f5f5f16b409"
        $.ajax({
            url:todayUVI,
            method: "GET"
        }).then(function(response) {
            $("#UVIndex").text("UV Index: ")
            var uvi = $("#uv").text(response.current.uvi)
            if (response.current.uvi < 2 )  {
                $(uvi).css("background","green")
            } else if (response.current.uvi < 5) {
                $(uvi).css("background","yellow")
            }else if  (response.current.uvi < 7) {
                $(uv).css("background","orange")
            } else if  (response.current.uvi < 10) {
                $(uv).css("background","red")
            } else {
                $(uv).css("background","rgb(191, 116, 206)")
            }

            console.log(response)
            for (var i=1; i<6; i++) { 

                var date = moment().add(i, 'days').format('DD/MM/YYYY');
                var iconText = response.daily[i].weather[0].icon;
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + iconText + "@2x.png")
                var temp = response.daily[i].temp.day;
                console.log(temp);
                var hmdy = response.daily[i].humidity;
                var dayCard = $("<span>").css({"border":"solid","border-color": "aliceblue"}).addClass("dayCard")
            $(dayCard).append(date)
            $(dayCard).append(icon)
            $(dayCard).append("<div>Temperature: " + temp + "°C</div>").css({"display": "block", "margin": "1%", "padding": "1%", "background": "rgb(199, 208, 223)"})
            $(dayCard).append("<div>Humidity: " + hmdy + "%</div>")
            $("#weather5Days").append(dayCard);
                response.daily[i]  
            }
        })
    })
}
