import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase services
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Environment
import { environment } from '../environments/environment';
// Components
import { AddOrderSheetComponent } from './components/orders/add-order-sheet/add-order-sheet.component';
import { AddProductSheetComponent } from './components/products/add-product-sheet/add-product-sheet.component';
import { AddResellerSheetComponent } from './components/resellers/add-reseller-sheet/add-reseller-sheet.component';
import { CancelOrderDialogComponent } from './components/orders/cancel-order-dialog/cancel-order-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeleteBrandDialogComponent } from './components/products/manage-brands-sheet/delete-brand-dialog/delete-brand-dialog.component';
import { DeleteCategoryDialogComponent } from './components/products/manage-categories-sheet/delete-category-dialog/delete-category-dialog.component';
import { DeleteProductDialogComponent } from './components/products/delete-product-dialog/delete-product-dialog.component';
import { DeleteResellerDialogComponent } from './components/resellers/delete-reseller-dialog/delete-reseller-dialog.component';
import { DeliveredOrdersListComponent } from './components/orders/delivered-orders-list-dialog/delivered-orders-list.component';
import { ExitDialogComponent } from './components/logged-in/exit-dialog/exit-dialog.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { ResellerInfoDialogComponent } from './components/resellers/reseller-info-dialog/reseller-info-dialog.component';
import { ManageBrandsSheetComponent } from './components/products/manage-brands-sheet/manage-brands-sheet.component';
import { ManageCategoriesSheetComponent } from './components/products/manage-categories-sheet/manage-categories-sheet.component';
import { OrderDeliveryDialogComponent } from './components/orders/delivery-order-dialog/order-delivery-dialog.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ResellersComponent } from './components/resellers/resellers.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// Services
import { AuthService } from './shared/services/auth.service';
import { FirebaseCRUDService } from './shared/services/firebase-crud.service';
import { MessagingService } from './shared/services/messaging.service';
// Angular Material
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule(
  {
    declarations: [
      AppComponent,
      AddOrderSheetComponent,
      AddProductSheetComponent,
      AddResellerSheetComponent,
      CancelOrderDialogComponent,
      DashboardComponent,
      DeleteBrandDialogComponent,
      DeleteCategoryDialogComponent,
      DeleteProductDialogComponent,
      DeleteResellerDialogComponent,
      DeliveredOrdersListComponent,
      ExitDialogComponent,
      ForgotPasswordComponent,
      LoggedInComponent,
      ResellerInfoDialogComponent,
      ManageBrandsSheetComponent,
      ManageCategoriesSheetComponent,
      OrderDeliveryDialogComponent,
      OrdersComponent,
      ProductsComponent,
      ResellersComponent,
      SignInComponent,
      SignUpComponent,
      VerifyEmailComponent,
    ],
    imports: [
      AppRoutingModule,
      AngularFireAuthModule,
      AngularFireMessagingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularMaterialModule,
      BrowserModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    ],
    providers: [
      AuthService,
      FirebaseCRUDService,
      MessagingService
    ],
    bootstrap: [AppComponent]
  }
)

export class AppModule { }
