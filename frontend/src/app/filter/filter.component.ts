import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from '../status.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatIconModule,  MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  statuses: Status[] = [];

  @Output() statusSelected: EventEmitter<Status> = new EventEmitter<Status>();

  ngOnInit(): void {
    this.statuses = [Status.ToDo, Status.InProgress, Status.Done];
  }

  selectStatus(status: Status): void {
    this.statusSelected.emit(status);
  }

}
