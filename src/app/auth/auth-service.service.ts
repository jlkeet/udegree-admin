import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  public adminFaculty;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private _firestore: AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      },
    );
  }

  register(email, password, fullName, company) {
    return this._firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        (afUser: firebase.User) => {
          // Update the profile in firebase auth
          afUser.updateProfile({
            displayName: fullName,
            photoURL: '',
          }).then(() => afUser.sendEmailVerification());
          // Create the user in firestore
          this._firestore.firestore.collection('users').doc(afUser.uid).set(
            {
              uid: afUser.uid,
              company: company,
            },
          );
        };});
  }

  requestPass(email) {
    return this._firebaseAuth.sendPasswordResetEmail(email);
  }

  confirmPasswordReset(code, newPassword) { // param: oobCode=<code>
    return this._firebaseAuth.confirmPasswordReset(code, newPassword);
  }

  /*verifyPasswordResetCode(code){
    return this._firebaseAuth.auth.verifyPasswordResetCode(code);
  }*/

  signInWithEmail(email, password) {
    return this._firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  signInWithTwitter() {
    return this._firebaseAuth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider(),
    );
  }
  signInWithFacebook() {
    return this._firebaseAuth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider(),
    );
  }
  signInWithGoogle() {
    return this._firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.signOut()
      .then((res) => this.router.navigate(['/auth/login']));
  }

  getAdminRole(authID) {
    return new Promise((resolve) => {
    this._firestore
    .collection('users')
    .doc(authID)
    .get()
    .toPromise()
    .then( (result) => resolve(result.data()) )
  })}
}
