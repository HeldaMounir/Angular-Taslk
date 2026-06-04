import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { BoardComp } from './components/board/board';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Sidebar,
    Header,
    BoardComp
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angulartask');
}