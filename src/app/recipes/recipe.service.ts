import { Recipe } from "./recipe.model";
import { EventEmitter, Output, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Subject } from "rxjs";
@Injectable()

export class RecipeService{
    @Output() recipeChoosed = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();
   private recipes: Recipe[] = [
        new Recipe("Veg Manchurian", 
        "A best and easy to cook fast food", 
        "https://i.ytimg.com/vi/f6zZgVwWgVE/maxresdefault.jpg",
        [
            new Ingredient("Gobi", 1),
            new Ingredient("Ginger & garlic", 20),
            new Ingredient("Onions", 5),
            new Ingredient("Chilles(green)", 6),
        ]
     ),
     new Recipe("Chicken Biryani",
      "'A spicy rice'is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. It is popular throughout the Indian subcontinent and among the diaspora from the region", 
      "https://www.africanbites.com/wp-content/uploads/2018/04/IMG_0165.jpg",
      [
          new Ingredient("Chicken", 1),
          new Ingredient("Chillies", 2),
          new Ingredient("Ginger & garlic", 20),
          new Ingredient("Onions", 5),
          new Ingredient("Chilles(green)", 6),
      ]
     )
      ];
      constructor(private shoppingListService: ShoppingListService){}

      getRecipes(){
         return this.recipes.slice(); //copy of recipes aarray not reference of recipes
      }  

      getRecipe(index : number){
         return this.recipes[index];
      } 
      fetchRecipes(recipe: Recipe[]){
          this.recipes = recipe;
          this.recipeChanged.next(this.recipes.slice());
      }
      addTosList(ingredients:Ingredient[]){
        this.shoppingListService.addFromRecipe(ingredients);
        console.log("from recipe service", ingredients);
      }

      updateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index] = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }
      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
          this.recipes.splice(index,1);
        //   console.log(this.recipes);
          this.recipeChanged.next(this.recipes.slice());
      }
}