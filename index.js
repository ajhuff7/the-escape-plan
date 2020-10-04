// Global variable


// Side Menu
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

// Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 6000
  });

// Scrollspy
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {});

// Material Boxed
const mb = document.querySelectorAll('.materialboxed');
M.Materialbox.init(mb, {});



// Functions
// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };





// Event Listeners
$("#search-button").on("click", function(event) {
    var cityName = $("#autocomplete-input").val()
    $(".cityName").text(cityName)
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=37574b1d6986c3e876db8a1d6e2f05dc";
    $.ajax({
        url: queryURL,
        type: "GET",
    })
    .then(function(response1) {
        console.log(response1);  
        var temperature = response1.list[0].main.temp
        var humid = response1.list[0].main.humidity
        console.log(temperature)

        $(".temp").text(temperature + " ℉")
        $(".humid").text(humid + " %")
        var twoCode = response1.city.country


        var setting = {
            "async": true,
            "crossDomain": true,
            "url": "https://restcountries-v1.p.rapidapi.com/alpha/?codes=" + twoCode,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "ec873783e1msh55d56faec5cd48cp12f531jsna93375db625f"
            }
        }
        $.ajax(setting)
        .done(function (response2) {
            // console.log(response2);

            var countryName = response2[0].name;
            var currency = response2[0].currencies[0];
            var population = response2[0].population;
        
            $(".country").text(countryName)
            $(".currency").text(currency)
            $(".pop").text(population)

            var settings1 = {
                "async": true,
                "crossDomain": true,
                "url": "https://currencyscoop.p.rapidapi.com/latest",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "currencyscoop.p.rapidapi.com",
                    "x-rapidapi-key": "ec873783e1msh55d56faec5cd48cp12f531jsna93375db625f"
                }
            }

            $.ajax(settings1)
            .done(function (response3) {
                // console.log(response3);
                var rateIds = response3.response.rates
                var selectedRate = (rateIds [`` + currency]);
                $(".rate").text(selectedRate); 


                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://covid-193.p.rapidapi.com/statistics",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                        "x-rapidapi-key": "ec873783e1msh55d56faec5cd48cp12f531jsna93375db625f"
                    }
                }

                $.ajax(settings)
                .done(function (response4) {
                    console.log({response4});
                    var filteredArray = response4.response.filter(function(data) {
                    
                    return data.country === countryName
                    
                    });
                    console.log({filteredArray})
                 
                    $(".deaths").text(filteredArray[0].deaths.total)
                    $(".cases").text(filteredArray[0].cases.total)
            });


        });

    });

})

})


// Entry Point
$(document).ready(function () {

    // // set date and time 
// $("#dayTime").text(moment().format('MMMM Do YYYY, hh:mm:ss a'));

// // make function to run hh:mm:ss on clock
// let updateTime = function () {
//     let currentTime = moment().format('MMMM Do YYYY, hh:mm:ss a')
//     $("#dayTime").text(currentTime)
// }
// // call the function to run...
// updateTime();

// // This will keep the clock running...
// setInterval(updateTime, 1000);

})