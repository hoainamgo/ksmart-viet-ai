"use client";

import {
    Home, Sparkles, Image as ImageIcon, Video, Code, MessageSquare,
    Search, Briefcase, Zap, Globe, Layers, Activity, ShieldCheck, PenTool
} from "lucide-react";

const CATEGORIES = [
    { name: 'Tất cả', icon: Home, id: 'all' },
    { name: 'Viết nội dung', icon: PenTool, id: 'content' },
    { name: 'Hình ảnh', icon: ImageIcon, id: 'image' },
    { name: 'Video', icon: Video, id: 'video' },
    { name: 'Học & Tài nguyên', icon: Globe, id: 'learning' },
    { name: 'Văn phòng', icon: Briefcase, id: 'office' },
    { name: 'Trợ lý & Agent', icon: Zap, id: 'assistant' },
    { name: 'Chatbot', icon: MessageSquare, id: 'chatbot' },
    { name: 'Lập trình', icon: Code, id: 'coding' },
];

interface SidebarProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
    return (
        <aside className="w-[280px] hidden lg:block bg-white border-r border-slate-200 h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto py-8">
            <div className="px-6 mb-8">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Danh mục</h2>
                <nav className="flex flex-col gap-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeCategory === cat.id
                                    ? 'bg-brand-blue/10 text-brand-blue shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                        >
                            <cat.icon size={20} className={activeCategory === cat.id ? 'opacity-100' : 'opacity-60'} />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="px-6">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Công nghệ AI</h2>
                <div className="grid grid-cols-2 gap-2">
                    {['OpenAI', 'Google', 'Meta', 'Anthropic'].map(brand => (
                        <div key={brand} className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase text-center hover:bg-white transition-colors cursor-pointer">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
