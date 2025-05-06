import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { Status } from '../status.enum';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ CommonModule, FilterComponent, MatIcon, EditTaskComponent],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[];
  filteredTasks: Task[];
  
  ngOnInit () {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks];
    });
  }
  
  handleStatusSelected(selectedStatus: Status): void {
    this.filteredTasks = this.tasks.filter(task => task.status === selectedStatus);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
        data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.taskService.editTask(task).subscribe(() => {
        console.log('Task edited successfully:', task);
      });
    });
  }

  constructor(
    private readonly taskService: TaskService,
    private dialog: MatDialog,
  ) {}

}
