import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/models/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { HotToastService } from '@ngneat/hot-toast';


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
  empService = inject(EmployeeService)
  formBuilder = inject(FormBuilder)
  router = inject(ActivatedRoute)
  toast = inject(HotToastService)
  maxBirthDate!: string;
  defaultDateOfBirth!:any
  constructor() { }

  ngOnInit(): void {
        // Form group creation
        this.empEditForm = this.formBuilder.group({
          empFirstName: ['', [Validators.required]],
          empLastName: ['', [Validators.required]],
          empGender: ['', [Validators.required]],
          empDateOfBirth: ['',[Validators.required,Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
          empDateOfJoining: ['',[Validators.required,Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
          empPhoneNumber: ['', [Validators.required,Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
          empEmailId: ['', [Validators.required]],
          empHomeAddrLine1: ['', [Validators.required]],
          empHomeAddrLine2: ['', [Validators.required]],
          empHomeAddrStreet: ['', [Validators.required]],
          empHomeAddrDistrict: ['', [Validators.required]],
          empHomeAddrState: ['', [Validators.required]],
          empHomeAddrCountry: ['', [Validators.required]],
          empHomeAddrPinCode: ['', [Validators.required]]
        });

    this.router.params.subscribe(res => {
      this.empId = res.id
    });

    this.empService.getEmployeeById(this.empId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
      this.empData = res

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
    })


  };

  update() {
    if (this.empEditForm.invalid) {
      console.log(this.empEditForm.valid);

      this.empEditForm.markAllAsTouched()
      this.toast.error('please fill required fields')
      return
    }
    const formData = this.empEditForm.value;
    this.empService.updateEmployee(this.empId, formData).pipe(takeUntilDestroyed(this.destroyRef),
    this.toast.observe({
      loading: 'Saving...',
      success: 'Employee Updated successfully!',
    })).subscribe()
  }

  get FC() {
    return this.empEditForm.controls
  };

}


