import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
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
    // this.uid = this.route.params.subscribe((uid) => {
    //   return uid.id;
    // });
    // window.location.pathname = '';

    // this.uid = this.route.snapshot.paramMap.get('id');
    //this.userName = this.route.snapshot.paramMap.get('A');
    // this.route.queryParams.subscribe((params) => {
    //   this.uid = params.id;
    //   console.log(params.id);
    // });
  }

  ngOnInit(): void {
    // window.location.pathname = '';
    // deleteDoc(doc(collection(this.db, 'cartItem', this.uid, 'items')))
    //   .then(() => {
    //     alert('item has been paid');
    //   })
    //   .catch((error) => alert(error));
    //window.location.href.
  }
}
