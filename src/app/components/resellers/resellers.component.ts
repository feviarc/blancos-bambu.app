import { Component, ViewChild } from '@angular/core';
import { AddResellerSheetComponent } from './add-reseller-sheet/add-reseller-sheet.component'
import { DeleteResellerDialogComponent } from './delete-reseller-dialog/delete-reseller-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-resellers',
  templateUrl: './resellers.component.html',
  styleUrls: ['./resellers.component.scss']
})

export class ResellersComponent {

  isLoadingData: boolean;
  dataSource: any;
  tableColumns: string[];
  @ViewChild(MatSort) sort: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;
    this.tableColumns = [
      'firstName',
      'lastName',
      'mobilePhone',
      'crudIcons'
    ];
    this.crudService.getResellers().subscribe(
      resellers => {
        this.dataSource = new MatTableDataSource(resellers);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  applyFilter(event: Event) {
    //const filterValue = (<HTMLInputElement>event.target).value;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openAddResellerSheet(reseller: any) {
    const sheetRef = this.bottomSheet.open(AddResellerSheetComponent, {data: reseller});
  }


  openDeleteResellerDialog(reseller: any) {
    const dialogRef = this.dialog.open(DeleteResellerDialogComponent, {data: reseller});
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result)
        if (result) {
          this.crudService.deleteReseller(reseller.id).then(
            () => {
              this.snackbar.open(`😀 Se eliminó del sistema a ${reseller.firstNAme} ${reseller.lastName} y todos sus pedidos.`);
            }
          );
        }
      }
    );
  }

  openDeliveredOrdersDialog(reseller: any) { }

}
