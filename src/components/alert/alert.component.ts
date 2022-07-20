// import {
//   Component,
//   OnInit,
//   OnDestroy,
//   Input,
//   ViewEncapsulation,
// } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { Alert } from './alert.model';
// import { AlertService } from './alert.service';
// import { AlertSettings } from './alert-settings';

// @Component({
//   selector: 'alert',
//   templateUrl: './alert.component.html',
//   styleUrls: ['./alert.component.scss'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class AlertComponent implements OnInit, OnDestroy {
//   @Input() id = 'default-alert';
//   @Input() fade = true;

//   alerts: Alert | any;
//   alertSubscription: Subscription | any;
//   routeSubscription: Subscription | any;

//   constructor(private router: Router, private alertService: AlertService) {}

//   ngOnInit() {
//     this.alertSubscription = this.alertService
//       .onAlert(this.id)
//       .subscribe((alert) => {
//         if (!alert.message) {
//           return this.alerts;
//         }

//         if (alert.autoClose) {
//           setTimeout(() => this.removeAlert(alert), 3000);
//         }
//       });

//     // clear alerts on location change
//     this.routeSubscription = this.router.events.subscribe((event) => {
//       if (event instanceof NavigationStart) {
//         this.alertService.clear(this.id);
//       }
//     });
//   }

//   ngOnDestroy() {
//     // unsubscribe to avoid memory leaks
//     this.alertSubscription.unsubscribe();
//     this.routeSubscription.unsubscribe();
//   }

//   removeAlert(alert: Alert) {
//     if (!this.alerts) return;

//     if (this.fade) {
//       this.alerts.fade = true;
//       //this.alerts.find((x) => x === alert)?.fade;

//       setTimeout(() => {
//         return this.alerts;

//         //  this.alerts.filter((x) => x !== alert);
//       }, 250);
//     } else {
//       return this.alerts;
//       //= this.alerts.filter((x) => x !== alert);
//     }
//   }

//   cssClass(alert: Alert) {
//     if (!alert) return;

//     const classes = ['alert', 'alert-dismissable'];

//     const alertTypeClass = {
//       [AlertSettings.SUCCESS]: 'alert alert-success',
//       [AlertSettings.ERROR]: 'alert alert-danger',
//       [AlertSettings.INFO]: 'alert alert-info',
//       [AlertSettings.WARNING]: 'alert alert-warning',
//     };

//     classes.push(alertTypeClass[alert.alertType]);

//     if (alert.fade) {
//       classes.push('fade');
//     }

//     return classes.join(' ');
//   }
// }
