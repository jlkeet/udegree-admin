import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  
    messages: AngularFireList<any>;
   public faculty;
  
   constructor(private http: HttpClient, private db: AngularFireDatabase) { }

   /**
     * Get All tickers from firebase
     */
    getMessages() {
    return new Promise(resolve => {
      this.db.list('/').valueChanges().subscribe(result => { resolve(result) });
         })
    }

//     searchFirebase() {
//     this.db.list('/').query
//     .orderByChild("serie").equalTo("0")
//     .on('value',(data) => {
//     data.forEach((child) => {
//     console.log(child.key, child.val());
//   });
//   })
// }
}

