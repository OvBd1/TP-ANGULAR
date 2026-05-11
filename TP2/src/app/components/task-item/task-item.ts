import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
