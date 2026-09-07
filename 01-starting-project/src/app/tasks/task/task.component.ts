import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({}) taskObj?: {
    id: string;
    userId: string;
    title: string;
    summary: string;
    dueDate: string;
  };

  @Output() deleteEventFromChildToParent = new EventEmitter<string>();

  completeButtonClickHandler() {
    this.deleteEventFromChildToParent.emit(this.taskObj?.id)
  }

}

