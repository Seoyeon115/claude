import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://urobnvwqeolyxmcejzwy.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2JudndxZW9seXhtY2Vqend5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MjAwMzEsImV4cCI6MjA5NDk5NjAzMX0.dC1usGNpZnn2a4N3i8OKtaqwcOrHECEaoBrmMrrS6c8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Board = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Memo = {
  id: string;
  board_id: string;
  title: string;
  content: string;
  author: string;
  color: MemoColor;
  position_x: number;
  position_y: number;
  created_at: string;
  updated_at: string;
};

export type MemoColor = "yellow" | "pink" | "blue" | "green" | "purple" | "orange";

export const MEMO_COLORS: Record<MemoColor, { bg: string; border: string; dark: string }> = {
  yellow:  { bg: "bg-yellow-100",  border: "border-yellow-300",  dark: "dark:bg-yellow-900/40  dark:border-yellow-700" },
  pink:    { bg: "bg-pink-100",    border: "border-pink-300",    dark: "dark:bg-pink-900/40    dark:border-pink-700" },
  blue:    { bg: "bg-blue-100",    border: "border-blue-300",    dark: "dark:bg-blue-900/40    dark:border-blue-700" },
  green:   { bg: "bg-emerald-100", border: "border-emerald-300", dark: "dark:bg-emerald-900/40 dark:border-emerald-700" },
  purple:  { bg: "bg-purple-100",  border: "border-purple-300",  dark: "dark:bg-purple-900/40  dark:border-purple-700" },
  orange:  { bg: "bg-orange-100",  border: "border-orange-300",  dark: "dark:bg-orange-900/40  dark:border-orange-700" },
};
