import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  collection,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

@Component({
  selector: 'app-market-approval',
  templateUrl: './market-approval.component.html',
  styleUrls: ['./market-approval.component.scss'],
})
export class MarketApprovalComponent implements OnInit {
  userName: any;
  uid: any;
  datas: any;
  db: any;

  constructor(private route: ActivatedRoute) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'Market')
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
