import { Injectable } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { ProductModel } from './../models/product.model';
import { ResellerModel } from '../models/reseller.model';


@Injectable({
  providedIn: 'root'
})

export class FirebaseCRUDService {

  resellers: ResellerModel[];
  products: ProductModel[];
  activeOrders: OrderModel[];

  tmpDate: Date = new Date();

  constructor() { 
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


  getActiveOrders() {
    return this.activeOrders;
  }

}
