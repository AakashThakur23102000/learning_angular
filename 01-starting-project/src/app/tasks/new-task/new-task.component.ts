import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() addTaskCloseEventEmitter = new EventEmitter<void>()
  @Output() addFormSubmitSendValuesToParent = new EventEmitter<{
    enteredTitle: string,
    enteredSummary: string,
    enteredDate: string
  }>();

  enteredTitle = signal("");
  enteredSummary = signal("");
  enteredDate = signal("");


  handleInModalClose() {
    this.addTaskCloseEventEmitter.emit()
  }

  handleNewFormSubmit() {
    this.addFormSubmitSendValuesToParent.emit({
      enteredTitle: this.enteredTitle(),
      enteredSummary: this.enteredSummary(),
      enteredDate: this.enteredDate()
    })
  }
}
