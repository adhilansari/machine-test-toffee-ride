import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../models/employee.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  empFirstName?:boolean;
  id?:boolean
  empHomeAddrDistrict?:boolean

  transform(values: IEmployee[], searchKey: string): any {
    if (!searchKey) {
      return values
    }
    if (values && values.length) {
      return values.filter((value: IEmployee) => {
        this.empFirstName = value.empFirstName.toLowerCase().includes(searchKey.toLowerCase());
        this.id = value.id?.toString().includes(searchKey.toLowerCase());
        this.empHomeAddrDistrict = value.empHomeAddrDistrict.toLowerCase().includes(searchKey)

        return this.empFirstName || this.id || this.empHomeAddrDistrict
      })
    }
  }
}
