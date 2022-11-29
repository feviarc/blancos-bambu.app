import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Components
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// App Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ResellersComponent } from './components/resellers/resellers.component';
// Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { EmailVerifiedGuard } from './shared/guards/email-verified.guard';
import { LoggedInComponent } from './components/logged-in/logged-in.component';


const routes: Routes = [
  { path: '', redirectTo: 'logged-in/dashboard', pathMatch: 'full'},
  { path: 'logged-in', component: LoggedInComponent, canActivate: [AuthGuard, EmailVerifiedGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'resellers', component: ResellersComponent}
    ]
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '**', redirectTo: 'logged-in/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
