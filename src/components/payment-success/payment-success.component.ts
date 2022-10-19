import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  uid: any;
  db: Firestore;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('id');
    
    // window.location.pathname = '';
  }

  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'cartItem', this.uid, "items"),
        where('uuid', '==', this.uid),
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
       snapShot.docs.map((document) => {  
          if (document.exists()){
            for(let i = 0; i <= snapShot.size; i++) {
              deleteDoc(doc(this.db, 'cartItem', this.uid, 'items', document.id))
              .then(() => {
                console.log("items removed");
              })
              .catch((error) => alert(error));
            }
          }
      });
        const sizes = snapShot.size;
      }
    );

    // deleteDoc(doc(this.db, 'cartItem', this.uid, 'items'))
    //   .then(() => {})
    //   .catch((error) => alert(error));
    //window.location.href.
  }
  onPress(): void {
    window.location.href;
  }
}
