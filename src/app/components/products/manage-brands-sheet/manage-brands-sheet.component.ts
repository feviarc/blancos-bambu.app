import { Component } from '@angular/core';


@Component({
  selector: 'app-manage-brands-sheet',
  templateUrl: './manage-brands-sheet.component.html',
  styleUrls: ['./manage-brands-sheet.component.scss']
})

export class ManageBrandsSheetComponent {

  displayedColumns: string[] = ['name', 'removeButton'];

  brands = [
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
