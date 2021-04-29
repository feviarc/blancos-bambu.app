import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup
} from '@angular/fire/firestore';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})

export class FirebaseCRUDService {

  private dbPath: any;
  private brandsRef: AngularFirestoreCollection;
  private productsRef: AngularFirestoreCollection;
  private resellersRef: AngularFirestoreCollection;
  private ordersRef: AngularFirestoreCollectionGroup;
  

  constructor(private db: AngularFirestore) {
    this.dbPath = {
      brands: 'brands',
      products: 'products',
      resellers: 'resellers',
      orders: 'orders'
    };
    this.brandsRef = db.collection(this.dbPath.brands,
      query => {
        return query.orderBy('name', 'asc');
      }
    
    );
    this.productsRef = db.collection(this.dbPath.products);
    this.resellersRef = db.collection(this.dbPath.resellers);
    this.ordersRef = db.collectionGroup(this.dbPath.orders, 
      query => {
        return query.where('status.isDelivered', '==', false).orderBy('status.registerDate','desc')
      }
    );
  }


  addOrder(order: Order) {
    order.id = this.db.createId();

    const orderRef = this.db
     .collection(this.dbPath.resellers)
     .doc(order.reseller.id)
     .collection(this.dbPath.orders);
     
    return orderRef.add(order);
  }


  getActiveOrders() {
    return this.ordersRef.valueChanges();
  }

  
  getAllOrders() { }


  getAllProducts() {
    return this.productsRef.valueChanges();
  }


  getBrands() {
    return this.brandsRef.valueChanges();
  }


  getDeliveredOrders() { }


  getResellers() {
    return this.resellersRef.valueChanges();
  }
  
}
