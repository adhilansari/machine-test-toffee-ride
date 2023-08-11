import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/models/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent {

  empEditForm!: FormGroup
  empId!: string
  empData!: IEmployee
  destroyRef = inject(DestroyRef)
  maxBirthDate!: string;
  defaultDateOfBirth!:any
  constructor(private empService: EmployeeService, private formBuilder: FormBuilder, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let auxDate = this.empService.substractYearsToDate(new Date(), 17);
    this.maxBirthDate = this.empService.getDateFormateForSearch(auxDate);

        // Form group creation
        this.empEditForm = this.formBuilder.group({
          empFirstName: ['', [Validators.required]],
          empLastName: ['', [Validators.required]],
          empGender: ['', [Validators.required]],
          empDateOfBirth: ['', []],
          empDateOfJoining: ['', []],
          empPhoneNumber: ['', []],
          empEmailId: ['', []],
          empHomeAddrLine1: ['', []],
          empHomeAddrLine2: ['', []],
          empHomeAddrStreet: ['', []],
          empHomeAddrDistrict: ['', []],
          empHomeAddrState: ['', []],
          empHomeAddrCountry: ['', []],
          empHomeAddrPinCode: ['', []]
        });

    this.router.params.subscribe(res => {
      this.empId = res.id
    });

    this.empService.getEmployeeById(this.empId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      this.empData = res

      this.defaultDateOfBirth = this.empService.getDateFormateForSearch(new Date(this.empData.empDateOfBirth));
      console.log(this.defaultDateOfBirth);
      console.log(this.empData.empDateOfBirth);
      console.log(new Date(new Date().toDateString()));




      this.empEditForm.setValue({
        empFirstName: this.empData.empFirstName,
        empLastName: this.empData.empLastName,
        empGender: this.empData.empGender,
        empDateOfBirth: this.empData.empDateOfBirth,
        empDateOfJoining: this.empData.empDateOfJoining,
        empPhoneNumber: this.empData.empPhoneNumber,
        empEmailId: this.empData.empEmailId,
        empHomeAddrLine1: this.empData.empHomeAddrLine1,
        empHomeAddrLine2: this.empData.empHomeAddrLine2,
        empHomeAddrStreet: this.empData.empHomeAddrStreet,
        empHomeAddrDistrict: this.empData.empHomeAddrDistrict,
        empHomeAddrState: this.empData.empHomeAddrState,
        empHomeAddrCountry: this.empData.empHomeAddrCountry,
        empHomeAddrPinCode: this.empData.empHomeAddrPinCode
      })
      console.log(this.empEditForm.value);

    })


  };

  update() {
    const formData = this.empEditForm.value;
    this.empService.updateEmployee(this.empId, formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  get FC() {
    return this.empEditForm.controls
  };

}


