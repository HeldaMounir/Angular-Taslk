import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService } from '../../services/board';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';

import { ColumnComponent } from '../column/column';
import { TaskDetailModalComponent } from '../modals/task-detail-modal/task-detail-modal';
import { AddTaskModalComponent } from '../modals/add-task-modal/add-task-modal';
import { AddColumnModalComponent } from '../modals/add-column-modal/add-column-modal';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ColumnComponent,
    TaskDetailModalComponent,
    AddTaskModalComponent,
    AddColumnModalComponent
  ],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class BoardComp implements OnInit {

  activeBoard: Board | null = null;
  selectedTask: Task | null = null;

  showAddTask = false;
  showAddColumn = false;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.activeBoard$.subscribe(board => {
      this.activeBoard = board;
    });
  }

  onTaskClicked(task: Task): void {
    this.selectedTask = task;
  }

  closeModal(): void {
    this.selectedTask = null;
  }

  onAddTask(): void {
    this.showAddTask = true;
  }

  onTaskAdded(task: Task): void {
    if (!this.activeBoard) return;

    const column = this.activeBoard.columns.find(
      c => c.name === task.status
    );

    if (column) {
      column.tasks.push(task);
    }

    this.showAddTask = false;
  }

  closeAddTaskModal(): void {
    this.showAddTask = false;
  }

  onTaskDeleted(task: Task): void {
    if (!this.activeBoard) return;

    this.activeBoard.columns.forEach(column => {
      column.tasks = column.tasks.filter(
        t => t.title !== task.title
      );
    });

    this.selectedTask = null;
  }

  onColumnAdded(name: string): void {
    if (!this.activeBoard) return;

    this.activeBoard.columns.push({
      name: name,
      tasks: []
    });

    this.showAddColumn = false;
  }

  onBoardDeleted(): void {
    if (!this.activeBoard) return;

    this.boardService.deleteBoard(this.activeBoard);
  }
}