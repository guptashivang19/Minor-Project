import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userInterviews = pgTable("user_interviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  basicInfo: jsonb("basic_info").notNull(),
  selectedSymptoms: jsonb("selected_symptoms").notNull(),
  symptomDetails: jsonb("symptom_details").notNull(),
  medicalHistory: jsonb("medical_history").notNull(),
  results: jsonb("results").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const basicInfoSchema = z.object({
  age: z.number().min(0).max(120),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  height: z.number().optional(),
  weight: z.number().optional(),
});

export const selectedSymptomsSchema = z.object({
  symptoms: z.array(z.string()),
  otherSymptoms: z.string().optional(),
  duration: z.enum(["today", "2-3_days", "4-7_days", "1+_weeks"]),
  severity: z.number().min(1).max(10),
});

export const symptomDetailsSchema = z.object({
  location: z.string().optional(),
  triggers: z.array(z.string()).optional(),
  timing: z.string().optional(),
  characteristics: z.array(z.string()).optional(),
});

export const medicalHistorySchema = z.object({
  conditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  familyHistory: z.array(z.string()).optional(),
});

export const resultSchema = z.object({
  conditions: z.array(
    z.object({
      name: z.string(),
      confidence: z.number().min(0).max(100),
      severity: z.enum(["mild", "moderate", "significant", "severe"]),
      description: z.string(),
      recommendations: z.array(z.string()),
    })
  ),
  urgency: z.enum(["non_urgent", "routine", "prompt", "urgent", "emergency"]),
  recommendations: z.array(z.string()),
});

export const insertInterviewSchema = createInsertSchema(userInterviews).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserInterview = typeof userInterviews.$inferSelect;
export type InsertUserInterview = z.infer<typeof insertInterviewSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type SelectedSymptoms = z.infer<typeof selectedSymptomsSchema>;
export type SymptomDetails = z.infer<typeof symptomDetailsSchema>;
export type MedicalHistory = z.infer<typeof medicalHistorySchema>;
export type Result = z.infer<typeof resultSchema>;
