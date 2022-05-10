import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.db = getFirestore();
    // this.uid = this.route.params.subscribe((uid) => {
    //   return uid.id;
    // });
    this.uid = this.route.snapshot.paramMap.get('id');
    //this.userName = this.route.snapshot.paramMap.get('A');
    // this.route.queryParams.subscribe((params) => {
    //   this.uid = params.id;
    //   console.log(params.id);
    // });
  }

  ngOnInit(): void {
    this.initConfig();
    onSnapshot(
      query(
        collection(this.db, 'cartItem', this.uid, 'items')
        //where('uuid', '==', this.uid)
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        const amounts: any = snapShot.docs
          .map((doc) => parseInt(doc.data().price))
          .reduce((doc, doc2) => doc + doc2);
        const artypes = snapShot.docs.map((doc) => doc.data().artType);
        const sizes = snapShot.size;
        this.size = sizes;
        this.artType = artypes;
        this.datas = data;

        fetch('https://api.exchangerate-api.com/v4/latest/USD', {
          method: 'GET',
          //Request Type
        })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
            //Success
            const gg = responseJson.rates.ZAR;
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

  private initConfig(): void {
    onSnapshot(
      query(
        collection(this.db, 'cartItem', this.uid, 'items')
        //where('uuid', '==', this.uid)
        // where('status', '==', 'pending')
      ),
      (snapShot) => {
        const data = snapShot.docs.map((doc) => doc.data());
        const amounts: any = snapShot.docs
          .map((doc) => parseInt(doc.data().price))
          .reduce((doc, doc2) => doc + doc2);
        const artypes = snapShot.docs.map((doc) => doc.data().artType);
        const sizes = snapShot.size;
        this.size = sizes;
        this.artType = artypes;
        this.datas = data;

        fetch('https://api.exchangerate-api.com/v4/latest/USD', {
          method: 'GET',
          //Request Type
        })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
            //Success
            const gg = responseJson.rates.ZAR;
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

    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AUBnW3yDrThpaiculRFIsW4RSc9voYKWeYzk4feLT1Hj9pg6dAjyaWU3ndxqJHHb1cyL2Hh23I_rR-EK',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.totalAmount}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.totalAmount}`,
                  },
                },
              },
              items: [
                {
                  name: 'Purchase @Gallary-360-Africa',
                  quantity: `${this.size}`,
                  category: 'PHYSICAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: `${this.totalAmount}`,
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
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        // this.router.navigate([
        //   { payerId: data.payerID, orderId: data.orderID },
        //   'Success',
        // ]);
        // This function captures the funds from the transaction.
        // This function shows a transaction success message to your buyer.
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
        return actions.order.capture().then((details: any) => {
          // This function shows a transaction success message to your buyer.
          this.router.navigate(['Success']);
          // alert('Transaction completed by ' + details.payer.name.given_name);
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
        // Show a cancel page, or return to cart
        // this.router.navigate([{ uid: this.uid }, '']);
      },
      onError: (err) => {
        // For example, redirect to a specific error page
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
