import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase services
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Environment
import { environment } from '../environments/environment';
// Components
import { AddResellerSheetComponent } from './components/orders/add-reseller-sheet/add-reseller-sheet.component';
import { CancelOrderDialogComponent } from './components/orders/cancel-order-dialog/cancel-order-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderDeliveryDialogComponent } from './components/orders/delivery-order-dialog/order-delivery-dialog.component';
import { ExitDialogComponent } from './components/logged-in/exit-dialog/exit-dialog.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// Services
import { AuthService } from './shared/services/auth.service';
import { FirebaseCRUDService } from './shared/services/firebase-crud.service';
// Angular Material
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    AddResellerSheetComponent,
    CancelOrderDialogComponent,
    DashboardComponent,
    OrderDeliveryDialogComponent,
    ExitDialogComponent,
    ForgotPasswordComponent,
    LoggedInComponent,
    OrdersComponent,
    ProductsComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthService,
    FirebaseCRUDService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
