import { users, type User, type InsertUser, userInterviews, type UserInterview, type InsertUserInterview } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserInterviews(userId: number): Promise<UserInterview[]>;
  getUserInterview(id: number): Promise<UserInterview | undefined>;
  createUserInterview(interview: InsertUserInterview): Promise<UserInterview>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserInterviews(userId: number): Promise<UserInterview[]> {
    return await db
      .select()
      .from(userInterviews)
      .where(eq(userInterviews.userId, userId));
  }

  async getUserInterview(id: number): Promise<UserInterview | undefined> {
    const [interview] = await db
      .select()
      .from(userInterviews)
      .where(eq(userInterviews.id, id));
    return interview || undefined;
  }

  async createUserInterview(insertInterview: InsertUserInterview): Promise<UserInterview> {
    const [interview] = await db
      .insert(userInterviews)
      .values(insertInterview)
      .returning();
    return interview;
  }
}

export const storage = new DatabaseStorage();
