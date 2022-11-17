import { Component } from '@angular/core';


@Component({
  selector: 'app-manage-categories-sheet',
  templateUrl: './manage-categories-sheet.component.html',
  styleUrls: ['./manage-categories-sheet.component.scss']
})

export class ManageCategoriesSheetComponent {

  displayedColumns: string[] = ['name', 'removeButton'];

  categories = [
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
    {name: 'Beach ball', removeButton: 'REMOVE'},
    {name: 'Towel', removeButton: 'REMOVE'},
    {name: 'Frisbee', removeButton: 'REMOVE'},
    {name: 'Sunscreen', removeButton: 'REMOVE'},
    {name: 'Cooler', removeButton: 'REMOVE'},
    {name: 'Swim suit', removeButton: 'REMOVE'},
  ];


  constructor() { }

}
