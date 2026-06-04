import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Board } from '../../../models/board.model';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.css'
})
export class AddTaskModalComponent implements OnInit {

  @Input() board!: Board;
  @Output() closed = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<Task>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: [this.board.columns[0].name, Validators.required],
      subtasks: this.fb.array([
        this.createSubtask()  
      ])
    });
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  createSubtask(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false]
    });
  }

  addSubtask(): void {
    this.subtasks.push(this.createSubtask());
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskAdded.emit(this.taskForm.value);
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
}