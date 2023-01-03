import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';
import { AddResellerSheetComponent } from './add-reseller-sheet/add-reseller-sheet.component'
import { DeleteResellerDialogComponent } from './delete-reseller-dialog/delete-reseller-dialog.component';
import { ResellerInfoDialogComponent } from './reseller-info-dialog/reseller-info-dialog.component';


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
    const ADD_RESELLER_SHEET = {data: reseller};
    const sheetRef = this.bottomSheet.open(AddResellerSheetComponent, ADD_RESELLER_SHEET);
  }


  openDeleteResellerDialog(reseller: any) {
    const DELETE_RESELLER_DIALOG = {data: reseller};
    const dialogRef = this.dialog.open(DeleteResellerDialogComponent, DELETE_RESELLER_DIALOG);
    dialogRef.afterClosed().subscribe(
      result => {
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


  openResellerInfoDialog(reseller: any) {
    const RESELLER_INFO_DIALOG = {
      data: reseller,
      disableClose: true,
      width: '800px'
    }
    const dialogRef = this.dialog.open(ResellerInfoDialogComponent, RESELLER_INFO_DIALOG);
  }

}
