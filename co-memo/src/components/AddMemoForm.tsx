"use client";

import { useState } from "react";
import { MemoColor, MEMO_COLORS } from "@/lib/supabase";

type Props = {
  onAdd: (data: { title: string; content: string; author: string; color: MemoColor }) => Promise<void>;
};

export function AddMemoForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<MemoColor>("yellow");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    await onAdd({ title, content, author: author.trim() || "익명", color });
    setTitle("");
    setContent("");
    setAuthor("");
    setColor("yellow");
    setLoading(false);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
        메모 추가
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-lg w-full max-w-sm flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">새 메모</span>
        <div className="flex gap-1.5">
          {(Object.keys(MEMO_COLORS) as MemoColor[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${MEMO_COLORS[c].bg} ${color === c ? "border-neutral-700 dark:border-neutral-300 scale-125" : "border-transparent"}`}
            />
          ))}
        </div>
      </div>
      <input
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neutral-400 placeholder:text-neutral-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목 (선택)"
      />
      <textarea
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400 placeholder:text-neutral-400"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메모 내용을 입력하세요..."
        required
        autoFocus
      />
      <input
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-400 placeholder:text-neutral-400"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="작성자 이름 (기본: 익명)"
      />
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="flex-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium py-2 hover:bg-neutral-700 dark:hover:bg-neutral-100 disabled:opacity-40 transition-colors"
        >
          {loading ? "추가 중..." : "추가하기"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 text-sm font-medium py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
