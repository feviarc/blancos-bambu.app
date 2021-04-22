import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { Product } from './../models/product.model';
import { Reseller } from '../models/reseller.model';


@Injectable({
  providedIn: 'root'
})

export class FirebaseCRUDService {

  resellers: Reseller[];
  products: Product[];
  activeOrders: Order[];

  tmpDate: Date = new Date();

  constructor(public afs: AngularFirestore) { 
    this.resellers = [
      
    ];

    this.products = [
     
    ];

    this.activeOrders = [
      {
        id: 'o0001',
        product: { id: 'p001', name: 'COBERTOR LIGERO NUUT MAT' },
        reseller: { id: 'r001', name: 'Claudia Meza Pérez' },
        date: this.tmpDate,
        amount: 2,
        isInStore: 2,
        delivered: { status: false }
      }
    ];
  }


  addOrder() {
    console.log('ID: ', this.afs.createId());
    
  }


  getActiveOrders() {
    return this.activeOrders;
  }


}
