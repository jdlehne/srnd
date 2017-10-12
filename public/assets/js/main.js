$(document).on("submit", "#addForm", addDrink); //----on click to grab drink in create---
var add_form = $("#addForm")[0] //-----grab addform for reset at end of addDrink function

$(document).on("click", "#randomBtn", randomDrink);


//  __                     _         ___
// / _\ ___  __ _ _ __ ___| |__     / _ \__ _  __ _  ___
// \ \ / _ \/ _` | '__/ __| '_ \   / /_)/ _` |/ _` |/ _ \
// _\ \  __/ (_| | | | (__| | | | / ___/ (_| | (_| |  __/
// \__/\___|\__,_|_|  \___|_| |_| \/    \__,_|\__, |\___|
//                                            |___/

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
    added_ingredient.innerHTML = '<div class="col-offset-2"></div><div class="form-group"><label class="col-xs-2 control-label">Ingredient</label><div class="col-xs-5"><input type="text" class="form-control" id="ingredName' + ingred + '" name="ingredName[]" value="" placeholder="Ingredient"></div><div class="col-xs-2"><input type="text" class="form-control" id="qty' + ingred + '" name="qty[]" value="" placeholder="quantity in oz"></div><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_ingredient_field(' + ingred + ');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></div></div></div>';

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
  }).then(function (random) {
    console.log("random Drink: " + random.drink_name);
    console.log(JSON.stringify(random));
    $("#randomName").html("Drink: " + random.drink_name);
    $("#randomAuthor").html("Added By: " + random.added_by);
    $("#randoIngOne").html("Ingredient 1: " + random.ingredient_1);
    $("#randoQtyOne").html("Quantity in (oz): " + random.ing_qty_1);
    if (random.ingredient_2 !== "" || null) {
      $("#randoIngTwo").html("Ingredient 2: " + random.ingredient_2);
    }
    if (random.ing_qty_2 !== 0 || null) {
      $("#randoQtyTwo").html("Quantity in (oz): " + random.ing_qty_2);
    }
    if (random.ingredient_3 !== "" || null) {
      $("#randoIngThree").html("Ingredient 3: " + random.ingredient_3);
    }
    if (random.ing_qty_3 !== 0 || null) {
      $("#randoQtyThree").html("Quantity in (oz): " + random.ing_qty_3);
    }
    if (random.ingredient_4 !== "" || null) {
      $("#randoIngFour").html("Ingredient 4: " + random.ingredient_4);
    }
    if (random.ing_qty_4 !== 0 || null) {
      $("#randoQtyFour").html("Quantity in (oz): " + random.ing_qty_4);
    }
    if (random.ingredient_5 !== "" || random.ingredient_5) {
      $("#randoIngFive").html("Ingredient 5: " + random.ingredient_5);
    }
    if (random.ing_qty_5 !== 0 || null) {
      $("#randoQtyFive").html("Quantity in (oz): " + random.ing_qty_5);
    }
    $("#randoDescription").html("Directions: " + random.description);
  });


}
//-------------------END RANDOM DRINK FUNCTION--------------------------///

//-------------------GET DRINK BY NAME-----------------------------------///

function searchDrink() {
  var drinkToFind = $("#drinkName").val();
  var ingredient1 = $("#ingredient1").val();
  console.log("searching for " + drinkToFind);
  console.log("ingredient to be included: " + ingredient1);
  $.ajax({
    method: "GET",
    url: "/api/" + drinkToFind,
  }).then(function (result) {
    console.log(JSON.stringify(result));
    console.log(result[0].drink_name);
    $("#searchResultsArea").removeClass('hidden');
    $("#searchResults").html("Drink Name: " + result[0].drink_name + "<br>Drink Ingredient: " + result[0].ingredient_1 + "<br>Drink Ingredient: " + result[0].ingredient_2 + "<br>Drink Ingredient: " + result[0].ingredient_3 + "<br>Drink Ingredient: " + result[0].ingredient_4 + "<br>Drink Ingredient: " + result[0].ingredient_5 + "<br>Drink Added By: " + result[0].added_by + "<br>Description: " + result[0].description);

  });


}

//---Cocktail APi TEST----//

function callApi() {
  console.log("calling...http://www.thecocktaildb.com/api.php");
  //var itemTofind;
  //var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + itemTofind;
  //var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=manhattan"
  //var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  //var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/all"

  //RANDOM//
  var queryURL = "http://www.thecocktaildb.com/api/json/v1/1/random.php"

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    //  console.log(response);
    $(".randoDump").empty();
    $("#randomName").html("Drink Name: " + response.drinks[0].strDrink);
    var imageaddress = response.drinks[0].strDrinkThumb;
    $("#randomImg").attr("class", "randomImage");
    $("#randomImg").attr("src", imageaddress);
    $("#randoIngOne").html("Ingredient 1: " + response.drinks[0].strIngredient1);
    $("#randoQtyOne").html("Quantity in (oz): " + response.drinks[0].strMeasure1);
    if (response.drinks[0].strIngredient2 !== "" || null) {
      $("#randoIngTwo").html("Ingredient 2: " + response.drinks[0].strIngredient2);
    }
    if (response.drinks[0].strMeasure2 !== "" || null) {
      $("#randoQtyTwo").html("Quantity in (oz): " + response.drinks[0].strMeasure2);
    }
    if (response.drinks[0].strIngredient3 !== "" || null) {
      $("#randoIngThree").html("Ingredient 3: " + response.drinks[0].strIngredient3);
    }
    if (response.drinks[0].strMeasure3 !== "" || null) {
      $("#randoQtyThree").html("Quantity in (oz): " + response.drinks[0].strMeasure3);
    }
    if (response.drinks[0].strIngredient4 !== "" || null) {
      $("#randoIngFour").html("Ingredient 4: " + response.drinks[0].strIngredient4);
    }
    if (response.drinks[0].strMeasure4 !== "" || null) {
      $("#randoQtyFour").html("Quantity in (oz): " + response.drinks[0].strMeasure4);
    }
    if (response.drinks[0].strIngredient5 !== "" || null) {
      $("#randoIngFive").html("Ingredient 2: " + response.drinks[0].strIngredient5);
    }
    if (response.drinks[0].strMeasure5 !== "" || null) {
      $("#randoQtyFive").html("Quantity in (oz): " + response.drinks[0].strMeasure5);
    }
    $("#randoDescription").html("Directions: " + response.drinks[0].strInstructions);

    var drink = {
      drink_name: response.drinks[0].strDrink,
      added_by: "drinkBot",
      ingredient_1: response.drinks[0].strIngredient1,
      ing_qty_1: response.drinks[0].strMeasure1,
      ingredient_2: response.drinks[0].strIngredient2 || null,
      ing_qty_2: response.drinks[0].strMeasure2 || 0,
      ingredient_3: response.drinks[0].strIngredient3 ||null,
      ing_qty_3: response.drinks[0].strMeasure3 || 0,
      ingredient_4: response.drinks[0].strIngredient4 || null,
      ing_qty_4: response.drinks[0].strMeasure4 || 0,
      ingredient_5: response.drinks[0].strIngredient5 || null,
      ing_qty_5: response.drinks[0].strMeasure5 || 0,
      description: response.drinks[0].strInstructions,
    };

    //$.post("/api/drinks", drink);//----change db ing_qty from int to string to allow injection--//
    console.log(drink);

  });
}
