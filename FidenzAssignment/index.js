
//Extract citi id's from json file
//Here "cityCodesArrayNew" can't access from out of the fetchDataAndProcess function.I will fix it soon.
/*
async function fetchDataAndProcess() {
  try {
    const response = await fetch('cities.json');
    const data = await response.json();
    
    const cityCodesArrayN = data.List.map(item => item.CityCode);
    return cityCodesArrayN;
    
  } 
  
  catch (error) {
    console.error('Error loading JSON file:', error);
  }
}

let cityCodesArrayNew = fetchDataAndProcess();
console.log(cityCodesArrayNew);
console.log(cityCodesArrayNew[3]);//Not defined ???
*/


//I manually declared cityCodesArray array
cityCodesArray =["1248991","1850147","2644210","2988507","2147714"];
const myApikey = "1bb70157ec0778085eff492d79e4d298"; //My API key
  
let linksRequest = [];// Create array of API request links
for (let i = 0; i < cityCodesArray.length; i++) {

  var requestApi1 = "http://api.openweathermap.org/data/2.5/group?id=";
  var requestApi2 = cityCodesArray[i] + "&units=metric&appid=";
  var requestApi3 = myApikey;
  var requestApi  = requestApi1 + requestApi2 + requestApi3;
  linksRequest.push(requestApi);

}


//console.log(linksRequest);

//This function for to get time and date to corrosponding timestamp.
//This function need more develop to get exactly output.I am trying to it.
function getTimeDate(timestamp) {

        let date = new Date(timestamp*1000);
        let hours= date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let amAndpm = hours >= 12 && seconds > 0 ? "pm" : "am" ;
        let timeAndDate = { month: 'short', day: 'numeric' };
        let clock = hours + "." + minutes + amAndpm +",";
        let formattedDate = new Intl.DateTimeFormat('en-US', timeAndDate).format(date);
        //console.log("function ok");
        return clock+formattedDate;
  
}

//This function for get whether states.
function weatherStatus(wheatherDis,wheatherIcon){

  let wordsWheather=wheatherDis.split(" ");
  //console.log(wordsWheather);
  let wheatherDisNew = "";

  for(let i =0 ; i < wordsWheather.length ; i++ ){

      let firstLetter = wordsWheather[i].charAt(0);
      let firstLetterCap = firstLetter.toUpperCase();
      let remainingLetters = wordsWheather[i].slice(1);
      let capitalizedWord = firstLetterCap + remainingLetters;
      wheatherDisNew += capitalizedWord;
      wheatherDisNew += " ";
  }
  //To above for loop code for get "wheatherDis" with capitalize form.
  

    if(wheatherDis === "clear sky"){   
         wheatherIcon.src = "./icons/clear_sky.png";
         return wheatherDisNew;
    }
    else if(wheatherDis === "light rain"){   
         wheatherIcon.src = "./icons/light_rain.png";
         return wheatherDisNew;
    }
    if(wheatherDis === "few clouds"){   
         wheatherIcon.src = "./icons/few_cloud.png";
         return wheatherDisNew;
    }
    if(wheatherDis === "mist"){   
         wheatherIcon.src = "./icons/mist.png";
         return wheatherDisNew;
    }
    if(wheatherDis === "broken clouds"){   
         wheatherIcon.src = "./icons/broken_cloud.png";
         return wheatherDisNew;
    }
    else{   
         wheatherIcon.src = "./icons/default_wheather.png";
         return wheatherDisNew;
    }


}

async function checkWeather1(){
        let responseWhether = await fetch(linksRequest[0]);
        let dataObject = await responseWhether.json();
        console.log(dataObject);
        console.log(dataObject.list[0].name);
        console.log(dataObject.list[0].main.temp);
        console.log(dataObject.list[0].sys.country);
        console.log(dataObject.list[0].dt);
        console.log(dataObject.list[0].weather[0].description);
        document.querySelector(".location_1").innerHTML= dataObject.list[0].name+","+dataObject.list[0].sys.country;   
        document.querySelector(".mainTemp_1").innerHTML= Math.round(dataObject.list[0].main.temp)+ '&deg;'+ 'C';  
        let timestamp =  dataObject.list[0].dt;
        document.querySelector(".date_1").innerHTML= getTimeDate(timestamp);
        let wheatherIcon = document.querySelector(".wheather_icon1");
        let wheatherDis = dataObject.list[0].weather[0].description;
        document.querySelector(".climate_1").innerHTML = weatherStatus(wheatherDis,wheatherIcon);
        
  }
async function checkWeather2(){
        let responseWhether = await fetch(linksRequest[1]);
        let dataObject = await responseWhether.json();
        console.log(dataObject.list[0].name);
        console.log(dataObject.list[0].main.temp);
        console.log(dataObject.list[0].sys.country);
        console.log(dataObject.list[0].dt);
        document.querySelector(".location_2").innerHTML= dataObject.list[0].name+","+dataObject.list[0].sys.country;  
        document.querySelector(".mainTemp_2").innerHTML= Math.round(dataObject.list[0].main.temp)+ '&deg;'+ 'C'; 
        let timestamp =  dataObject.list[0].dt;
        //console.log(timestamp);
        document.querySelector(".date_2").innerHTML= getTimeDate(timestamp);
        let wheatherIcon = document.querySelector(".wheather_icon2");
        let wheatherDis = dataObject.list[0].weather[0].description;
        document.querySelector(".climate_2").innerHTML = weatherStatus(wheatherDis,wheatherIcon);  
  }
async function checkWeather3(){
        let responseWhether = await fetch(linksRequest[2]);
        let dataObject = await responseWhether.json();
        console.log(dataObject.list[0].name);
        document.querySelector(".location_3").innerHTML= dataObject.list[0].name+","+dataObject.list[0].sys.country; 
        document.querySelector(".mainTemp_3").innerHTML= Math.round(dataObject.list[0].main.temp)+ '&deg;'+ 'C'; 
        let timestamp =  dataObject.list[0].dt;
        document.querySelector(".date_3").innerHTML= getTimeDate(timestamp);   
        let wheatherIcon = document.querySelector(".wheather_icon3");
        let wheatherDis = dataObject.list[0].weather[0].description;
        document.querySelector(".climate_3").innerHTML = weatherStatus(wheatherDis,wheatherIcon);
  }
async function checkWeather4(){
        let responseWhether = await fetch(linksRequest[3]);
        let dataObject = await responseWhether.json();
        console.log(dataObject.list[0].name);
        document.querySelector(".location_4").innerHTML= dataObject.list[0].name+","+dataObject.list[0].sys.country; 
        document.querySelector(".mainTemp_4").innerHTML= Math.round(dataObject.list[0].main.temp)+ '&deg;'+ 'C';    
        let timestamp =  dataObject.list[0].dt;
        document.querySelector(".date_4").innerHTML= getTimeDate(timestamp);
        let wheatherIcon = document.querySelector(".wheather_icon4");
        let wheatherDis = dataObject.list[0].weather[0].description;
        document.querySelector(".climate_4").innerHTML = weatherStatus(wheatherDis,wheatherIcon);
  }
async function checkWeather5(){
        let responseWhether = await fetch(linksRequest[4]);
        let dataObject = await responseWhether.json();
        console.log(dataObject.list[0].name);
        document.querySelector(".location_5").innerHTML= dataObject.list[0].name+","+dataObject.list[0].sys.country;    
        document.querySelector(".mainTemp_5").innerHTML= Math.round(dataObject.list[0].main.temp)+ '&deg;'+ 'C'; 
        let timestamp =  dataObject.list[0].dt;
        document.querySelector(".date_5").innerHTML= getTimeDate(timestamp);
        let wheatherIcon = document.querySelector(".wheather_icon5");
        let wheatherDis = dataObject.list[0].weather[0].description;
        document.querySelector(".climate_5").innerHTML = weatherStatus(wheatherDis,wheatherIcon);
  }


checkWeather1();
checkWeather2();
checkWeather3();
checkWeather4();
checkWeather5();



//document.getElementById("testmain").textContent = dataObject2.name;



