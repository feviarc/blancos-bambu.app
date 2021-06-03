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
  private activeOrdersRef: AngularFirestoreCollectionGroup;
  private deliveredOrdersRef: AngularFirestoreCollectionGroup;
  

  constructor(private db: AngularFirestore) {
    this.dbPath = {
      brands: 'brands',
      products: 'products',
      resellers: 'resellers',
      orders: 'orders'
    };

    this.productsRef = db.collection(this.dbPath.products);
    this.resellersRef = db.collection(this.dbPath.resellers);

    this.brandsRef = db.collection(this.dbPath.brands,
      query => {
        return query.orderBy('name', 'asc');
      }
    );

    this.activeOrdersRef = db.collectionGroup(this.dbPath.orders, 
      query => {
        return query.where('status.isDelivered', '==', false).orderBy('status.registerDate','desc');
      }
    );

    this.deliveredOrdersRef = db.collectionGroup(this.dbPath.orders,
      query => {
        return query.where('status.isDelivery', '==', true).orderBy('status.registerDate', 'desc');
      }
    );
  }


  addOrder(order: Order) {
    order.id = this.db.createId();

    const orderRef = this.db
     .collection(this.dbPath.resellers)
     .doc(order.reseller.id)
     .collection(this.dbPath.orders)
     .doc(order.id);
     
    return orderRef.set(order);
  }


  deleteOrder(id: string, resellerID: string) {
    const orderRef = this.db
    .collection(this.dbPath.resellers)
    .doc(resellerID)
    .collection(this.dbPath.orders)
    .doc(id);

    return orderRef.delete();
  }


  updateOrder(id: string, resellerID: string, updatedProperty: any) {
    const orderRef = this.db
     .collection(this.dbPath.resellers)
     .doc(resellerID)
     .collection(this.dbPath.orders)
     .doc(id);
     
    return orderRef.update(updatedProperty);
  }


  getActiveOrders() {
    return this.activeOrdersRef.valueChanges();
  }

  
  getDeliveredOrders() {
    return this.deliveredOrdersRef.valueChanges();
  }


  getAllProducts() {
    return this.productsRef.valueChanges();
  }


  getProductsByBrand(brand: string) {
    const productsRef = this.db.collection(this.dbPath.products,
      query => {
        return query.where('brand', '==', brand);
      }
    );
    return productsRef.valueChanges();
  }


  getBrands() {
    return this.brandsRef.valueChanges();
  }


  getResellers() {
    return this.resellersRef.valueChanges();
  }

}
