import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Expense } from 'models/expense';

/*
  Generated class for the ExpenseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseServiceProvider {

  private db: any;

  constructor(public firestore: AngularFirestore) {
    this.db = firebase.firestore();
  }

  getAllExpense(): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
      this.db.collection('expenses')
        .get()
        .then((querySnapshot) => {
          let arr: Expense[] = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.key = doc.id
            console.log(obj)
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


}
