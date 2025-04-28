import { users, type User, type InsertUser, userInterviews, type UserInterview, type InsertUserInterview } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserInterviews(userId: number): Promise<UserInterview[]>;
  getUserInterview(id: number): Promise<UserInterview | undefined>;
  createUserInterview(interview: InsertUserInterview): Promise<UserInterview>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private interviews: Map<number, UserInterview>;
  private userIdCounter: number;
  private interviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.interviews = new Map();
    this.userIdCounter = 1;
    this.interviewIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserInterviews(userId: number): Promise<UserInterview[]> {
    return Array.from(this.interviews.values()).filter(
      (interview) => interview.userId === userId
    );
  }

  async getUserInterview(id: number): Promise<UserInterview | undefined> {
    return this.interviews.get(id);
  }

  async createUserInterview(insertInterview: InsertUserInterview): Promise<UserInterview> {
    const id = this.interviewIdCounter++;
    const now = new Date();
    const interview: UserInterview = { 
      ...insertInterview, 
      id,
      createdAt: now
    };
    this.interviews.set(id, interview);
    return interview;
  }
}

export const storage = new MemStorage();
