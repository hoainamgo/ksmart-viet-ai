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
    ChevronRight, LayoutGrid, PenTool, Image as ImageIcon, Video,
    BookOpen, Briefcase, Zap, MessageSquare, Code, Rocket, Sparkles, Star
} from "lucide-react";

interface HomeClientProps {
    initialTools: Tool[];
}

const CATEGORIES_DATA = [
    { id: "all", label: "Tất cả", icon: <LayoutGrid size={16} /> },
    { id: "chatbot", label: "Chatbot", icon: <MessageSquare size={16} /> },
    { id: "content", label: "Viết lách", icon: <PenTool size={16} /> },
    { id: "image", label: "Hình ảnh", icon: <ImageIcon size={16} /> },
    { id: "video", label: "Video", icon: <Video size={16} /> },
    { id: "coding", label: "Lập trình", icon: <Code size={16} /> },
    { id: "office", label: "Văn phòng", icon: <Briefcase size={16} /> },
    { id: "learning", label: "Giáo dục", icon: <BookOpen size={16} /> },
    { id: "assistant", label: "Agents", icon: <Zap size={16} /> },
];

export default function HomeClient({ initialTools }: HomeClientProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const fuse = useMemo(() => new Fuse(initialTools, {
        keys: ["title", "description", "categories", "tags"],
        threshold: 0.3,
    }), [initialTools]);

    const filteredTools = useMemo(() => {
        let result = initialTools;

        if (activeCategory !== "all") {
            const categoryMap: Record<string, string[]> = {
                'content': ['viết', 'content', 'copywriting', 'văn bản'],
                'image': ['ảnh', 'image', 'vẽ', 'chụp'],
                'video': ['video', 'phim', 'clip'],
                'learning': ['học', 'tài liệu', 'nghiên cứu', 'khoa học'],
                'office': ['văn phòng', 'office', 'công việc', 'work'],
                'assistant': ['trợ lý', 'assistant', 'agent', 'zapier'],
                'chatbot': ['chatbot', 'gpt', 'hội thoại'],
                'coding': ['code', 'lập trình', 'developer', 'github'],
            };
            const keywords = categoryMap[activeCategory] || [activeCategory];
            result = result.filter(tool =>
                tool.categories.some(cat =>
                    keywords.some(key => cat.toLowerCase().includes(key.toLowerCase()))
                )
            );
        }

        if (searchTerm) {
            const searchResult = fuse.search(searchTerm);
            result = searchResult.map((res: any) => res.item);
        }

        return result;
    }, [searchTerm, activeCategory, initialTools, fuse]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            <main className="flex-grow flex flex-col">
                <Hero onSearch={setSearchTerm} />

                <div className="max-w-[1920px] w-full mx-auto flex flex-1">
                    <Sidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    <section className="flex-1 p-4 md:p-8">
                        {/* Horizontal Categories Bar */}
                        <div className="bg-white p-2 rounded-2xl mb-8 border border-slate-100 shadow-sm overflow-x-auto scrollbar-none flex items-center gap-2">
                            {CATEGORIES_DATA.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeCategory === cat.id
                                            ? "bg-brand-blue-deep text-white shadow-md shadow-blue-200"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.label.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-brand-orange rounded-full"></div>
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                                    {activeCategory === 'all' ? 'Tất cả công cụ' : CATEGORIES_DATA.find(c => c.id === activeCategory)?.label}
                                    <span className="ml-3 text-slate-300 text-sm font-black bg-slate-100 px-2 py-1 rounded-lg">
                                        {filteredTools.length}
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {/* Tools Grid (Adjusted to 5-6 columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}

                            {filteredTools.length === 0 && (
                                <div className="col-span-full py-40 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-5xl mb-6 grayscale opacity-50">
                                        🔍
                                    </div>
                                    <h3 className="text-xl font-black text-slate-700">Rất tiếc, không tìm thấy kết quả</h3>
                                    <button
                                        onClick={() => { setSearchTerm(""); setActiveCategory("all") }}
                                        className="mt-6 px-6 py-2 bg-brand-blue-deep text-white text-xs font-black rounded-xl hover:scale-105 transition-all"
                                    >
                                        XÓA TẤT CẢ BỘ LỌC
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-100 py-10">
                <div className="max-w-[1920px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-400">
                    <div className="flex items-center gap-4">
                        <span className="text-brand-blue-deep">VIỆT-AI.ONLINE</span>
                        <span>© 2026 KSMART ECOSYSTEM</span>
                    </div>
                    <div className="flex gap-8">
                        <span className="hover:text-brand-orange cursor-pointer">FACEBOOK</span>
                        <span className="hover:text-brand-orange cursor-pointer">ZALO</span>
                        <span className="hover:text-brand-orange cursor-pointer">YOUTUBE</span>
                        <span className="hover:text-brand-orange cursor-pointer">CỘNG ĐỒNG</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
