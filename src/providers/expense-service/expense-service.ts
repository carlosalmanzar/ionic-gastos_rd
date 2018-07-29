import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Expense } from 'models/expense';
import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the ExpenseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpenseServiceProvider {

  private db: any;

  constructor(public firestore: AngularFirestore, private auth: AuthServiceProvider) {
    this.db = firebase.firestore();
  }

  getAllExpense(): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
      this.db.collection('expenses').where("uid", "==", this.auth.afAuth.auth.currentUser.uid)
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

  addExpense(dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection('expenses').add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateExpense(docID: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('expenses')
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  deleteExpense(docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('expenses')
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
