import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.scss'],
})
export class ExhibitionComponent implements OnInit {
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
    onSnapshot(
      query(
        collection(this.db, 'exhibition')
        // where('uid', '!=', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        this.datas = data;
      }
    );
  }
}