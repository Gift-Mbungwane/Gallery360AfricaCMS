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
  dataByUid: any ;
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
   
  }

  ngOnInit(): void {
    onSnapshot(
      query(
        collection(this.db, 'payment'),
        where('uuid', '!=', this.uid)
        // where('status', '==', 'pending')
      ),
      (snapShot: any) => {
        const datas = snapShot.docs.map((document: any) => document.data());

       // console.log(datas[0]);
        this.transactionId = datas[0].transactionId;
        const sizes = snapShot.size;
        this.dataByUid = datas[0];
        this.data = datas;
        this.dataByItem = this.dataByUid.items;
      }
    );
    
    this.data = this.allOrders;
  
  }

  viewMoreDetails(data: []): void {
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
      modalClass: 'modal-dialog-centered',
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

  onDelivered(documentID: any, transactionId: string): void {
    const art = doc(this.db, 'payment', documentID);
    updateDoc(art, { isDelivered: true })
      .then(() => {
        this.transactionId = transactionId;
        this.searchCurrentDelivered(documentID, "Items have been delivered", true);
        alert("Items have been delivered");
      })
      .catch((error) => console.log('this error is on orders page'));

  }

  onNotDelivered(documentID: any, transactionId: string): void {
    const art = doc(this.db, 'payment', documentID);
    updateDoc(art, { isDelivered: false })
      .then(() => {
        this.transactionId = transactionId;
        this.searchCurrentDelivered(documentID, "Items not delivered", false);
        alert("Items not delivered");
      })
      .catch((error) => console.log('this error is on orders page'));

  }

  searchCurrentDelivered(document: any, message: string, isDelivered: boolean): void {
    
    onSnapshot(
      query(
        collection(this.db, 'payment'),
         where('documentID', '==', document)
      ),
      (snapShot) => {
        const dataByUid = snapShot.docs.map((document: any) => document.data()).map((doc) => doc);
        console.log(isDelivered, "the current updated value");
        console.log(dataByUid, "second object");
        this.dataByUid = dataByUid[0];
        this.dataByItem = this.dataByUid.items;
        //alert(`${message}`);
      }
    );
  }

  search(value: string): void {
    this.data = this.allOrders.filter((val: any) =>
     val.name.toLowerCase().includes(value)
    );
  }
}
