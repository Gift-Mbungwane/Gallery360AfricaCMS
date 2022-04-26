import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  collection,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  db: any;

  constructor(private route: ActivatedRoute) {
    this.db = getFirestore();
  }

  getMarket(uid: String): void {
    onSnapshot(
      query(
        collection(this.db, 'Market')
        // where('uid', '!=', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        // this.data = data;
      }
    );
  }
}
