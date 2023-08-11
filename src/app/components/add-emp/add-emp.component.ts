import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { IEmployee } from 'src/app/models/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent {
  empForm!: FormGroup
  maxBirthDate!: string;
  destroyRef = inject(DestroyRef)
  constructor(private empService: EmployeeService, private formBuilder: FormBuilder, private toast: HotToastService) { }

  ngOnInit() {
    // let auxDate = this.empService.substractYearsToDate(new Date(), 17);
    // this.maxBirthDate = this.empService.getDateFormateForSearch(auxDate);

    // Form group creation
    this.empForm = this.formBuilder.group({
      empFirstName: ['', [Validators.required]],
      empLastName: ['', [Validators.required]],
      empGender: ['', [Validators.required]],
      empDateOfBirth: ['', [Validators.required]],
      empDateOfJoining: ['', [Validators.required]],
      empPhoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      empEmailId: ['', [Validators.required, Validators.email]],
      empHomeAddrLine1: ['', [Validators.required]],
      empHomeAddrLine2: ['', [Validators.required]],
      empHomeAddrStreet: ['', [Validators.required]],
      empHomeAddrDistrict: ['', [Validators.required]],
      empHomeAddrState: ['', [Validators.required]],
      empHomeAddrCountry: ['', [Validators.required]],
      empHomeAddrPinCode: ['', [Validators.required]]
    });

  }

  // ADD NEW EMPLOYEE
  submit() {
    if (this.empForm.invalid) {
      console.log(this.empForm.valid);

      this.empForm.markAllAsTouched()
      this.toast.error('please fill required fields')
      return
    }

    const formattedDate = this.empService.getDateFormateForSearch(this.empForm.value.empDateOfBirth)
    console.log(formattedDate);


    // this.empService.addEmployee(this.empForm.value).pipe(takeUntilDestroyed(this.destroyRef),
    // this.toast.observe({
    //   loading: 'Saving...',
    //   success: 'Employee added successfully!',
    //   error: 'Email or phoneNo already exist.. or internal error found!!'
    // })).subscribe()







    // this.empForm.reset()
  }

  get FC() {
    return this.empForm.controls;
  }



}

