import { Component, ViewChild } from '@angular/core';
import { AddProductSheetComponent } from './add-product-sheet/add-product-sheet.component';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

  isLoadingData: boolean;
  dataSource: any;
  tableColumns: string[];
  @ViewChild(MatSort) sort: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;

    this.tableColumns = [
      'name',
      'brandCode',
      'brand',
      'category',
      'crudIcons'
    ];

    this.crudService.getProducts().subscribe(
      products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openAddProductSheet(product: any) {
    this.bottomSheet.open(AddProductSheetComponent, {data: product});
  }


  openDeleteProductDialog(product: any) {
    const dialogRef =  this.dialog.open(DeleteProductDialogComponent, {data: product});
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.crudService.deleteProduct(product.id)
          .then(
            () => {
              this.snackBar.open(`🟢 El artículo ${product.name} ha sido eliminado`, 'CERRAR');
            }
          );
        }
      }
    );
  }

}
