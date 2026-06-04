import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board';
import { Board } from '../../models/board.model';
import { Delete } from '../modals/delete/delete';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule , Delete],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  activeBoard: Board | null = null;
  menuOpen = false;
  showDeleteModal = false;


  @Output() addTaskClicked = new EventEmitter<void>();
  @Output() boardDeleted = new EventEmitter<void>();


  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.activeBoard$.subscribe(board => {
      this.activeBoard = board;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onAddTask(): void {
    this.addTaskClicked.emit();
  }
  openDeleteModal(): void {
  this.menuOpen = false;
  this.showDeleteModal = true;
}

onDeleteConfirmed(): void {
  this.boardDeleted.emit();
}
}