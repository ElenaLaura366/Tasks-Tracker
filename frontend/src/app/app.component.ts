import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TaskGridComponent } from "./task-grid/task-grid.component";
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, TaskGridComponent, TasksViewComponent, RouterOutlet, HttpClientModule,RouterModule]
})
export class AppComponent {
    constructor(private notificationService: NotificationService) {
        this.notificationService.initWebSocket();
    }
}