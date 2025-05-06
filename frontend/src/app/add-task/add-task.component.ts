import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Status } from '../status.enum';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Task } from '../task';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, EditTaskComponent],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  taskName: string;
  taskDescription: string;

  constructor(
    private readonly taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    console.log('Task Name:', this.taskName);
    console.log('Task Description:', this.taskDescription);
    const newTask = <Task>{
      title: this.taskName,
      status: Status.ToDo,
      description: this.taskDescription,
      assignedTo:"test"
    }
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.notificationService.sendMessage("BroadcastMessage", [task])
        this.router.navigate(['/']);
      });
  }
}
