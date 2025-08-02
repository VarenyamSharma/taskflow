import { User, Task } from '../types';
import { hashPassword, comparePassword, generateToken } from './auth';

// Simulated API responses (in real app, these would be HTTP requests)
class TaskAPI {
  private users: (User & { password: string })[] = [];
  private tasks: Task[] = [];

  constructor() {
    // Load data from localStorage
    const savedUsers = localStorage.getItem('taskapp_users');
    const savedTasks = localStorage.getItem('taskapp_tasks');
    
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  private saveToStorage() {
    localStorage.setItem('taskapp_users', JSON.stringify(this.users));
    localStorage.setItem('taskapp_tasks', JSON.stringify(this.tasks));
  }

  async register(username: string, email: string, password: string): Promise<{ user: User; token: string }> {
    // Check if user already exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await hashPassword(password);
    const user: User & { password: string } = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    this.users.push(user);
    this.saveToStorage();

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId);
  }

  async createTask(userId: string, taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const task: Task = {
      id: Date.now().toString(),
      userId,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tasks.push(task);
    this.saveToStorage();
    return task;
  }

  async updateTask(userId: string, taskId: string, updates: Partial<Task>): Promise<Task> {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId && t.userId === userId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveToStorage();
    return this.tasks[taskIndex];
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId && t.userId === userId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks.splice(taskIndex, 1);
    this.saveToStorage();
  }
}

export const api = new TaskAPI();