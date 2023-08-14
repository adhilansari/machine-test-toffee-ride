import { Component, DestroyRef, inject } from '@angular/core';
import { IEmployee } from 'src/app/models/employee.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  employees!: IEmployee[];
  destroyRef = inject(DestroyRef);
  empService = inject(EmployeeService)
  searchKey!:string;
  constructor( ) { }
  ngOnInit(): void {
    this.empService.getEmployees().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:IEmployee[]) => {
      this.employees = res
    })
  }
}
