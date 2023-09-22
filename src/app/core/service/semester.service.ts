import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Semester } from '../models/semester';
import { Observable } from 'rxjs';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Semester[]> {
    return this.http.get<Semester[]>(`${apiUrl}semester`);
  }

  /**
   * 
   * @returns Listar semestres segun su ciclo
   */
  public getAllByCycleId(professionalCycle: any): Observable<Semester[]> {
    return this.http.get<Semester[]>(`${apiUrl}semester/get-cycle?professionalCycle=`+professionalCycle);
    // return this.http.get<any>(`${apiUrl}reserva/customer/${cardId}`);
  }
}