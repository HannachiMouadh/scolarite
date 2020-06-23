
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {GalleryImage} from '../models/galleryImage.model';
import * as firebase from 'firebase';

@Injectable()
export class ImageService {

  
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  getImages(): Observable<GalleryImage[]> {
    // return this.db.list('uploads').valueChanges();
    return JSON.parse( JSON.stringify(this.db.list('uploads').valueChanges() ) );
  }

  getImage(key: string) {
    // return firebase.database().ref('uploads/' + key).once('value')
    // .then((snap) => snap.val());
    return JSON.parse( JSON.stringify(firebase.database().ref('uploads/' + key).once('value')
    .then((snap) => snap.val())));
  }
}