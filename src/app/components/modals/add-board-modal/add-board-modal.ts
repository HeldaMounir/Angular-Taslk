import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Board } from '../../../models/board.model';

@Component({
  selector: 'app-add-board-modal',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-board-modal.html',
})
export class AddBoardModalComponent {

  @Output() closed = new EventEmitter<void>();
  @Output() boardAdded = new EventEmitter<Board>();

  boardForm: FormGroup;

  private dotColors = ['#49C4E5', '#8471F2', '#67E2AE', '#EA5555', '#635FC7'];

  constructor(private fb: FormBuilder) {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      columns: this.fb.array([
        this.createColumn('Todo'),
        this.createColumn('Doing'),
      ])
    });
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  get name() { return this.boardForm.get('name'); }

  createColumn(value = ''): FormGroup {
    return this.fb.group({
      name: [value, Validators.required]
    });
  }

  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number): void {
    this.columns.removeAt(index);
  }

  onSubmit(): void {
    if (this.boardForm.invalid) {
      this.boardForm.markAllAsTouched();
      return;
    }

    const newBoard: Board = {
      name: this.boardForm.value.name,
      columns: this.boardForm.value.columns.map((col: any, i: number) => ({
        name: col.name,
        tasks: [],
        dotColor: this.dotColors[i % this.dotColors.length]
      }))
    };

    this.boardAdded.emit(newBoard);
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}