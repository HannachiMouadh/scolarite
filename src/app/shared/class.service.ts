import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import {lodash} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.classList = this.firebase.list('classes');
    this.classList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }


   getClassName($key) {
    if ($key == "0")
      return "";
    else{
      return lodash._find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }

}
