"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ToolCard from "@/components/ToolCard";
import { Tool } from "@/lib/blogger";
import Fuse from "fuse.js";
import {
    ChevronRight, LayoutGrid, Flame, PenTool, Image as ImageIcon, Video,
    Briefcase, Zap, MessageSquare, Code, Rocket, Sparkles, Star, ArrowRight,
    Palette, Music, Search, Globe, Book, Brain, BarChart3, CheckCircle2, FileText
} from "lucide-react";

interface HomeClientProps {
    initialTools: Tool[];
}

const CATEGORIES_CONFIG = [
    { id: "hot", label: "Ai Hot", icon: <Flame size={20} className="text-orange-500" />, keywords: ['hot', 'trend'] },
    { id: "content", label: "Viết nội dung", icon: <PenTool size={20} className="text-blue-500" />, keywords: ['viết', 'content', 'văn bản'] },
    { id: "image", label: "Hình ảnh", icon: <ImageIcon size={20} className="text-purple-500" />, keywords: ['ảnh', 'image', 'vẽ'] },
    { id: "video", label: "Video", icon: <Video size={20} className="text-red-500" />, keywords: ['video', 'clip', 'phim'] },
    { id: "office", label: "Văn phòng", icon: <Briefcase size={20} className="text-emerald-500" />, keywords: ['văn phòng', 'office', 'tăng năng suất'] },
    { id: "assistant", label: "Trợ lý & Agent", icon: <Zap size={20} className="text-yellow-500" />, keywords: ['trợ lý', 'assistant', 'agent'] },
    { id: "chatbot", label: "Chatbot", icon: <MessageSquare size={20} className="text-indigo-500" />, keywords: ['chatbot', 'gpt', 'chat'] },
    { id: "coding", label: "Lập trình", icon: <Code size={20} className="text-slate-600" />, keywords: ['code', 'lập trình', 'dev'] },
    { id: "design", label: "Thiết kế", icon: <Palette size={20} className="text-pink-500" />, keywords: ['thiết kế', 'design', 'ui', 'ux'] },
    { id: "audio", label: "Âm thanh", icon: <Music size={20} className="text-cyan-500" />, keywords: ['âm thanh', 'audio', 'nhạc'] },
    { id: "search", label: "Tìm kiếm", icon: <Search size={20} className="text-sky-500" />, keywords: ['tìm kiếm', 'search'] },
    { id: "platform", label: "Nền tảng AI", icon: <Globe size={20} className="text-amber-500" />, keywords: ['nền tảng', 'platform', 'hệ sinh thái'] },
    { id: "learn", label: "Học & Tài nguyên", icon: <Book size={20} className="text-lime-600" />, keywords: ['học', 'tài nguyên', 'learn'] },
    { id: "training", label: "Huấn luyện mô hình", icon: <Brain size={20} className="text-violet-500" />, keywords: ['huấn luyện', 'mô hình', 'training'] },
    { id: "eval", label: "Đánh giá mô hình", icon: <BarChart3 size={20} className="text-rose-500" />, keywords: ['đánh giá', 'eval', 'benchmark'] },
    { id: "check", label: "Kiểm tra nội dung", icon: <CheckCircle2 size={20} className="text-teal-500" />, keywords: ['kiểm tra', 'check', 'detector'] },
    { id: "prompt", label: "Prompt", icon: <FileText size={20} className="text-orange-600" />, keywords: ['prompt', 'lệnh', 'câu lệnh'] },
];

export default function HomeClient({ initialTools }: HomeClientProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const fuse = useMemo(() => new Fuse(initialTools, {
        keys: ["title", "description", "categories", "tags"],
        threshold: 0.3,
    }), [initialTools]);

    const filteredTools = useMemo(() => {
        if (!searchTerm) return initialTools;
        const searchResult = fuse.search(searchTerm);
        return searchResult.map((res: any) => res.item);
    }, [searchTerm, initialTools, fuse]);

    const renderToolsInSection = (sectionId: string, label: string, icon: any, keywords: string[]) => {
        const tools = initialTools.filter(tool =>
            tool.categories.some(cat =>
                keywords.some(key => cat.toLowerCase().includes(key.toLowerCase()))
            )
        ).slice(0, 12);

        if (tools.length === 0) return null;

        return (
            <div key={sectionId} className="mb-14">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-2 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-8 bg-brand-blue-deep rounded-full"></span>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">{label}</h2>
                        </div>
                        {sectionId === 'hot' && (
                            <button className="bg-brand-orange text-white text-[10px] font-black px-4 py-2 rounded-xl flex items-center gap-2 hover:brightness-110 shadow-lg shadow-orange-100 transition-all">
                                LẬP TỨC TRUY CẬP <ArrowRight size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        {sectionId === 'hot' && (
                            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-2 shadow-sm">
                                <span className="animate-bounce">🔥</span>
                                <span className="text-[11px] font-bold text-slate-400">Tin hot: Google vừa cập nhật Gemini 1.5 Pro cực mạnh...</span>
                            </div>
                        )}
                        <Link href="#" className="text-brand-blue-deep font-bold text-[13px] hover:text-brand-orange transition-colors flex items-center gap-1 group">
                            Xem thêm ({tools.length})
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
                    {tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F0F2F5]">
            <Header />

            <main className="flex-grow flex flex-col bg-[#F0F2F5]">
                <div className="max-w-[1920px] w-full mx-auto flex flex-1 relative">
                    <Sidebar
                        activeCategory={activeCategory}
                        onSelectCategory={(id) => {
                            setActiveCategory(id);
                            // Scroll down slightly or filter logic
                        }}
                    />

                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        <Hero onSearch={setSearchTerm} />

                        <section className="p-4 md:p-6 lg:p-10">
                            {searchTerm ? (
                                <div>
                                    <div className="flex items-center justify-between mb-8 px-2">
                                        <h2 className="text-2xl font-black text-slate-800 uppercase">
                                            Kết quả cho "{searchTerm}"
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
                                        {filteredTools.map((tool) => (
                                            <ToolCard key={tool.id} tool={tool} />
                                        ))}
                                    </div>
                                </div>
                            ) : activeCategory === "all" ? (
                                <>
                                    {/* Show all grouped sections for Home page */}
                                    {CATEGORIES_CONFIG.map(cat =>
                                        renderToolsInSection(cat.id, cat.label, cat.icon, cat.keywords)
                                    )}
                                </>
                            ) : (
                                /* Show specific category as a section */
                                renderToolsInSection(
                                    activeCategory,
                                    CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.label || activeCategory,
                                    CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.icon,
                                    CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.keywords || [activeCategory]
                                )
                            )}

                            {searchTerm && filteredTools.length === 0 && (
                                <div className="col-span-full py-40 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-5xl mb-6 grayscale opacity-50">🔍</div>
                                    <h3 className="text-xl font-black text-slate-700">Rất tiếc, không tìm thấy kết quả</h3>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mt-6 px-6 py-2 bg-brand-blue-deep text-white text-xs font-black rounded-xl hover:scale-105 transition-all"
                                    >
                                        XÓA TÌM KIẾM
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>

            {/* Floating Contact/Menu Button */}
            <button className="fixed bottom-10 right-10 w-16 h-16 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 md:hidden">
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-6 h-[3px] bg-white rounded-full"></div>
                    <div className="w-6 h-[3px] bg-white rounded-full"></div>
                    <div className="w-6 h-[3px] bg-white rounded-full"></div>
                </div>
            </button>

            {/* Event Popup */}
            <div className="fixed bottom-6 right-6 w-[350px] bg-white rounded-3xl shadow-2xl z-[100] border border-slate-100 overflow-hidden animate-in slide-in-from-right duration-700 hidden lg:block">
                <div className="relative aspect-video">
                    <img src="https://i.ibb.co/6R2M7n7M/Screenshot-2025-12-29-215033.png" alt="Event" className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 w-6 h-6 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                        ×
                    </button>
                </div>
                <div className="p-5">
                    <h4 className="font-extrabold text-slate-800 mb-4 text-[15px]">
                        [Sự kiện] Kết nối AI & Công nghệ 2026
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">2025-12-26</span>
                        <button className="text-[11px] font-black border border-slate-200 px-4 py-1.5 rounded-full hover:bg-slate-50 transition-all">Đăng ký ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
