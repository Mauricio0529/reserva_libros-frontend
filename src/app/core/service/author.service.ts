import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Author } from '../models/author';
import { Observable } from 'rxjs';
import { AuthorRequest } from '../models/authorRequest';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  constructor(private http: HttpClient, private token: TokenService) { }

  public getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${apiUrl}autor`);
  }

  public save(newAuthor: AuthorRequest): Observable<Author> {
    return this.http.post<Author>(`${apiUrl}autor`, newAuthor);
  }
}