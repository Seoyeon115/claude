"use client";

import { useState } from "react";
import { Memo, MemoColor, MEMO_COLORS } from "@/lib/supabase";

type Props = {
  memo: Memo;
  onUpdate: (id: string, data: Partial<Pick<Memo, "title" | "content" | "author" | "color">>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function MemoCard({ memo, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);
  const [author, setAuthor] = useState(memo.author);
  const [color, setColor] = useState<MemoColor>(memo.color);
  const [saving, setSaving] = useState(false);

  const colorStyle = MEMO_COLORS[color];

  async function handleSave() {
    setSaving(true);
    await onUpdate(memo.id, { title, content, author, color });
    setSaving(false);
    setEditing(false);
  }

  function handleCancel() {
    setTitle(memo.title);
    setContent(memo.content);
    setAuthor(memo.author);
    setColor(memo.color);
    setEditing(false);
  }

  const timeLabel = new Date(memo.created_at).toLocaleString("ko-KR", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow ${colorStyle.bg} ${colorStyle.border} ${colorStyle.dark}`}>
      {editing ? (
        <>
          {/* 색상 선택 */}
          <div className="flex gap-1.5 mb-1">
            {(Object.keys(MEMO_COLORS) as MemoColor[]).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${MEMO_COLORS[c].bg} ${color === c ? "border-neutral-700 scale-125" : "border-transparent"}`}
              />
            ))}
          </div>
          <input
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/70 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
          <textarea
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/70 px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-400"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요..."
          />
          <input
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white/70 dark:bg-neutral-800/70 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-neutral-400"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자"
          />
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-lg bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium py-1.5 hover:bg-neutral-700 dark:hover:bg-white disabled:opacity-50 transition-colors"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs font-medium py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-snug break-words flex-1">
              {memo.title || <span className="text-neutral-400 font-normal italic">제목 없음</span>}
            </h3>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-white/50 dark:hover:bg-neutral-700/50 transition-colors"
                aria-label="수정"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              </button>
              <button
                onClick={() => onDelete(memo.id)}
                className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                aria-label="삭제"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          {memo.content && (
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap break-words">
              {memo.content}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-1 border-t border-black/5 dark:border-white/10">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{memo.author}</span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">{timeLabel}</span>
          </div>
        </>
      )}
    </div>
  );
}
