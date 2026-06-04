import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { Subtasks } from '../../../models/subtask.model';
import { Board } from '../../../models/board.model';
import { FormsModule } from '@angular/forms';
import { Delete } from '../delete/delete';


@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule , FormsModule , Delete],
  templateUrl: './task-detail-modal.html',
  styleUrl: './task-detail-modal.css'
})
export class TaskDetailModalComponent {

  @Input() task!: Task;
  @Input() board!: Board;

  @Output() closed = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<Task>();

showDeleteModal = false;

  menuOpen = false;

  get completedCount(): number {
    return this.task.subtasks.filter(s => s.isCompleted).length;
  }

  toggleSubtask(subtask: Subtasks): void {
    subtask.isCompleted = !subtask.isCompleted;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  close(): void {
    this.closed.emit();
  }
  openDeleteModal(): void {
  this.menuOpen = false;
  this.showDeleteModal = true;
}

onDeleteConfirmed(): void {
  this.taskDeleted.emit(this.task);
  this.closed.emit();
}
}