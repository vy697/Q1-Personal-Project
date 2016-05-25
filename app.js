'use strict';

//everytime user clicks button, input(location, keyword) is sent to server and div is created with the
//returned info first just general info: photo, name of restaurant

//"#result" div to append results onto
var html_result_container = document.querySelector('#results');
var button = document.querySelector('.btn');
var searchAgain = document.querySelector('#newSearch');
var userInput1 = document.querySelector('#search-by-city');
var requestedInfo;

//request for results when button is clicked
button.addEventListener('click', getRestaurants);

//take user location input
function getRestaurants(){
  var userCityAndZip = userInput1.value;
  if (isNaN(userCityAndZip)){
    var myURL = 'https://api.locu.com/v1_0/venue/search/?locality=';
      } else {
    var myURL = 'https://api.locu.com/v1_0/venue/search/?postal_code=';
  }
  var proxyUrl = 'http://jsonp.afeld.me/?url=';
  var apiKey = '&api_key=2f1a3ad3a4d301a970b151d4cc15107c1ed23648';
  myURL += userCityAndZip + apiKey;
//encode myURL with encodeURIComponent() bc it is the query that you are sending to jsonp site to hack for you
  var finalUrl = proxyUrl + encodeURIComponent(myURL);
  ajax("GET", finalUrl, generateResults);
}

function ajax(verb,url,handler){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === 4 && request.status === 200){
      handler(null, JSON.parse(request.responseText))
      } else {
        handler(request.status, null);
  }
}
  request.open(verb,url);
  request.send();
}

//here is the handler
function generateResults(err,data){
  console.log(err);
  if(!err && err !== 0){
    console.log(data);
    var newSearch = document.createElement('a');
    //TODO: change this to landing page when app is deployed!!
    newSearch.href = 'http://localhost:8080/';
    newSearch.innerHTML = 'New Search';
    newSearch.style.color = 'black';
    newSearch.style.fontFamily = 'Clicker Script';
    newSearch.style.fontSize = '2em';
    searchAgain.appendChild(newSearch);
    console.log(newSearch);
    console.log("in generateResults")
    // var newSearch = document.createElement('input');
    // this is created everytime a request for info is sent(everytime button is clicked
      //TODO loop to go through items and print out the names of restaurants from the object that we get back
    var restaurantArr = data['objects'];
    for(var x = 0; x < restaurantArr.length; x++){
      var categoryArr = restaurantArr[x]['categories'];
      var restaurantList = restaurantArr[x]['name'];
      var restaurantURL = restaurantArr[x]['website_url'];
      var restaurantAddress = restaurantArr[x]['street_address'];
      var region = restaurantArr[x]['region'];
      var postalCode = restaurantArr[x]['postal_code']
      var contact = restaurantArr[x]['phone'];

        if(categoryArr.includes('restaurant')){
        var result_container_1 = document.createElement('div');
        result_container_1.style.border = '1px solid grey';
        result_container_1.style.height = 'auto';
        result_container_1.style.width = 'auto';
        var textBox = document.createElement('div');
        result_container_1.appendChild(textBox);
        textBox.style.height = 'auto';
        textBox.style.width = 'auto';
        textBox.style.display = 'inline-block';
        textBox.style.position = 'relative';
        //generate restaurante name
        var restaurantName = document.createElement('h2');
        restaurantName.innerHTML = restaurantList;
        restaurantName.style.fontFamily = 'Quicksand';
        textBox.appendChild(restaurantName);
        //make url
        var website_url = document.createElement('a');
        website_url.href = restaurantURL;
        website_url.innerHTML = restaurantURL;
        website_url.style.color = 'pink';
        website_url.style.fontSize = '2em';
        website_url.style.fontFamily = 'EB Garamond';
        website_url.style.display = 'block';
        textBox.appendChild(website_url);
        //restaurant address linked to googlemaps
        var address = document.createElement('a');
        address.href = mapLink;
        //define completeAddressURL
        var completeAddress = restaurantAddress + ' ' + postalCode + ' ' + region;
        address.innerHTML = completeAddress;
        address.style.fontFamily = 'Quicksand';
        address.style.fontSize = '1.5em';
        address.style.color = 'black';
        var mapURL = 'http://maps.google.com/maps?q=';
        var mapLink = mapURL + encodeURIComponent(completeAddress);



        textBox.appendChild(address);


        //phone
        var phone = document.createElement('h3');
        phone.innerHTML = contact;
        phone.style.fontFamily = 'EB Garamond';
        textBox.appendChild(phone);

        html_result_container.appendChild(result_container_1);
       }
      }
    }
  }



// //   //TODO: append rest of elements onto result
// //   //TODO: populate div with results
// //   // var restaurant_img = document.createElement('img');
// //   // result_container_1.appendChild(restaurant_img);
// //
// //
// };
