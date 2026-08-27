/* Hand-maintained row types. Small enough that a generated client is not worth the build step. */

export type Role = "owner" | "editor";
export type TaskStatus = "todo" | "doing" | "blocked" | "done";
export type Priority = "p1" | "p2" | "p3";
export type PromptChannel =
  | "pitch-deck"
  | "linkedin"
  | "instagram"
  | "one-pager"
  | "research"
  | "email"
  | "other";
export type AssetCategory = "logo" | "colour" | "type" | "imagery" | "rule";

export type Member = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  created_at: string;
};

export type AllowedEmail = {
  email: string;
  note: string | null;
  created_at: string;
};

export type List = {
  id: string;
  title: string;
  summary: string | null;
  position: number;
  archived: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  list_id: string;
  title: string;
  detail: string | null;
  status: TaskStatus;
  priority: Priority;
  due_date: string | null;
  assignee_id: string | null;
  position: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Note = {
  id: string;
  title: string;
  collection: string;
  pinned: boolean;
  ydoc: string | null;
  plain_text: string | null;
  tags: string[];
  archived: boolean;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type BrandAsset = {
  id: string;
  category: AssetCategory;
  name: string;
  value: string | null;
  description: string | null;
  file_path: string | null;
  usage: string | null;
  position: number;
  created_at: string;
};

export type Prompt = {
  id: string;
  channel: PromptChannel;
  title: string;
  purpose: string | null;
  body: string;
  tags: string[];
  position: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};
