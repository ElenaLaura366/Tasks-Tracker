import { Component } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { Task } from '../task';
import { Status } from '../status.enum';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from '../filter/filter.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [TaskGridComponent, CommonModule, TaskCardComponent, TaskListComponent, MatIconModule, FilterComponent, AddTaskComponent],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss'
})
export class TasksViewComponent {
  isList: boolean = true;
  notificationMessage: string;
  constructor(private notificationService: NotificationService) 
  {
    this.notificationMessage = 'Loading tasks...';
  }
  ngOnInit(): void {
  this.notificationService.notificationSubject.subscribe( hasNotifications => this.notificationMessage = hasNotifications ? "New notifications, please refresh the page" : "");
  }

}

