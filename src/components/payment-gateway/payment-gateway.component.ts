import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import * as moment from 'moment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
})
export class PaymentGatewayComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  showSuccess: any;
  userName: any;
  uid: any;
  totalAmount: any;
  datas: any;
  db: any;
  artType: any;
  size: any;
  imageUid: any;
  data: any;
  key_id: any;
  paramsObject: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.db = getFirestore();
    // this.uid = this.route.params.subscribe((uid) => {
    //   return uid.id;
    // });
    this.uid = this.route.snapshot.paramMap.get('id');
    /**
     * payment link from user app should provide us with key to enable the paypal buttons
     *  and ID to get items that the user is paying for.
     * link example( https://gallery-360-africa.firebaseapp.com/Payment/{id}?{key})
     * 
     */

    // this.route.queryParamMap.subscribe((params) => {
    //   this.paramsObject = { ...params.keys, ...params };
    //   console.log(
    //     this.paramsObject.params.id,
    //     'this the id from object params'
    //   );
    //   console.log(
    //     this.paramsObject.params.key,
    //     'this the key from object params'
    //   );
    // });
    onSnapshot(
      query(
        collection(this.db, 'cartItem', this.uid, 'items')
        //collection(this.db, 'cartItem', this.paramsObject.params.id, 'items')
        //where('uuid', '==', this.uid)
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        const amounts: any = snapShot.docs
          .map((doc) => parseInt(doc.data().price))
          .reduce((doc, doc2) => doc + doc2);
        const artypes = snapShot.docs.map((doc) => doc.data().artType);
        const sizes = snapShot.size;
        this.imageUid = snapShot.docs.map(
          (document) => document.data().imageUid
        );
        this.size = sizes;
        this.artType = artypes;
        this.datas = data;
        console.log(artypes[0]);

        fetch(
          'https://v6.exchangerate-api.com/v6/39ae72c37b140691d14cd46d/latest/USD',
          {
            method: 'GET',
            //Request Type
          }
        )
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
            //Success
            const gg = responseJson.conversion_rates.ZAR;
            const totalAmounts = (amounts / gg).toFixed(2);
            console.log(totalAmounts, ' thee final amount', gg);
            this.totalAmount = totalAmounts;
          })
          //If response is not in json then in error
          .catch((error) => {
            //Error
            alert(JSON.stringify(error));
            9;
            console.error(error);
          });
      }
    );
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AUBnW3yDrThpaiculRFIsW4RSc9voYKWeYzk4feLT1Hj9pg6dAjyaWU3ndxqJHHb1cyL2Hh23I_rR-EK',
      //clientId: this.paramsObject.params.key,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                //value: '0.01',
                value: `${this.totalAmount}`, //the total amount of items including the shipping and insurance, etc.
                breakdown: {
                  // handling: {
                  //   currency_code: 'USD',
                  //   value: '1.54',
                  // },
                  // insurance: {
                  //   currency_code: 'USD',
                  //   value: '1.59',
                  // },
                  item_total: {
                    currency_code: 'USD',
                    // value: '0.01',
                    value: `${this.totalAmount}`, //the total amount of th items
                  },
                  // shipping: {
                  //   currency_code: 'USD',
                  //   value: '1.22',
                  // },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: `${this.size}`,
                  //quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    // value: '0.01',
                    value: `${this.totalAmount}`, //this should be the total amount
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
      },
      onApprove: (data, actions) => {
        // console.log(
        //   'onApprove - transaction was approved, but not authorized',
        //   data,
        //   actions
        // );
        return actions.order.get().then(async (details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          //   //
          const docRef = await addDoc(collection(this.db, 'payment'), {
            name: details.purchase_units[0].shipping.name.full_name,
            totalAmount: details.purchase_units[0].amount.value,
            address: `${
              details.purchase_units[0].shipping.address.address_line_1 +
              '\n' +
              details.purchase_units[0].shipping.address.admin_area_1 +
              '\n' +
              details.purchase_units[0].shipping.address.admin_area_2 +
              '\n' +
              details.purchase_units[0].shipping.address.country_code +
              '\n' +
              details.purchase_units[0].shipping.address.postal_code
            }`,
            transactionId: details.id,
            date: `${moment(new Date()).format('DD-MM-YYYY').toString()}`,
            uuid: this.uid,
            isDelivered: false,
            // uuid: this.paramsObject.params.id,
            emailAddress: details.payer.email_address,
            payerId: details.payer.payer_id,
            items: this.datas,
            status: details.status,
          });
          updateDoc(docRef, { documentID: docRef.id }).then(() => {this.router.navigateByUrl('Success')}).catch((error) => console.log(error));
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        this.router.navigateByUrl('Failure');
        //console.log('OnError', err);
      },
      // onClick: (data, actions) => {
      //   console.log('onClick', data, actions);
      // },
    };
  }
}
