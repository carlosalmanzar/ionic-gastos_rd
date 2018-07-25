import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DgiiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DgiiServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DgiiServiceProvider Provider');
  }

  getContribuyentes(cedula)  {
    return this.http.get('http://adamix.net/gastosrd/api.php?act=GetContribuyentes&rnc='+ cedula);
  }

}
