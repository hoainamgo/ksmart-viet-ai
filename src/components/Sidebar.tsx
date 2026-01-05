"use client";

import {
    Home, LayoutGrid, Flame, PenTool, Image as ImageIcon, Video,
    Briefcase, Zap, MessageSquare, Code, Palette, Music, Search, Globe, ChevronRight,
    Book, Brain, BarChart3, CheckCircle2, FileText
} from "lucide-react";

interface SidebarProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

const MENU_ITEMS = [
    { id: "all", label: "Tất cả công cụ", icon: <Home size={18} className="text-blue-500" />, active: true },
    { id: "hot", label: "Ai Hot", icon: <Flame size={18} className="text-orange-500" /> },
    { id: "content", label: "Viết nội dung", icon: <PenTool size={18} /> },
    { id: "image", label: "Hình ảnh", icon: <ImageIcon size={18} /> },
    { id: "video", label: "Video", icon: <Video size={18} /> },
    { id: "office", label: "Văn phòng", icon: <Briefcase size={18} /> },
    { id: "assistant", label: "Trợ lý & Agent", icon: <Zap size={18} /> },
    { id: "chatbot", label: "Chatbot", icon: <MessageSquare size={18} /> },
    { id: "coding", label: "Lập trình", icon: <Code size={18} /> },
    { id: "design", label: "Thiết kế", icon: <Palette size={18} /> },
    { id: "audio", label: "Âm thanh", icon: <Music size={18} /> },
    { id: "search", label: "Tìm kiếm", icon: <Search size={18} /> },
    { id: "platform", label: "Nền tảng AI", icon: <Globe size={18} /> },
    { id: "learn", label: "Học & Tài nguyên", icon: <Book size={18} /> },
    { id: "training", label: "Huấn luyện mô hình", icon: <Brain size={18} /> },
    { id: "eval", label: "Đánh giá mô hình", icon: <BarChart3 size={18} /> },
    { id: "check", label: "Kiểm tra nội dung", icon: <CheckCircle2 size={18} /> },
    { id: "prompt", label: "Prompt", icon: <FileText size={18} /> },
];

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
    return (
        <aside className="w-[260px] hidden xl:flex flex-col sticky top-[60px] h-[calc(100vh-60px)] bg-white border-r border-slate-200 shrink-0 overflow-y-auto custom-scrollbar">
            {/* Sidebar Brand */}
            <div className="p-4 border-b border-slate-50 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
                        <img src="https://i.ibb.co/RTDTms0C/Logo-new.png" alt="Logo" className="w-7 h-7 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-brand-blue-deep font-black text-sm leading-none">Việt-AI</span>
                        <span className="text-[9px] text-orange-500 font-bold mt-1">Điểm chạm thăng hoa</span>
                    </div>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
                <div className="flex flex-col gap-1">
                    {MENU_ITEMS.map((item) => {
                        const isActive = activeCategory === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelectCategory(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all relative group ${isActive
                                    ? "bg-blue-50 text-brand-blue-deep shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <span className={`${isActive ? "text-brand-blue-deep" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto">
                                        <ChevronRight size={14} className="text-brand-blue-deep opacity-50" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Version/Footer Info */}
            <div className="p-4 text-center">
                <p className="text-[10px] text-slate-300 font-bold">VIETAI WEB v1.0.2</p>
            </div>
        </aside>
    );
}
