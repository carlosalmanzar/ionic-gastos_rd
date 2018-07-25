import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from 'models/company';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the CompanyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyServiceProvider {

  private db: any;

  constructor(public firestore: AngularFirestore, public http: HttpClient, private auth: AuthServiceProvider) {
    this.db = firebase.firestore();
  }

  getListOfCompany(): AngularFirestoreCollection<any> {
    return this.firestore.collection('company');
  }

  getContribuyentes(cedula) {
    return this.http.get('http://adamix.net/gastosrd/api.php?act=GetContribuyentes&rnc='+ cedula);
  }

  getAllCompany(): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.db.collection('company').where("uid", "==", this.auth.afAuth.auth.currentUser.uid)
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

  deleteCompany(docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('company')
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
