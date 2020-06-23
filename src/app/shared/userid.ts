export class Userid {

  id?: string;
  name: string;
  email: string;
  password: string;
uid: any;

 constructor( auth) {
   this.id = auth.uid
 }
}
