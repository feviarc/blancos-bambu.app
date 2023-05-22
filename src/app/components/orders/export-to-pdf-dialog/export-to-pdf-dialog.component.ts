import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64Logo } from '../../../../../src/environments/environment.app'
import jsPDF from 'jspdf';


@Component({
  selector: 'app-export-to-pdf-dialog',
  templateUrl: './export-to-pdf-dialog.component.html',
  styleUrls: ['./export-to-pdf-dialog.component.scss']
})


export class ExportToPdfDialogComponent {

  dataSource: any[];
  displayedColumns: string[] = ['amount', 'productName', 'productBrandCode'];
  isGeneratingPdf: boolean;
  selectedOrders: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.isGeneratingPdf = false;
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
    this.dataSource = this.summarizeOrders(this.selectedOrders);
  }


  saveOrdersToPdf() {
    this.isGeneratingPdf = true;
    const now = new Date();
    const pdfDocument = new jsPDF('p', 'pt', 'letter' );

    const FONT_SIZE = 10;
    const LOGO_WIDTH = 512 / 4;
    const LOGO_HEIGHT = 304 / 4;
    const PAGE_HEIGHT = 792;
    const PAGE_WIDTH = 612;
    const PAGE_MARGIN_LEFT = 21;
    const PAGE_MARGIN_RIGHT = PAGE_WIDTH - PAGE_MARGIN_LEFT;
    const PAGE_MARGIN_TOP = PAGE_MARGIN_LEFT;
    const PAGE_MARGIN_BOTTOM = PAGE_HEIGHT - PAGE_MARGIN_LEFT;
    const PAGE_HEADER = 121;
    const PAGE_FOOTER = PAGE_HEIGHT - (PAGE_HEADER / 3);
    const PAGE_BODY = PAGE_HEADER + 30;
    const ROW_HEIGHT = 20;
    const LAST_ROW = 30;
    const RESET = 0;

    setTimeout(
      () => {
        let rowCounter = 0;
        let pageNumber = 1;

        pdfDocument.setFontSize(FONT_SIZE);
        addLogoToPage(pageNumber);
        for(let item of this.dataSource) {
          pdfDocument.text(`${item.amount},  ${item.productName} (${item.productBrandCode})`, PAGE_MARGIN_LEFT, PAGE_BODY + ROW_HEIGHT * rowCounter);
          rowCounter++;
          if(rowCounter == LAST_ROW) {
            rowCounter = RESET;
            pageNumber++;
            pdfDocument.addPage();
            addLogoToPage(pageNumber);
          }
        }
        pdfDocument.save(`BlancosBAMBU--${now.toLocaleDateString('es-mx')}--${now.toLocaleTimeString()}.pdf`);
        this.isGeneratingPdf = false;
      }
    , 0);

    function addLogoToPage(pageNumber: number) {
      pdfDocument.addImage(base64Logo, 'PNG', PAGE_MARGIN_LEFT, PAGE_MARGIN_TOP, LOGO_WIDTH, LOGO_HEIGHT, undefined, 'MEDIUM');
      pdfDocument.line(PAGE_MARGIN_LEFT, PAGE_HEADER, PAGE_MARGIN_RIGHT, PAGE_HEADER);
      pdfDocument.line(PAGE_MARGIN_LEFT, PAGE_FOOTER, PAGE_MARGIN_RIGHT, PAGE_FOOTER);
      pdfDocument.text(now.toLocaleDateString('es-mx'), PAGE_MARGIN_LEFT, PAGE_FOOTER + ROW_HEIGHT);
      pdfDocument.text(pageNumber.toString(), PAGE_MARGIN_RIGHT - 5, PAGE_FOOTER + ROW_HEIGHT);
    }
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
