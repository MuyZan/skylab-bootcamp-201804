"use strict";

document.forms[0].addEventListener("submit", function(e) {
  e.preventDefault();

  var input = this.elements[0];

  var query = input.value;

  logic.searchBeers(query, function(beers) {
    listBeers(beers);
  });

  input.value = "";
});

var list;
var beerDescription;

function listBeers(beers) {
  if (!list) {
    list = document.createElement("ul");

    document.body.appendChild(list);
  }

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  beers.forEach(function(beer) {
    var item = document.createElement("li");

    item.appendChild(document.createTextNode(beer.name));

    list.appendChild(item);

    var id = beer.id;

    item.addEventListener("click", function(){
        logic.getBeerInfo(id, function(beerInfo) {
            
          

          if(beerDescription){
            beerDescription.innerHTML="";
          }
            showInfo(beerInfo);
          });
    })
  });


}






function showInfo(beerInfo) {

  beerDescription = document.createElement("section");

  var description = document.createElement("p");

    var img = document.createElement("img")
    img.src = beerInfo.labels.medium;

    description.appendChild(document.createTextNode(beerInfo.description || "Sorry, no info :_("));

    beerDescription.appendChild(description);
    document.body.appendChild(beerDescription);
    beerDescription.appendChild(img);

 
    console.log(beerInfo.description)
  
}
