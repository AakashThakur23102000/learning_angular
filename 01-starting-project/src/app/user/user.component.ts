import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input() name!: string;
  @Input() selectedUserId!: string | null;

  @Output() userSelect = new EventEmitter();
  onUserSelect() {
    this.userSelect.emit(this.id)
  }
}
