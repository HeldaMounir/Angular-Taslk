import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board';
import { Board } from '../../models/board.model';
import { AddBoardModalComponent } from '../modals/add-board-modal/add-board-modal';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [CommonModule , AddBoardModalComponent ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  boards: Board[] = [];
  activeBoard: Board | null = null;
  isDark = true;
  showAddBoard = false;


  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.board$.subscribe(board => {
      this.boards = board;
    });

    this.boardService.activeBoard$.subscribe(board => {
      this.activeBoard = board;
    });
  }

  selectBoard(board: Board): void {
    this.boardService.setActiveBoard(board);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }
  onBoardAdded(board: Board): void {
  this.boardService.addBoard(board);
  this.showAddBoard = false;
}
}