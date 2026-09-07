import { Component, Input, signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { TaskComponent } from "./task/task.component";
import { dummyTasks } from '../dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";

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
  dummyTasksSignal = signal(dummyTasks);
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
    const newFilteredData = this.dummyTasksSignal().filter(item => item.id !== id)
    this.dummyTasksSignal.set(newFilteredData)
  }


  // add task handler
  onAddTaskOpen() {
    this.viewAddModal.set(true)
  }
  onAddTaskClose() {
    this.viewAddModal.set(false)
  }
} 
