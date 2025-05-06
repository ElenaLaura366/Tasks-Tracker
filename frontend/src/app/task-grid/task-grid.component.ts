import { Component, Input } from '@angular/core';
import { Task } from '../task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Status } from '../status.enum';
import { FilterComponent } from "../filter/filter.component";

@Component({
    selector: 'app-task-grid',
    standalone: true,
    providers: [TaskService],
    templateUrl: './task-grid.component.html',
    styleUrl: './task-grid.component.scss',
    imports: [TaskCardComponent, CommonModule, EditTaskComponent, MatIcon, FilterComponent]
})
export class TaskGridComponent {
  tasks: Task[];
  filteredTasks: Task[];

  constructor(
    private readonly taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit () {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  handleStatusSelected(selectedStatus: Status): void {
    this.filteredTasks = this.tasks.filter(task => task.status === selectedStatus);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
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

}
