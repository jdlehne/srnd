
$(document).on("submit", "#addForm", addDrink); //----on click to grab drink in create---
var add_form = $("#addForm")[0] //-----grab addform for reset at end of addDrink function

$(document).on("click", "#randomBtn", randomDrink);

var ingredient = 0;

function ingredientAdd() {

    ingredient++;
    var objTo = document.getElementById('additionalIngredients');
    var newIngredientDiv = document.createElement("div");
    // newIngredientDiv.setAttribute("class", "form-group");
    newIngredientDiv.setAttribute("id", "ingredient" + ingredient);
    var rdiv = 'ingredient' + ingredient;
    newIngredientDiv.innerHTML = '<div class="form-group"><input type="text" class="form-control" placeholder="Ingredient"></div><button class="btn btn-danger" type="button" onclick="removeIngredient(' + ingredient + ');"><span class="fa fa-minus" aria-hidden="true"> Remove Ingredient</span></button><br><br><div class="clear"></div';

    objTo.appendChild(newIngredientDiv)

}

function removeIngredient(rid) {
    $('#ingredient' + rid).remove();
}


//------Add ingredient field-----///
var ingred = 1;

function ingredient_field() {
  if (ingred < 5) {
    ingred++;
    var objTo = document.getElementById('ingredient_field');
    var added_ingredient = document.createElement("div");
    added_ingredient.setAttribute("id", "addedIng" + ingred);
    var rdiv = 'addedIng' + ingred;
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
  console.log("random clicked");
  //$("#randoIngTwo").empty();

    $.ajax({
      method: "GET",
      url: "/api/random",
    }).then(function(random) {
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