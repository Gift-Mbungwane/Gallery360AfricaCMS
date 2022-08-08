import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from 'src/components/artist/artist.component';
import { ExhibitionComponent } from 'src/components/exhibition/exhibition.component';
import { ArtistGuard } from 'src/components/guards/artist.guard';
import { ExhibitionGuard } from 'src/components/guards/exhibition.guard';
import { MarketGuard } from 'src/components/guards/market.guard';
import { PaymentDetailsGuard } from 'src/components/guards/payment-details.guard';
import { UserGuard } from 'src/components/guards/user.guard';
import { MarketApprovalComponent } from 'src/components/market-approval/market-approval.component';
import { OnErrorComponent } from 'src/components/on-error/on-error.component';
import { OrdersComponent } from 'src/components/orders/orders.component';
import { PaymentDetailsComponent } from 'src/components/payment-details/payment-details.component';
import { PaymentFailureComponent } from 'src/components/payment-failure/payment-failure.component';
import { PaymentGatewayComponent } from 'src/components/payment-gateway/payment-gateway.component';
import { PaymentSuccessComponent } from 'src/components/payment-success/payment-success.component';
import { SignInScreenComponent } from 'src/components/sign-in-screen/sign-in-screen.component';
import { SignUpScreenComponent } from 'src/components/sign-up-screen/sign-up-screen.component';
import { UserComponent } from 'src/components/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'SignIn', pathMatch: 'full' },
  { path: 'SignIn', component: SignInScreenComponent },
  { path: 'SignUp', component: SignUpScreenComponent },
  {
    path: 'Market/:id',
    component: MarketApprovalComponent,
    canActivate: [MarketGuard],
  },
  {
    path: 'Exhibition/:id',
    component: ExhibitionComponent,
    canActivate: [ExhibitionGuard],
  },
  { path: 'User/:id', component: UserComponent, canActivate: [UserGuard] },
  {
    path: 'Artist/:id',
    component: ArtistComponent,
    canActivate: [ArtistGuard],
  },
  { path: 'Payment/:id', component: PaymentGatewayComponent },
  { path: 'Failure/:id', component: PaymentFailureComponent },
  { path: 'Success/:id', component: PaymentSuccessComponent },
  { path: 'Orders/:id', component: OrdersComponent },
  { path: '404/:id', component: OnErrorComponent },
  {
    path: 'payment-details/:id',
    component: PaymentDetailsComponent,
    canActivate: [PaymentDetailsGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
