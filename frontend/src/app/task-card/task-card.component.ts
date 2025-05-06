import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatSelectModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task: Task;

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

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task deleted successfully:', task);
    });
  }

  updateStatus(task: Task): void {
    this.taskService.updateTaskStatus(task).subscribe(() => {
      console.log('Task status updated successfully:', task);
    });
  }

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
  ) {}
}
