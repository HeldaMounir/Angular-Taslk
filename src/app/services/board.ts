import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private board = new BehaviorSubject<Board[]>([]);
  private activeBoard = new BehaviorSubject<Board | null>(null);

  board$ = this.board.asObservable();
  activeBoard$ = this.activeBoard.asObservable();

  constructor(private http: HttpClient) {
    this.loadBoards();
  }

  private loadBoards(): void {
    this.http.get<{ boards: Board[] }>('assets/data.json')
      .subscribe(response => {
        this.board.next(response.boards);
        this.activeBoard.next(response.boards[0]);
      });
  }

  setActiveBoard(board: Board): void {
    this.activeBoard.next(board);
  }

  deleteBoard(board: Board): void {

    const updated = this.board.value.filter(
      b => b.name !== board.name
    );

    this.board.next(updated);

    this.activeBoard.next(
      updated.length > 0 ? updated[0] : null
    );
  }
}