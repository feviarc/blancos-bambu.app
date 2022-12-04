import { Component, ViewChild } from '@angular/core';
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

  constructor(private crudService: FirebaseCRUDService) {
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
    console.log(reseller);
  }


  openDeleteResellerDialog(reseller: any) {
    console.log(reseller);
  }

}
