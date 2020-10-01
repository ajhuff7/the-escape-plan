$(document).ready(function () {


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



$("#search-button").on("click", function(event) {

    var cityName = $("#autocomplete-input").val();
    $(".cityName").text(cityName)
  

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=37574b1d6986c3e876db8a1d6e2f05dc";
    $.ajax({
        url: queryURL,
        type: "GET",
    })
  
    .then(function(response1) {
        // console.log(response);
        
    var temperature = response1.list[0].main.temp;
    console.log(temperature)

    $(".temp").text(temperature + " ℉")
    var twoCode = response1.city.country;


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


        $.ajax(setting).done(function (response2) {
        console.log(response2);

        var countryName = response2[0].name;
        var currency = response2[0].currencies[0];
        // var threeCode = response2[0].alpha3Code;
    
        $(".country").text(countryName)
        $(".currency").text(currency)


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

            $.ajax(settings1).done(function (response3) {
                console.log(response3)


                var rateIds = response3.response.rates;
                for (var i = 0; i < rateIds; i++) {
                    if (currency === rateIds[i])
                    
                    $(".rate").text(rateIds[i].val)

                    console.log(filteredArray)
                    console.log(conversion)
            }







            });

    });


    // var filteredArray = response3.response.filter(function(data) {
    //     return data.rates[i] === currency



    


            // var settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": "https://covid-193.p.rapidapi.com/statistics",
            //     "method": "GET",
            //     "headers": {
            //         "x-rapidapi-host": "covid-193.p.rapidapi.com",
            //         "x-rapidapi-key": "ec873783e1msh55d56faec5cd48cp12f531jsna93375db625f"
            //     }
            // }
            
            // $.ajax(settings).done(function (response) {

            // console.log(response);
            // var filteredArray = response.response.filter(function(data) {
            //    if (data.country === countryName)
            //     var covidDeaths = response.response[0][0].deaths.total
            //     var covidCases = response.response[0][0].case.total

            //            (covidName[i] === countryName) {
            //             $(".deaths").text(covidDeaths)
            //             $(".cases").text(covidCases)  


                        // })
            // console.log(filteredArray)
            //         }


    });

  });
})