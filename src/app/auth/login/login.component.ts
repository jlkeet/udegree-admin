import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { getDeepFromObject } from '@nebular/auth';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent {

  redirectDelay: number = 0;

  errors: string[] = [];
  messages: string[] = [];
  user: any = { rememberMe: true };

  showMessages: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  validation: any = {};

  constructor(protected auth: AuthService, @Inject(NB_AUTH_OPTIONS) protected config = {}, protected router: Router, private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');

    this.validation = this.getConfigValue('forms.validation');
  }

  loginEmail() {
    this.errors = this.messages = [];
    this.submitted = true;
    this.auth.signInWithEmail(this.user.email, this.user.password)
      .then((res) => {
        this.getAdminRole(res).then((sub) => {if (sub === "admin") {
          this.submitted = false;
          this.messages = [res.user.displayName];
          this.redirectToDashboard();
        } else {
          this.submitted = false;
          this.errors = ["Sorry only Admin users can access this site"];
          this.redirectToLogin();
        }
      });
      })
      .catch((err) => {
        this.submitted = false;
        this.errors = [err];
      });
  }
  
  loginSocial(name) {
    if (name === "google") {
      this.loginGoogle();
    } else if (name === "facebook") {
      this.loginFb();
    } else{
      console.warn("No login for " + name);
    }
  }

  loginGoogle() {
    console.log("Auth: ", this.auth)
    this.auth.signInWithGoogle()
      .then((success) => {
        this.redirectToDashboard()
      })
      .catch((err) => {
        this.errors = [err];
      });
  }

  loginFb() {
    this.auth.signInWithFacebook()
      .then((success) => {
        this.redirectToDashboard()
      })
      .catch((err) => {
        this.errors = [err];
      });
  }

  redirectToDashboard(){
    setTimeout(() => {
      this.router.navigate(['/pages/dashboard']);
    }, this.redirectDelay);
  }

  redirectToLogin(){
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, this.redirectDelay);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  getAdminRole(res) {
  return new Promise<any>((resolve) => {
    this.db
    .collection("users") // Here is where we set the docID to the email so its accessible in the database.
    .doc(res.user.email)
    .get()
    .toPromise()
    .then((result) => resolve(result.get("role")))})
  }
}
