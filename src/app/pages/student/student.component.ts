import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  ngOnInit(): void {
    
  }

  // constructor() { }

  // ngOnInit(): void {
  // }

//   displayedColumns = ['id', 'name', 'progress', 'color'];
//   dataSource: MatTableDataSource<UserData>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort)
//   sort!: MatSort;

//   constructor() {
//     // Create 100 users
//     const users: UserData[] = [];
//     for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(users);
//   }
//   ngOnInit() {
      
//     }
//   /**
//    * Set the paginator and sort after the view init since this component will
//    * be able to query its view for the initialized paginator and sort.
//    */
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(filterValue: any) {
//    var filterValueChanged =filterValue.target.value
//    filterValueChanged = filterValueChanged.trim(); // Remove whitespace
//    filterValueChanged = filterValueChanged.toLowerCase(); // Datasource defaults to lowercase matches
//     this.dataSource.filter = filterValueChanged;
//   }
// }

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }

// /** Constants used to fill up our data base. */
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }

// }
}
