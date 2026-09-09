import { Component, inject, Input, signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksService } from '../service/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  // Imports
  @Input({ required: true }) currentUserId!: string | null


  // states
  tasksService = inject(TasksService);
  dummyTasksSignal = signal(this.tasksService.getTasksList());
  viewAddModal = signal<boolean>(false);

  // getter to get name
  get selectedUser(): {
    id: string;
    name: string;
    avatar: string;
  } | null {
    if (this.currentUserId) {
      return DUMMY_USERS.find(item => item.id === this.currentUserId) ?? null
    } else {
      return null
    }
  }
  // user specific filtered list
  get getUserSpecificTasksArr() {
    return this.dummyTasksSignal().filter((item) => item.userId === this.currentUserId);
  }

  // deleting item once completed
  deleteCompletedTask(id: string) {
    const newFilteredData = this.tasksService.getListAfterItemCompleted(id);
    this.dummyTasksSignal.set(newFilteredData)
  }

  // add task handler
  onAddTaskOpen() {
    this.viewAddModal.set(true)
  }
  onAddTaskModalSubmit(item: {
    enteredTitle: string,
    enteredSummary: string,
    enteredDate: string
  }) {
    if (!this.currentUserId) {
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      userId: this.currentUserId,
      title: item.enteredTitle,
      summary: item.enteredSummary,
      dueDate: item.enteredDate
    };
    this.tasksService.addTasksInList(newTask);
    this.dummyTasksSignal.set(this.tasksService.getTasksList());
    this.onAddTaskClose();
  }

  //modal close
  onAddTaskClose() {
    this.viewAddModal.set(false)
  }
} 
