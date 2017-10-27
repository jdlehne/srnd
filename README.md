# Shake Rattle and Drink

Shake Rattle and Drink (SRnD) is a cocktail database that allows user to search for drink recipes by name or a specific ingredient/spirit.  The database will search for any and all drinks with parameters close to the search criteria and return a list of drinks and recipes for the user.

![](https://i.imgur.com/l0D1XKx.jpg)

Once 'in' users have a few options on the tabs above to see the different sections of SRnD: Search Drink, Add Drink, Random Recipes and an About section.

![](https://i.imgur.com/AF1ReoT.jpg)

Search Drink again allows user to search by a drink name with the ingredients and recipe below:

![](https://i.imgur.com/2CYnxjX.jpg)
![](https://i.imgur.com/SGtks02.jpg)

Searching by an ingredient gives a list of archived drinks with that contains that ingredient in one of the recipe fields:

![](https://i.imgur.com/t9DzdYk.jpg)

Clicking on any of the drink names will display the recipe below again:

![](https://i.imgur.com/UCZhUo9.jpg)


The Add Drink section allows the user to add any recipes they'd like to the database using client side AngularJS form verification for recipe submission, currently the database only allows drinks with five or less ingredients.

![](https://i.imgur.com/0XqHsPk.jpg)

![](https://i.imgur.com/auIyGc9.jpg)

Once added the user will get a message informing them the drink was uploaded and display the current total of recipes in the database:

![](https://i.imgur.com/nMvZeNZ.jpg)

The 'Random Recipes' Section is pretty straightforward with a few easy use buttons available:

Random Drink - Grabs a random drink recipe from the SRnD database


![](https://i.imgur.com/YRKNCOf.jpg)

Call Cocktail Api - Returns a random drink recipe from http://www.thecocktaildb.com/ API which has it's own recipe's and photos.

![](https://i.imgur.com/aL0puVv.jpg)

The Random vodka, gin and whiskey buttons have the same functionality, they search the database by the ingredient, then return the total number of drinks with that ingredient - then a random number is generated and the index of the recipe with the random number is displayed.


The 'About Section' has information on who/what and where the project was designed by and for as well as a link to the code on github.  There is also a link to show a JSON of all the drinks in the database, and an archived drink button to display the number of recipes in the database and the time that was logged.

![](https://i.imgur.com/edEuIDJ.jpg)
