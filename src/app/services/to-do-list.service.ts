import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Todos } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private _http: HttpClient) { }

  getToDoList() : Observable<Todos[]> {
    return this._http.get<Todos[]>(baseUrl + 'todos');
  }

}
