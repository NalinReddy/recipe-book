import { Component, Output, EventEmitter } from "@angular/core";
import {Response} from "@angular/http";

import { DataStorageService } from "../shared/datastorage.service";
import { AuthService } from "../auth/auth.service";
// import { EventEmitter } from "events";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent{
  constructor(private dataStorageService:DataStorageService, public authService: AuthService){}
    onSaveData(){
      this.dataStorageService.storeRecipes()
      .subscribe(
          (response: Response) => {
              console.log(response);
          }
      )
    }
    onGetData(){
        this.dataStorageService.getRecipes();
    }

}