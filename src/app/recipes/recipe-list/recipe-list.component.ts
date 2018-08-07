import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 recipes: Recipe[];
 subscribe: Subscription;
  constructor(private recipeService: RecipeService,
  private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.subscribe=this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  onEditRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
  
  ngOnDestroy(){
   this.subscribe.unsubscribe();
  }
}