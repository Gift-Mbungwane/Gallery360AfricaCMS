import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
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
    createUserWithEmailAndPassword(this.state.auth, email, password)
      .then(async (userCrdential) => {
        const user = userCrdential.user;

        await setDoc(doc(this.state.db, 'admin', user.uid), {
          userName: userName,
          email: email,
          uid: user.uid,
        })
          .then(() => {
            const uid = this.state.auth.currentUser?.uid;
            alert('your email was registerred successfully');

            return this.router.navigate([
              { uid: uid, userNames: userName, email: email },
              '/Market',
            ]);
          })
          .catch((error) => {
            alert('Plase fill in your full information');
          });
      })
      .catch((error) => {
        alert('unable to sign up please chck your connectivity');
      });
  }

  onSignIn(email: string, password: string) {
    signInWithEmailAndPassword(this.state.auth, email, password).then(
      (user) => {
        const uid = user.user.uid;
        onSnapshot(
          query(collection(this.state.db, 'admin'), where('uid', '==', uid)),
          (snapShot) => {
            const userName = snapShot.docs.map((doc) => doc.data().userName);
            // this.router.navigate(['about'], { relativeTo: this.route });
            // return this.router.navigateByUrl('/Market', {
            //   state: { id: `${uid}` },
            // });
            return this.router.navigate(['Market', `${uid}`]);
          }
        );
      }
    );
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
