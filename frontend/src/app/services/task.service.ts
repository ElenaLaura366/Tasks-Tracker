import { Injectable } from '@angular/core';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl="http://localhost:5299/Task";
  //private baseURL="https://tasksapi20240226164535.azurewebsites.net/api/Tasks"
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  headers: HttpHeaders | { [header: string]: string | string[]; };

  constructor(
    private readonly http: HttpClient
  ) { }

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(newTask: Task) {
    console.log(newTask);
    return this.http.post<Task>(this.baseUrl, newTask, { headers: this.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task) {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
  
  deleteTask(task: Task) {
    return this.http.delete<void>(`${this.baseUrl}/${task.id}`,{ headers: this.headers, responseType: 'text' as 'json' });
  }
  
  updateTaskStatus(task: Task){
    return this.http.put<void>(`${this.baseUrl}/${task.id}`, task);
  }

}