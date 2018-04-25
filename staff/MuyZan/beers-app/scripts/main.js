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

  //list.innerHTML = '';
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
            showInfo(beerInfo);
          });
    })
  });


}






function showInfo(beerInfo) {

    beerDescription.appendChild(document.createTextNode(beerInfo.description));

    document.body.appendChild(beerDescription);
 
    console.log(beerInfo.description)
  
}
