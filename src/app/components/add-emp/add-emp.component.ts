import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
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
  empService = inject(EmployeeService)
  formBuilder = inject(FormBuilder)
  toast = inject(HotToastService)
  datePipe = inject(DatePipe)
  constructor() { }

  ngOnInit() {
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
    const formattedDOB = this.datePipe.transform(this.empForm.value.empDateOfBirth, 'dd-MM-yyyy');
    const formattedDOJ = this.datePipe.transform(this.empForm.value.empDateOfJoining, 'dd-MM-yyyy');

    // FORMATTING DATE
    this.empForm.patchValue({empDateOfBirth: formattedDOB})
    this.empForm.patchValue({empDateOfJoining: formattedDOJ})

    this.empService.addEmployee(this.empForm.value).pipe(takeUntilDestroyed(this.destroyRef),
    this.toast.observe({
      loading: 'Saving...',
      success: 'Employee added successfully!',
      error: 'Email or phoneNo already exist.. or internal error found!!'
    })).subscribe()
    this.empForm.reset()
  }

  get FC() {
    return this.empForm.controls;
  }
}

