import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete',
  imports: [CommonModule],
  templateUrl: './delete.html',
  styleUrl: './delete.css'
})
export class Delete {

  @Input() type: 'task' | 'board' = 'task';
  @Input() name: string = '';

  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  get title(): string {
    return `Delete this ${this.type}?`;
  }

  get message(): string {
    if (this.type === 'task') {
      return `Are you sure you want to delete the '${this.name}' task and its subtasks? This action cannot be reversed.`;
    }
    return `Are you sure you want to delete the '${this.name}' board? This action will remove all columns and tasks and cannot be reversed.`;
  }

  confirm(): void {
    this.confirmed.emit();
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
