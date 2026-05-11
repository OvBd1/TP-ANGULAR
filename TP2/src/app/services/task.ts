import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private storageKey = 'tp2_tasks_v1';

  private tasks: Task[] = [
    { id: 1, title: 'Apprendre Angular', done: false, createdAt: new Date() },
    { id: 2, title: 'Construire la TodoList', done: false, createdAt: new Date() }
  ];

  private tasksSubject!: BehaviorSubject<Task[]>;

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as any[];
        this.tasks = parsed.map(p => ({ ...p, createdAt: new Date(p.createdAt) }));
      } catch (e) {
        // ignore parse errors and fall back to defaults
      }
    }
    this.tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  }

  private save(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (e) {
      // storage may fail (e.g. quota), ignore silently for now
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(title: string): void {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      createdAt: new Date()
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
    this.save();
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    this.tasksSubject.next(this.tasks);
    this.save();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
    this.save();
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(t => !t.done);
    this.tasksSubject.next(this.tasks);
    this.save();
  }
}
