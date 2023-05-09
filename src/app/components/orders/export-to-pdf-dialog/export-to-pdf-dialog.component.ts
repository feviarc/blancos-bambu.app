import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64Logo } from '../../../../../src/environments/environment.app'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-export-to-pdf-dialog',
  templateUrl: './export-to-pdf-dialog.component.html',
  styleUrls: ['./export-to-pdf-dialog.component.scss']
})


export class ExportToPdfDialogComponent {

  @ViewChild('PdfHtmlDiv') pdfHtmlDiv!: ElementRef<HTMLElement>;
  isGeneratingPdf: boolean;
  selectedOrders: any;
  orders: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.isGeneratingPdf = false;
    this.orders = [];
    this.selectedOrders = data
    .filter(
      (order:any) => order.form.selectedOrderFormControl.value == true && (order.amount - order.isInStore != 0)
    )
    .map(
      (order:any) => ({
        amount: order.amount - order.isInStore,
        productName: order.productName,
        productBrandCode: order.productBrandCode
      })
    );

    this.orders = this.summarizeOrders(this.selectedOrders);
  }


  saveOrdersToPdf() {
    const pdfConfig = {backgroundColor: 'white'};
    const pdfDocument = new jsPDF('p', 'pt', 'letter' );
    this.isGeneratingPdf = true;

    setTimeout(
      () => {
        this.createImageFromCanvas(this.pdfHtmlDiv.nativeElement, pdfConfig)
        .then(
          canvas => {
            const img = canvas.toDataURL('image/PNG');
            // Add image canvas to PDF
            const bufferX = 20;
            const bufferY = 20;
            const imgProps = pdfDocument.getImageProperties(img);
            const pdfWidth = pdfDocument.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdfDocument.addImage(base64Logo, 'PNG', bufferX, bufferY, 128, 83, undefined, 'MEDIUM');
            pdfDocument.addImage(img, 'PNG', bufferX, bufferY+103, pdfWidth, pdfHeight, undefined, 'MEDIUM');
            return pdfDocument;
          }
        )
        .then(
          pdfDocument => {
            const now = new Date();
            pdfDocument.save(`BlancosBAMBU--${now.toLocaleDateString()}--${now.toLocaleTimeString()}.pdf`);
          }
        )
        .finally(
          () => {
            this.isGeneratingPdf = false;
          }
        );
      }
    , 0);
  }


  async createImageFromCanvas(htmlElement: HTMLElement, pdfConfig:any) {
    const canvas = await html2canvas(htmlElement, pdfConfig);
    return canvas;
  }


  summarizeOrders(selectedOrders: any) {
    const orders: any = [];
    selectedOrders.forEach(
      (selectedOrder:any) => {
        let orderFound = false;
        orders.forEach((order:any) => {
          if(selectedOrder['productBrandCode'] === order['productBrandCode']) {
            order['amount'] += selectedOrder['amount'];
            orderFound = true;
          }
        });
        if(!orderFound) {
          orders.push(selectedOrder);
        }
      }
    );
    return orders;
  }

}
