import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-export-to-pdf-dialog',
  templateUrl: './export-to-pdf-dialog.component.html',
  styleUrls: ['./export-to-pdf-dialog.component.scss']
})


export class ExportToPdfDialogComponent {

  @ViewChild('PdfHtmlDiv') pdfHtmlDiv!: ElementRef<HTMLElement>;
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
    console.table(this.selectedOrders)
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
            const bufferX = 100;
            const bufferY = 100;
            const imgProps = (pdfDocument).getImageProperties(img);
            const pdfWidth = pdfDocument.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdfDocument.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'MEDIUM');
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

}
