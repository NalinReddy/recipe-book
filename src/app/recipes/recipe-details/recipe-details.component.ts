import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 recipe:Recipe;
 id:number;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.
    subscribe( (params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  addToShoppingList(){
    this.recipeService.addTosList(this.recipe.ingredients);
    console.log("from recipe details1", this.recipe);
    console.log("from recipe details2", this.recipe.ingredients);
    this.router.navigate(["/shopping-list"]);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
  
}
