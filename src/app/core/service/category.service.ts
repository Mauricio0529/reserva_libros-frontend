import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Categories } from '../models/categories';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient, private token: TokenService) { }

  public getAll(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${apiUrl}categoria`);
  }
}