import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskClicked = new EventEmitter<Task>();

  get completedCount() {
    return this.task.subtasks.filter(s => s.isCompleted).length;
  }

  get totalCount() {
    return this.task.subtasks.length;
  }

  onClick(): void {
    this.taskClicked.emit(this.task);
  }
}