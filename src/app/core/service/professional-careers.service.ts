import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfessionalCareers } from '../models/professionalCareers';
import { Observable } from 'rxjs';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class ProfessionalCareersService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ProfessionalCareers[]> {
    return this.http.get<ProfessionalCareers[]>(`${apiUrl}professional-careers`);
  }

}