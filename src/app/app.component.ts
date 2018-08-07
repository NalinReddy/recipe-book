import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(){
   firebase.initializeApp({  
     apiKey: "AIzaSyCxVd34ENI0Zoz0lhqET1nb4Oivt6GO09w",
     authDomain: "ng-recipe-book-5d3bd.firebaseapp.com"
   })
  }
}
