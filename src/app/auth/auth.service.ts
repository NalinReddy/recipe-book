import * as firebase from 'firebase';
import { Response } from '@angular/http';

export class AuthService {
   token : string;

    signup(email: string, password: string){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
          (error) => console.log(error)
      )
    }

    signIn(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
           (response)=> firebase.auth().currentUser.getIdToken()
           .then(
               (token: string) =>{ 
                   this.token=token
                                
               }
           )
        )
        .catch(
            error => console.log(error)
        )
    }
    getToken(){
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string)=> this.token = token
        )
        return this.token;
        // console.log(this.token)
    }
    logout(){
       firebase.auth().signOut();
       this.token = null;
    }

    isAuthenticated(){
        return this.token != null;
    }
}