import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {Response} from "@angular/http";
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
 
@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService, 
     private authService: AuthService){}
    storeRecipes(){
       const token = this.authService.getToken();
       return this.http.put("https://ng-recipe-book-5d3bd.firebaseio.com/users/recipes.json?auth=" + token,
    this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();
        this.http.get("https://ng-recipe-book-5d3bd.firebaseio.com/users/recipes.json?auth=" + token)
        .pipe(map(
            (response : Response) =>{
                const recipes = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                        // console.log(recipe)
                    }
                }
                return recipes;
            }
        ))
        .subscribe(
            (recipes: Recipe[]) => {
                 
                 this.recipeService.fetchRecipes(recipes);
            }
        )
    }
}