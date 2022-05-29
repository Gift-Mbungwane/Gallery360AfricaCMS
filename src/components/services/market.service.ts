import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
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

  approveArt(exhibitionUid: any): void {
    const batch = doc(this.db, 'exhibition', exhibitionUid);
    setDoc(batch, { isEnabled: true }, { merge: true })
      .then(() => {
        alert('Exhibition is now availabe to be viewed ');
      })
      .catch((error) => {
        alert('unable to update the exhibition');
        alert(error);
      });
  }
}
