import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfessionalCycle } from '../models/professionalCycle';
import { Observable } from 'rxjs';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class ProfessionalCycleService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ProfessionalCycle[]> {
    return this.http.get<ProfessionalCycle[]>(`${apiUrl}professional-cycle`);
  }
}