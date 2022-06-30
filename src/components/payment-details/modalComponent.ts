import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './modal-items.component.html',
})
export class ModalComponent implements OnInit {
  transactionId: String | null = null;
  title: string | null = null;
  db: any;
  data: any;
  uuid: String | null = null;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public modalRef: MdbModalRef<ModalComponent>
  ) {
    this.db = getFirestore();
  }

  ngOnInit(): void {
    //geting all the art that has been bought my the buyer with the transaction ID
    onSnapshot(
      query(
        collection(this.db, 'payment'),
        where('transactionId', '==', this.transactionId)
      ),
      (snapShot: any) => {
        const datas = snapShot.docs.map(
          (document: any) =>
            // document.data()['items'];
            document.data().items
        );
        const artypes = snapShot.docs.map((document: any) => document.data());

        console.log(datas[0]);
        const sizes = snapShot.size;
        this.data = datas[0];
      }
    );
    // throw new Error('Method not implemented.');
  }

  //
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  //updating the market removing the price to placing legacy tag
  updateMarket(imageUid: any): void {
    const art = doc(collection(this.db, 'Market', imageUid));
    updateDoc(art, { legacy: 'legacy' })
      .then(() => {
        //call another method that shows the artist that the art has been bought
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  }
}
