import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComp } from '../../models/column.model';
import { TaskCardComponent } from '../task-card/task-card';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-column',
    standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './column.html',
  styleUrl: './column.css'
})
export class ColumnComponent {

  @Input() column!: ColumnComp;
    @Output() taskClicked = new EventEmitter<Task>();
 onTaskClicked(task: Task): void {
    this.taskClicked.emit(task);
  }

  getDotColor(): string {
    const colors: Record<string, string> = {
      'Todo':  '#49C4E5',
      'Doing': '#8471F2',
      'Done':  '#67E2AE',
      'Now':   '#49C4E5',
      'Next':  '#8471F2',
      'Later': '#67E2AE',
    };
    return colors[this.column.name] ?? '#828FA3';
  }
}