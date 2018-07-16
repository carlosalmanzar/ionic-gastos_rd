import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Company } from 'models/company';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

/*
  Generated class for the CompanyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyServiceProvider {

  private db: any;


  constructor(public firestore: AngularFirestore) {
    this.db = firebase.firestore();
  }


  getListOfCompany(): AngularFirestoreCollection<any> {
    return this.firestore.collection('company');
  }

  getAllCompany(): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.db.collection('company')
        .get()
        .then((querySnapshot) => {
          let arr: Company[] = [];
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

  addCompany(dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection('company').add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateCompany(docID: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('company')
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
}
