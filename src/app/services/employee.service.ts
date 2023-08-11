import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // ADD NEW EMPLOYEE
  addEmployee(data: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(environment.BASE_URL, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }



  // GET ALL EMPLOYEES
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(environment.BASE_URL);
  }

  // GET EMPLOYEE BY ID
  getEmployeeById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${environment.BASE_URL}/${id}`)
  }

  // UPDATE EMPLOYEE BY ID
  updateEmployee(id: string, empData: IEmployee) {
    return this.http.put<IEmployee>(`${environment.BASE_URL}/${id}`, empData)
  }

  // DELETE EMPLOYEE BY ID
  deleteEmployee(id: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`${environment.BASE_URL}/${id}`)
  }

  // MAX DATE
  substractYearsToDate(auxDate: Date, years: number): Date {
    auxDate.setFullYear(auxDate.getFullYear() - years);
    return auxDate;
  }

  // FORMAT DATE
  getDateFormateForSearch(date: Date | string): string{
    if (typeof date === 'string') {
      date = new Date(date);
  }

  if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date format');
  }

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;

  }
}
