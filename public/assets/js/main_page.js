$(document).on("submit", "#addForm", addDrink);//----on click to grab drink in create---
var add_form = $("#addForm")[0]

//------Add ingredient field-----///
var ingred = 1;
function ingredient_field() {
  if (ingred < 5) {
    ingred++;
    var objTo = document.getElementById('ingredient_field');
    var added_ingredient = document.createElement("div");
    added_ingredient.setAttribute("id", "addedIng" + ingred);
    var rdiv = 'addedIng' + ingred;
    added_ingredient.innerHTML = '<div class="col-offset-2"></div><div class="form-group"><label class="col-xs-2 control-label">Ingredient</label><div class="col-xs-5"><input type="text" class="form-control" id="ingredName'+ ingred +'" name="ingredName[]" value="" placeholder="Ingredient"></div><div class="col-xs-2"><input type="text" class="form-control" id="qty'+ ingred +'" name="qty[]" value="" placeholder="quantity in oz"></div><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_ingredient_field(' + ingred + ');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></div></div></div>';

    objTo.appendChild(added_ingredient);
  }

}

function remove_ingredient_field(rid) {
  $('#addedIng' + rid).remove();
}
//----------------end Add Ing----------------------------///


//--------------Post function to add to DB-----///
function addDrink(event) {
  console.log("Adding Drink");
  event.preventDefault();

  var drink = {
     drink_name: $('#drinkName').val().trim(),
     added_by: $('#addedBy').val().trim(),
     ingredient_1: $('#ingredName').val().trim(),
     ing_qty_1: $('#qty').val().trim(),
     ingredient_2: $('#ingredName2').val() || null,
     ing_qty_2: $('#qty2').val() || 0,
     ingredient_3: $('#ingredName3').val() || null,
     ing_qty_3: $('#qty3').val() || 0,
     ingredient_4: $('#ingredName4').val() || null,
     ing_qty_4: $('#qty4').val() || 0,
     ingredient_5: $('#ingredName5').val()|| null,
     ing_qty_5: $('#qty5').val() || 0,
     description: $('#description').val(),
  };

  $.post("/api/drinks", drink);
  console.log(drink);
  add_form.reset();
}
//-----------end Post function------------------///
