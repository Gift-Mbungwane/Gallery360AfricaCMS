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
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { AlertService } from '../alert/alert.service';
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
  paymentData: any;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    // public alertService: AlertService
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

        const fullPaymentDetails = snapShot.docs.map((document: any) =>
          document.data()
        );

        //console.log(datas[0]);
        this.paymentData = fullPaymentDetails[0];
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
  async updateMarket(imageUid: any): Promise<void> {
    const art = doc(this.db, 'Market', imageUid);
    await updateDoc(art, { legacy: true })
      .then(() => {
        alert('the art is now legacy');
        //call another method that shows the artist that the art has been bought
        /// this.paymentForArtist(imageUid);
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  }

  async paymentForArtist(
    imageUid: any,
    artUrl: any,
    artistUid: any,
    price: any,
    artType: any,
    uuid: any
  ): Promise<void> {
    console.log(this.paymentData);
    const art = doc(this.db, 'payment-artist', imageUid);
    const docSnap = await getDoc(art);

    if (docSnap.exists()) {
      alert(
        `the Art has already been sold to ${
          docSnap.data().name
        } with the transactionID: ${docSnap.data().transactionId}`
      );
      // console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      await setDoc(art, {
        name: this.paymentData.name,
        date: this.paymentData.date,
        payerId: this.paymentData.payerId,
        transactionId: this.paymentData.transactionId,
        status: this.paymentData.status,
      })
        .then(async () => {
          await updateDoc(art, {
            artType: artType,
            artUrl: artUrl,
            artistUid: artistUid,
            price: price,
            userId: uuid,
            imageUid: imageUid,
          })
            .then(() => this.updateMarket(imageUid))
            .catch((error) =>
              console.log('unable to call update market method')
            );
        })
        .catch((error) => console.log(error));
    }
  }
}
