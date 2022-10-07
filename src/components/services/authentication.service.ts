import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  state = {
    auth: getAuth(),
    db: getFirestore(),
  };
  userData: any;

  constructor(private router: Router) {
    this.state.auth.onAuthStateChanged((user) => {
      if (user) {
        
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

   onSignUp(userName: string, email: string, password: string) {
    console.log(userName, email, password);
    createUserWithEmailAndPassword(this.state.auth, email, password)
      .then(async (userCrdential) => {
        const user = userCrdential.user;
        const actionCodeSettings = {
          url: `https://gallery360africa.page.link/gallery360africa`,
          iOS: {
             bundleId: 'com.example.ios'
          },
          android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
          },
          handleCodeInApp: true
        };
         await sendEmailVerification(user,actionCodeSettings).then(() => {
            alert("email verification message has been sent");
         }).catch((error) => {
          alert(error);
          //alert('unable to verify email')
        //console.log(error);

        })

      })
      .catch((error) => {
       // alert('unable to sign up please check your connectivity');
        console.log(error);
      });
  }

  onSignIn(email: any, password: string) {
    signInWithEmailAndPassword(this.state.auth, email, password).then(
      (user) => {
        const uid = user.user.uid;
        onSnapshot(
          query(
            collection(this.state.db, 'admin'),
            where('uid', '==', uid)
          ),(snapShot) =>{
            const data  = snapShot.docs.map((doc) => doc.data().email);
            if(email == data) {
              return this.router.navigate(['Market', `${uid}`]);
            } else {
                alert("Please contact the Administrator");
            }
          });
        // if(authorisedUer){
        //   return this.router.navigate(['Market', `${uid}`]);
        // } else {
        //   alert("Please verify your email address");
        // }
      }
    );
  }

  forgotPasswordReset(email: string) {
    sendPasswordResetEmail(this.state.auth, email).then(() => {
        alert("password has been sent to email");
    }).catch((error) => {
      alert("user not registered")
      console.log(error)
    })
  }

  get isMarket(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }

  get isArtist(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }

  get isExhibition(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }

  get isUser(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }

  get isPayment(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }
}
