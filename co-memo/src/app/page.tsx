"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, Board, Memo, MemoColor } from "@/lib/supabase";
import { MemoCard } from "@/components/MemoCard";
import { AddMemoForm } from "@/components/AddMemoForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const [board, setBoard] = useState<Board | null>(null);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoard = useCallback(async () => {
    const { data, error } = await supabase
      .from("cm_boards")
      .select("*")
      .limit(1)
      .single();
    if (error) { setError(error.message); return; }
    setBoard(data);
    return data;
  }, []);

  const loadMemos = useCallback(async (boardId: string) => {
    const { data, error } = await supabase
      .from("cm_memos")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });
    if (error) { setError(error.message); return; }
    setMemos(data ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      const b = await loadBoard();
      if (b) await loadMemos(b.id);
      setLoading(false);
    })();
  }, [loadBoard, loadMemos]);

  // 실시간 업데이트
  useEffect(() => {
    if (!board) return;
    const channel = supabase
      .channel("cm_memos_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cm_memos", filter: `board_id=eq.${board.id}` },
        () => loadMemos(board.id)
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [board, loadMemos]);

  async function handleAdd(data: { title: string; content: string; author: string; color: MemoColor }) {
    if (!board) return;
    const { error } = await supabase.from("cm_memos").insert({
      board_id: board.id,
      ...data,
    });
    if (error) setError(error.message);
    else loadMemos(board.id);
  }

  async function handleUpdate(id: string, data: Partial<Pick<Memo, "title" | "content" | "author" | "color">>) {
    const { error } = await supabase.from("cm_memos").update(data).eq("id", id);
    if (error) setError(error.message);
    else setMemos((prev) => prev.map((m) => m.id === id ? { ...m, ...data } : m));
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("cm_memos").delete().eq("id", id);
    if (error) setError(error.message);
    else setMemos((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="dark:[&>path]:stroke-neutral-900"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {board?.name ?? "Co-Memo"}
              </h1>
              {board?.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">{board.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline">
              {memos.length}개의 메모
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 메인 */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* 툴바 */}
        <div className="flex items-start gap-4 mb-8 flex-wrap">
          <AddMemoForm onAdd={handleAdd} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-neutral-400 dark:text-neutral-600">
            <svg className="animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            불러오는 중...
          </div>
        ) : memos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400 dark:text-neutral-600 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            <p className="text-sm">아직 메모가 없어요. 첫 번째 메모를 작성해보세요!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {memos.map((memo) => (
              <div key={memo.id} className="break-inside-avoid">
                <MemoCard memo={memo} onUpdate={handleUpdate} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-xs text-neutral-400 dark:text-neutral-600 text-center">
          Co-Memo — 팀 협업 보드
        </div>
      </footer>
    </div>
  );
}
