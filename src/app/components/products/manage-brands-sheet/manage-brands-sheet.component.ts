import { Component } from '@angular/core';
import { FirebaseCRUDService } from 'src/app/shared/services/firebase-crud.service';


@Component({
  selector: 'app-manage-brands-sheet',
  templateUrl: './manage-brands-sheet.component.html',
  styleUrls: ['./manage-brands-sheet.component.scss']
})

export class ManageBrandsSheetComponent {

  brands: any;
  displayedColumns: string[] = ['name'];


  constructor(private firebaseCRUD: FirebaseCRUDService) {
    firebaseCRUD.getBrands().subscribe(
      documents => {
        this.brands = documents;
        console.log(this.brands);
      }
    );
  }

}
