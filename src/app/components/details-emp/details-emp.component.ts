import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/models/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-details-emp',
  templateUrl: './details-emp.component.html',
  styleUrls: ['./details-emp.component.scss']
})
export class DetailsEmpComponent {

  constructor(private empService:EmployeeService,private route:ActivatedRoute , private router:Router){}
  empId!:string
  employeeData!: IEmployee;
  destroyRef=inject(DestroyRef);

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.empId=res.id
    })

    this.empService.getEmployeeById(this.empId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
      this.employeeData = res

    })
  }

  deleteEmp(id:number){
    this.empService.deleteEmployee(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
    this.router.navigateByUrl('/')
  }

}

