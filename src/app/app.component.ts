import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { AuthenticationService } from 'src/components/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gallery360AfricaCMS';
  uid: any;
  userName: any;
  db: any;
  datas: any;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          query(
            collection(this.db, 'artists'),
            where('uid', '==', user.uid)
            // where('status', '==', 'pending')
          ),
          (snapShot) => {
            const userNames = snapShot.docs.map((doc) => doc.data().userName);
            this.userName = userNames;
          }
        );
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  routeToTheNextScreen(route: string) {
    if (route == 'Markets') {
      return this.router.navigate([
        'Market',
        { uid: this.uid, userName: this.userName },
      ]);
    } else if (route == 'Exhibitions') {
      return this.router.navigate([
        'Exhibition',
        { uid: this.uid, userName: this.userName },
      ]);
    } else if (route == 'Users') {
      return this.router.navigate([
        'User',
        { uid: this.uid, userName: this.userName },
      ]);
    } else if (route == 'Artists') {
      return this.router.navigate([
        'Artist',
        { uid: this.uid, userName: this.userName },
      ]);
    } else if (route == 'Payment') {
      return this.router.navigate([
        'Payment',
        { uid: this.uid, userName: this.userName },
      ]);
    }
  }
}
