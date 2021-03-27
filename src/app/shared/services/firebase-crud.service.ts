import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class FirebaseCRUDService {

  resellers: any[];
  products: any[];
  activeOrders: any[];

  constructor() { 
    this.resellers = [
      {
        
      }
    ];
    this.products = [
      {
        id: 'p0001',
        name: 'EDRECOLCHA IND MINNIE MOUSE',
        brandCode: 'CFUI272'
      }
    ];
    this.activeOrders = [
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 3,
        isInStore: 3,
        isDelivered: false,
        comments: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 2,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 2,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 2,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0001',
        product: {id: 'p0001', brandCode: 'CFUI272', name: 'EDRECOLCHA IND MINNIE MOUSE'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 1,
        isInStore: false,
        isDelivered: false,
        comments: ''
      },
      {
        id: 'o0002',
        product: {id: 'p0002', brandCode: 'PIMI0013', name: 'PROTECTOR COLCHON IMPERMEABLE IND'},
        reseller: {id: 'r0001', name: 'Rosa Mora'},
        date: '1616606158393',
        amount: 2,
        isInStore: 1,
        isDelivered: false,
        comments: ''
      }
    ];
  }


  getActiveOrders() {
    return this.activeOrders;
  }

}
