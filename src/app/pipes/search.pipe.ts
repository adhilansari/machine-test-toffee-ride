import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from '../models/employee.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: IEmployee[], searchKey: string): any {
    if (!searchKey) {
      return values
    }
    if (values && values.length) {
      return values.filter((value: IEmployee) => {
        const empFirstName = value.empFirstName.toLowerCase().includes(searchKey.toLowerCase());
        const id = value.id?.toString().includes(searchKey.toLowerCase());
        const empHomeAddrDistrict = value.empHomeAddrDistrict.toLowerCase().includes(searchKey)

        return empFirstName || id || empHomeAddrDistrict
      })
    }
  }
}
