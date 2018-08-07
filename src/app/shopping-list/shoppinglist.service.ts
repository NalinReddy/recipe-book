import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    //to tell service that new data is available
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] =[
        new Ingredient("apples", 5),
        new Ingredient("tomatos", 10)
      ];

      getIngredients(){
          return this.ingredients.slice(); //copy of original which will not have new added elements anymore as it looses its reference.
      }
    
      getIngredient(index: number){
          return this.ingredients[index];
      }

      addIngredients(ingredient:Ingredient){
          this.ingredients.push(ingredient); // pushed to original ingredients array
          this.ingredientsChanged.next(this.ingredients.slice()) //emiting copy of original array.
      }
      
      updateIngredient(ingredientIndex:number, newIngredient: Ingredient){
          this.ingredients[ingredientIndex] = newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient(ingredientIndex: number){
          this.ingredients.splice(ingredientIndex,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      addFromRecipe(ingredients: Ingredient[]){
           this.ingredients.push(...ingredients)
           this.ingredientsChanged.next(this.ingredients.slice()); 
           console.log("from shoppinglist service", ...ingredients);      
      }
}