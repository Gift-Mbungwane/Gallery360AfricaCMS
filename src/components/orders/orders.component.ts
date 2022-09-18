import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getFirestore,
  onSnapshot,
  query,
  where,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthenticationService } from '../services/authentication.service';
import { ModalComponent } from './modalComponent';
import { Orders } from './orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

export class OrdersComponent implements OnInit {
  
  uid: any;
  userName: any;
  db: any;
  data!: Orders[] ;
  isDelivered!: boolean;
  dataByUid: any;
  dataByItem: any;
  transactionId: any;
  searchTerm = '';
  modalRef: MdbModalRef<ModalComponent> | null = null;
  isColor!: boolean;
  allOrders!: Orders[];
  showScroll?: boolean;


  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private modalService: MdbModalService
  ) {
    //below are firebase rules
    //allow read, write : if request.auth != null;

    this.db = getFirestore();
    this.uid = this.route.snapshot.paramMap.get('id');
    if (this.uid != '' && this.uid != null) {
      this.isColor = true;
    }
    //Querying orders
    onSnapshot(
      query(
        collection(this.db, 'payment'),
        where('uuid', '!=', this.uid)
        // where('status', '==', 'pending')
      ),
      (snapShot: any) => {
        const datas = snapShot.docs.map((document: any) => document.data());

        const artypes = snapShot.docs.map(
          (document: any) => document.data().items
        );
        this.dataByItem = artypes[0];
        const sizes = snapShot.size;
        this.dataByUid = datas[0];
        this.data = datas;
        //console.log(datas);
      }
    );
  }

  ngOnInit(): void {
    this.data = this.allOrders;
  }

  viewMoreDetails(data: any): void {
    this.dataByUid = data;
    // console.log(data, 'this another specific data from click');
  }

  viewMoreArt(data: any): void {
    this.dataByItem = data;
    //  console.log(data, ' this is the items');
  }

  enableDisableRule(transactionId: any) {
    this.transactionId = transactionId;
  }
  openModal(artUrl: any, artistName: any, artName: any) {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-lg',
      data: {
        title: 'Custom title',
        artUrl: `${artUrl}`,
        artistName: `${artistName}`,
        artName: `${artName}`,
      },
      keyboard: true,
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }

  onDelivered(documentID: any): void {
    const art = doc(this.db, 'payment', documentID);
    updateDoc(art, { isDelivered: true })
      .then(() => {
        alert('Items have been delivered');
      })
      .catch((error) => console.log('this error is on orders page'));
  }

  onNotDelivered(documentID: any): void {
    const art = doc(this.db, 'payment', documentID);
    updateDoc(art, { isDelivered: false })
      .then(() => {
        alert('Items not delivered');
      })
      .catch((error) => console.log('this error is on orders page'));
  }

  search(value: string): void {
    this.data = this.allOrders.filter((val: any) =>
     val.name.toLowerCase().includes(value)
    );
  }
}
