import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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



export class FilterDateComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'DOB', 'founded'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  pipe!: DatePipe;

  minDate!: Date|null
  maxDate!: Date|null
 

filterForm = new FormGroup({
    fromDate: new FormControl(Date),
    toDate: new FormControl(Date),
});

get fromDate() { return this.filterForm.get('fromDate')?.value; }
get toDate() { return this.filterForm.get('toDate')?.value; }




@ViewChild(MatSort) sort!: MatSort;
//@ViewChild(MatSort) paginator! : MatPaginator

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.pipe = new DatePipe('fr');
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
         return data.DOB >= this.fromDate && data.DOB <= this.toDate ;
        
     }else if (this.fromDate ){
      return data.DOB >= this.fromDate
     }else if(this.toDate){
      return data.DOB <= this.toDate
     }
     
     return true;
    }
    this.minDate = this.fromDate
    this.maxDate = this.toDate
   }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort  
  }

  ngOnInit(): void {
    //this.dataSource.sort = this.sort   
    //this.dataSource.paginator = this.paginator
  }
applyFilter(){
  const DateStart = JSON.stringify(this.fromDate)
  const DateEnd = JSON.stringify(this.toDate)
  //if (this.fromDate && this.toDate){
    console.log(DateStart)
    console.log(DateEnd)
    if (DateStart && DateEnd != undefined){
      console.log('1')
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB>=this.fromDate && x.DOB<=this.toDate))
      this.dataSource.sort = this.sort
    }
    else if (DateStart != undefined && DateEnd == undefined){
      console.log('2')
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB>=this.fromDate ))
    }
    else if (DateStart == undefined && DateEnd != undefined){
      console.log('3')
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB<=this.toDate ))
    }
  ///}
   //else if(this.fromDate != null &&  ){
    //console.log(this.fromDate)
    //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB>=this.fromDate ))
 // }else if (this.toDate){
   // console.log(this.toDate)
    //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA.filter(x=>x.DOB<=this.toDate ))
 // }
    
     
    
}
 
  //console.log('4')
  


clearFilter(){
  this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
}

fromDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
  console.log(`${type}: ${event.value}`);
  this.minDate = event.value;

  if (event.value !== null) {
    this.minDate = new Date(
      event!.value.getFullYear(),
      event!.value.getMonth(),
      event!.value.getDate() 
    );
  }
}

toDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
  this.maxDate = event.value;

  if (event.value !== null) {
    this.maxDate = new Date(
      event!.value.getFullYear(),
      event!.value.getMonth(),
      event!.value.getDate() 
    );
  }
}

announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
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
