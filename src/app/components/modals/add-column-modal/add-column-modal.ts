import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-column-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-column-modal.html'
})
export class AddColumnModalComponent {

  @Output() closed = new EventEmitter<void>();
  @Output() columnAdded = new EventEmitter<string>();

  columnForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.columnForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get name() {
    return this.columnForm.get('name');
  }

  onSubmit(): void {
    if (this.columnForm.invalid) {
      this.columnForm.markAllAsTouched();
      return;
    }

    this.columnAdded.emit(this.columnForm.value.name);
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}