$(document).on("submit", "#addForm", addDrink); //----on click to grab drink in create---
var add_form = $("#addForm")[0] //-----grab addform for reset at end of addDrink function

//  __                     _         ___
// / _\ ___  __ _ _ __ ___| |__     / _ \__ _  __ _  ___
// \ \ / _ \/ _` | '__/ __| '_ \   / /_)/ _` |/ _` |/ _ \
// _\ \  __/ (_| | | | (__| | | | / ___/ (_| | (_| |  __/
// \__/\___|\__,_|_|  \___|_| |_| \/    \__,_|\__, |\___|
//                                            |___/

//-------------------GET DRINK BY NAME-----------------------------------///

function searchDrink() {
  $("#drinksFound").empty();
  $("#resultTop").empty();
  var drinkToFind = $("#drinkName").val();
  console.log("searching for " + drinkToFind);
  $.ajax({
    method: "GET",
    url: "/api/" + drinkToFind,
  }).then(function(result) {
    if(result.length !==0){
    console.log(result);
    console.log("Returning " + result[0].drink_name);
    populateSearch(result);
  }else {
    console.log("nothing");
    noResult();
  }
  });
}

function searchByIngredient() {
  $("#drinksFound").empty();
  $("#resultTop").empty();
  var ingredient1 = $("#ingredient1").val();
  console.log("searching by ingredient: " + ingredient1);
  $.ajax({
    method: "GET",
    url: "/api/drinks/" + ingredient1,
  }).done(function(result) {
    if(result.length !==0){
    $(".randoDumpSearch").empty();
    $("#searchResultsArea").removeClass('hidden');
    console.log(result);
    console.log(result.length);
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
      var objTo = document.getElementById('drinksFound');
      var returnedDrink = document.createElement("li");
      returnedDrink.innerHTML = ('<p id="foundDrink" onClick=searchRecipe();>' + result[i].drink_name + '</p>');
      objTo.appendChild(returnedDrink);
    }
  }else{
    console.log("nothing");
    noResult();
  }

  });
}

var ingredient = 1;

function ingredientAdd() {
  if (ingredient < 5) {
    ingredient++;
    var objTo = document.getElementById('additionalIngredients');
    var newIngredientDiv = document.createElement("div");
    newIngredientDiv.setAttribute("id", "ingredient" + ingredient);
    newIngredientDiv.innerHTML = '<div class="col-offset-2"></div><div class="form-group"><label class="col-xs-2 control-label">Ingredient</label><div class="col-xs-8"><input type="text" class="form-control" id="ingredient' + ingredient + '" name=""ingredName"" value="" placeholder="Ingredient"></div><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="removeIngredient(' + ingredient + ');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></div></div></div>';
    objTo.appendChild(newIngredientDiv)
  }

}

function removeIngredient(rid) {
  $("#ingredient" + rid).remove();
  ingredient--;
}


//    __          _   __                     _         ___
//   /__\ __   __| | / _\ ___  __ _ _ __ ___| |__     / _ \__ _  __ _  ___
//  /_\| '_ \ / _` | \ \ / _ \/ _` | '__/ __| '_ \   / /_)/ _` |/ _` |/ _ \
// //__| | | | (_| | _\ \  __/ (_| | | | (__| | | | / ___/ (_| | (_| |  __/
// \__/|_| |_|\__,_| \__/\___|\__,_|_|  \___|_| |_| \/    \__,_|\__, |\___|
//                                                            |___/


//------Add ingredient field-----///
var ingred = 1;

function ingredient_field() {
  if (ingred < 5) {
    ingred++;
    var objTo = document.getElementById('ingredient_field');
    var added_ingredient = document.createElement("div");
    added_ingredient.setAttribute("id", "addedIng" + ingred);
    added_ingredient.innerHTML = '<div class="col-offset-2"></div><div class="form-group"><label class="col-xs-2 control-label">Ingredient</label><div class="col-xs-4"><input type="text" class="form-control" id="ingredName' + ingred + '" name="ingredName[]" value="" placeholder="Ingredient"></div><div class="col-xs-2"><input type="text" class="form-control" id="qty' + ingred + '" name="qty[]" value="" placeholder="amount"></div><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_ingredient_field(' + ingred + ');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></div></div></div>';

    objTo.appendChild(added_ingredient);
  }
}

function remove_ingredient_field(rid) {
  ingred--;
  $('#addedIng' + rid).remove();
}
//----------------end Add Ing----------------------------///


//--------------Post function to add to DB-----///
function addDrink(event) {
  console.log("Adding Drink");
  event.preventDefault();

  var drink = {
    drink_name: $('#drink_Name').val().trim(),
    added_by: $('#addedBy').val().trim(),
    ingredient_1: $('#ingredName').val().trim(),
    ing_qty_1: $('#qty').val().trim(),
    ingredient_2: $('#ingredName2').val() || null,
    ing_qty_2: $('#qty2').val() || 0,
    ingredient_3: $('#ingredName3').val() || null,
    ing_qty_3: $('#qty3').val() || 0,
    ingredient_4: $('#ingredName4').val() || null,
    ing_qty_4: $('#qty4').val() || 0,
    ingredient_5: $('#ingredName5').val() || null,
    ing_qty_5: $('#qty5').val() || 0,
    description: $('#description').val(),
  };

  $.post("/api/drinks", drink);
  console.log(drink);
  add_form.reset();
}
//-----------end Post function------------------///


//---------Random Drink generator----------------///

function randomDrink() {
  //console.log("random clicked");
  $("#randomImg").attr("class", "randoDump");
  $("#randomImg").attr("src", "");
  $(".randoDump").empty();
  $.ajax({
    method: "GET",
    url: "/api/random",
  }).then(function(random) {
    console.log("random Drink: " + random.drink_name);
    console.log(JSON.stringify(random));
    console.log(random.added_by);
    $("#randomName").html("Drink: " + random.drink_name);
    $("#randomAuthor").html("Added By: " + random.added_by);
    $("#randomTest").html("Test");
    $("#randoIngOne").html("Ingredient 1: " + random.ingredient_1);
    $("#randoQtyOne").html("Amount: " + random.ing_qty_1);
    if (random.ingredient_2 !== "" || null) {
      $("#randoIngTwo").html("Ingredient 2: " + random.ingredient_2);
    }
    if (random.ing_qty_2 !== 0 || null) {
      $("#randoQtyTwo").html("Amount: " + random.ing_qty_2);
    }
    if (random.ingredient_3 !== "" || null) {
      $("#randoIngThree").html("Ingredient 3: " + random.ingredient_3);
    }
    if (random.ing_qty_3 !== 0 || null) {
      $("#randoQtyThree").html("Amount: " + random.ing_qty_3);
    }
    if (random.ingredient_4 !== "" || null) {
      $("#randoIngFour").html("Ingredient 4: " + random.ingredient_4);
    }
    if (random.ing_qty_4 !== 0 || null) {
      $("#randoQtyFour").html("Amount: " + random.ing_qty_4);
    }
    if (random.ingredient_5 !== "" || random.ingredient_5) {
      $("#randoIngFive").html("Ingredient 5: " + random.ingredient_5);
    }
    if (random.ing_qty_5 !== 0 || null) {
      $("#randoQtyFive").html("Amount: " + random.ing_qty_5);
    }
    $("#randoDescription").html("Directions: " + random.description);
  });


}
//-------------------END RANDOM DRINK FUNCTION--------------------------///


//---Cocktail APi RANDOM---//

function callApi() {
  console.log("calling...http://www.thecocktaildb.com/api.php");
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    populateFields(response);
    //pushDrink(response); //----change db ing_qty from int to string to allow injection--//
  });
}

function randomVodka() {
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"
  var queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response);
    var randomNum = Math.floor(Math.random() * response.drinks.length);
    console.log(randomNum);
    console.log(response.drinks[randomNum].strDrink);
    $.ajax({
      url: queryURL2 + response.drinks[randomNum].strDrink,
      method: 'GET'
    }).done(function(response) {
      populateFields(response);
      //pushDrink(response);
    });
  });
}

function randomGin() {
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
  var queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response);
    var randomNum = Math.floor(Math.random() * response.drinks.length);
    console.log(randomNum);
    console.log(response.drinks[randomNum].strDrink);
    $.ajax({
      url: queryURL2 + response.drinks[randomNum].strDrink,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      populateFields(response);
      //pushDrink(response)
    });
  });
}

function randomWhiskey() {
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=whiskey"
  var queryURL2 = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response);
    var randomNum = Math.floor(Math.random() * response.drinks.length);
    console.log(randomNum);
    console.log(response.drinks[randomNum].strDrink);
    $.ajax({
      url: queryURL2 + response.drinks[randomNum].strDrink,
      method: 'GET'
    }).done(function(response) {
      populateFields(response);
      //pushDrink(response);
    });
  });
}


function populateSearch(result) {
  console.log(result);
  $("#searchResultsArea").removeClass('hidden');
  $(".randoDumpSearch").empty();
  $("#randomNameSearch").html("Drink Name: " + result[0].drink_name);
  $("#randoIngOneSearch").html("Ingredient 1: " + result[0].ingredient_1);
  $("#randoQtyOneSearch").html("Amount: " + result[0].ing_qty_1);
  if (result[0].ingredient_2 !== "" || null) {
    $("#randoIngTwoSearch").html("Ingredient 2: " + result[0].ingredient_2);
  }
  if (result[0].ing_qty_2 !== 0 || '\r' || " ") {
    $("#randoQtyTwoSearch").html("Amount: " + result[0].ing_qty_2);
  }
  if (result[0].ingredient_3 !== "" || null) {
    $("#randoIngThreeSearch").html("Ingredient 3: " + result[0].ingredient_3);
  }
  if (result[0].ing_qty_3 !== 0 || '\r' || " ") {
    $("#randoQtyThreeSearch").html("Amount: " + result[0].ing_qty_3);
  }
  if (result[0].ingredient_4 !== "" || null) {
    $("#randoIngFourSearch").html("Ingredient 4: " + result[0].ingredient_4);
  }
  if (result[0].ing_qty_4 !== 0 || '\r' || "") {
    $("#randoQtyFourSearch").html("Amount: " + result[0].ing_qty_4);
  }
  if (result[0].ingredient_5 !== "" || null) {
    $("#randoIngFiveSearch").html("Ingredient 2: " + result[0].ingredient_5);
  }
  if (result[0].ing_qty_5 !== 0 || '\r' || " ") {
    $("#randoQtyFiveSearch").html("Amount: " + result[0].ing_qty_5);
  }
  $("#randoDescriptionSearch").html("Directions: " + result[0].description);
}

function populateFields(response) {
  $(".randoDump").empty();
  $("#randomName").html("Drink Name: " + response.drinks[0].strDrink);
  var imageaddress = response.drinks[0].strDrinkThumb;
  $("#randomImg").attr("class", "randomImage");
  $("#randomImg").attr("src", imageaddress);
  $("#randoIngOne").html("Ingredient 1: " + response.drinks[0].strIngredient1);
  $("#randoQtyOne").html("Amount: " + response.drinks[0].strMeasure1);
  if (response.drinks[0].strIngredient2 !== "" || null) {
    $("#randoIngTwo").html("Ingredient 2: " + response.drinks[0].strIngredient2);
  }
  if (response.drinks[0].strMeasure2 !== 0 || '\u000D' || "") {
    $("#randoQtyTwo").html("Amount: " + response.drinks[0].strMeasure2);
  }
  if (response.drinks[0].strIngredient3 !== "" || null) {
    $("#randoIngThree").html("Ingredient 3: " + response.drinks[0].strIngredient3);
  }
  if (response.drinks[0].strMeasure3 !== 0 || '\u000D' || "") {
    $("#randoQtyThree").html("Amount: " + response.drinks[0].strMeasure3);
  }
  if (response.drinks[0].strIngredient4 !== "" || null) {
    $("#randoIngFour").html("Ingredient 4: " + response.drinks[0].strIngredient4);
  }
  if (response.drinks[0].strMeasure4 !== 0 || '\u000D' || "") {
    $("#randoQtyFour").html("Amount: " + response.drinks[0].strMeasure4);
  }
  if (response.drinks[0].strIngredient5 !== "" || null) {
    $("#randoIngFive").html("Ingredient 2: " + response.drinks[0].strIngredient5);
  }
  if (response.drinks[0].strMeasure5 !== 0 || '\u000D' || "") {
    $("#randoQtyFive").html("Amount: " + response.drinks[0].strMeasure5);
  }
  $("#randoDescription").html("Directions: " + response.drinks[0].strInstructions);
}


function searchRecipe() {
  $(".randoDumpSearch").empty();
  console.log("searching for recipe");
  $(".searchContainer").on('click', 'li', function() {
    var drinkToFind = $(this).text();
    console.log(drinkToFind);
    $.ajax({
      method: "GET",
      url: "/api/" + drinkToFind,
    }).then(function(result) {
      console.log(result);
      console.log("Searching for " + result[0].drink_name);
      populateSearch(result);
    });
  });
}

function drinkCount(){
  console.log("Counting...");
  $.ajax({
    method: "GET",
    url: "/api/count/"
  }).then(function(count) {
    console.log(count)
  });
}

function pushDrink(response) {
  var drink = {
    drink_name: response.drinks[0].strDrink,
    added_by: "drinkBot",
    ingredient_1: response.drinks[0].strIngredient1,
    ing_qty_1: response.drinks[0].strMeasure1,
    ingredient_2: response.drinks[0].strIngredient2 || null,
    ing_qty_2: response.drinks[0].strMeasure2 || 0 || '\r' || " ",
    ingredient_3: response.drinks[0].strIngredient3 || null,
    ing_qty_3: response.drinks[0].strMeasure3 || 0 || '\r' || " ",
    ingredient_4: response.drinks[0].strIngredient4 || null || '\r',
    ing_qty_4: response.drinks[0].strMeasure4 || 0 || '\r' || " ",
    ingredient_5: response.drinks[0].strIngredient5 || null || '\r',
    ing_qty_5: response.drinks[0].strMeasure5 || 0 || '\r' || " ",
    description: response.drinks[0].strInstructions,
  };

  $.post("/api/drinks", drink);
  console.log(drink);
}


function noResult(){
  $("#drinksFound").empty();
  $("#drinkName").empty();
  $("#searchResultsArea").removeClass('hidden');
  $(".randoDumpSearch").empty();
  $("#resultTop").html("Sorry, we couldn't find any drink matching that name...please try another drink/ingredient.");
}



function whiskeyTest(){
  var queryURL = "https://api.chucknorris.io/jokes/random"
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response.value);
  });
}

function totalById() {
    $.ajax({
    method: "GET",
    url: "/api/count",
  }).then(function(count) {
        console.log(count);
    $(".randoDumpSearch").empty();
    $("#archivedResultsArea").removeClass('hidden');
        console.log("total number of archived drinks: " + count);
        document.getElementById("aPlace").innerHTML = "Database contains " + count + " drink recipes as of: ";
        document.getElementById("bPlace").innerHTML = Date();
    });
}
