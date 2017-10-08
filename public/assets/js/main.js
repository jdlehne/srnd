var ingredient = 1;

function ingredientAdd() {

    ingredient++;
    var objTo = document.getElementById('additionalIngredients');
    var newIngredientDiv = document.createElement("div");
    // newIngredientDiv.setAttribute("class", "form-group");
    newIngredientDiv.setAttribute("id", "ingredient" + ingredient);
    var rdiv = 'ingredient' + ingredient;
    newIngredientDiv.innerHTML = '<div class="form-group"><input type="text" class="form-control" placeholder="Ingredient"><button class="btn btn-danger" type="button" onclick="removeIngredient(' + ingredient + ');"><span class="fa fa-minus" aria-hidden="true"></span></button><div class="clear"></div';

    objTo.appendChild(newIngredientDiv)

}

function removeIngredient(rid) {
    $('.ingredient' + rid).remove();
}