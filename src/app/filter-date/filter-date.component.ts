import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  DOB: Date;
  created: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, DOB: new Date(2016, 11, 24), created: new Date(2015, 15, 24) },
  { position: 2, name: 'Helium', weight: 4.0026, DOB: new Date(2018, 18, 24), created: new Date(2018, 11, 24) },
  { position: 3, name: 'Lithium', weight: 6.941, DOB: new Date(1993, 6, 12), created: new Date(1999, 12, 15) },
  { position: 4, name: 'Beryllium', weight: 9.0122, DOB: new Date(2001, 7, 6), created: new Date(2011, 10, 6) },
  { position: 5, name: 'Boron', weight: 10.811, DOB: new Date(2020, 5, 9), created: new Date(2020, 5, 9) },
  { position: 6, name: 'Carbon', weight: 12.0107, DOB: new Date(2008, 7, 14), created: new Date(2008, 7, 14) },
  { position: 7, name: 'Nitrogen', weight: 14.0067, DOB: new Date(1998, 11, 18), created: new Date(1998, 11, 18) },
  { position: 8, name: 'Oxygen', weight: 15.9994, DOB: new Date(2002, 2, 24), created: new Date(2002, 2, 24) },
  { position: 9, name: 'Fluorine', weight: 18.9984, DOB: new Date(2006, 4, 29), created: new Date(2006, 4, 29) },
  { position: 10, name: 'Neon', weight: 20.1797, DOB: new Date(2040, 5, 30), created: new Date(2040, 5, 30) },
];




@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css']
})



export class FilterDateComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'DOB', 'founded'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe!: DatePipe;

filterForm = new FormGroup({
    fromDate: new FormControl(Date),
    toDate: new FormControl(Date),
});

get fromDate() { return this.filterForm.get('fromDate')?.value; }
get toDate() { return this.filterForm.get('toDate')?.value; }
  

  constructor() {
    this.pipe = new DatePipe('fr');
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
         return data.DOB >= this.fromDate && data.DOB <= this.toDate ;
        
     }
      return true;
    }
   }

  ngOnInit(): void {
   
  }
applyFilter(){
  this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB>=this.fromDate && x.DOB<=this.toDate))
}

clearFilter(){
  this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
}
  
  //applyFilter(event:Event){
   // console.log('oui !!!!')
   // const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim();
    //this.dataSource.filter = ''+Math.random();
    //his.dataSource.filterPredicate = this.filterPeriod(data,filter).valueOf
  //}
  //filterPeriod(data: PeriodicElement, filter: string) {
   // return data.DOB > this.fromDate.value() && data.DOB < this.toDate.value();
  ///}
 

}
