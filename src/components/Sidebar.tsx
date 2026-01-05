"use client";

import {
    LayoutGrid, PenTool, Image as ImageIcon, Video,
    BookOpen, Briefcase, Zap, MessageSquare, Code,
    Star, Rocket, Compass, Sparkles
} from "lucide-react";

interface SidebarProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

const CATEGORIES = [
    { id: "all", label: "Tất cả công cụ", icon: <LayoutGrid size={18} /> },
    { type: "divider", label: "DỊCH VỤ AI" },
    { id: "chatbot", label: "Chatbot & Trợ lý", icon: <MessageSquare size={18} /> },
    { id: "content", label: "Viết lách & Nội dung", icon: <PenTool size={18} /> },
    { id: "image", label: "Hình ảnh & Nghệ thuật", icon: <ImageIcon size={18} /> },
    { id: "video", label: "Video & Hoạt hình", icon: <Video size={18} /> },
    { id: "coding", label: "Lập trình & Dev", icon: <Code size={18} /> },
    { type: "divider", label: "CÔNG VIỆC & HỌC TẬP" },
    { id: "office", label: "Văn phòng & Tăng năng suất", icon: <Briefcase size={18} /> },
    { id: "learning", label: "Giáo dục & Nghiên cứu", icon: <BookOpen size={18} /> },
    { id: "assistant", label: "Tự động hóa (Agents)", icon: <Zap size={18} /> },
    { type: "divider", label: "KHÁM PHÁ" },
    { id: "trending", label: "Đang thịnh hành", icon: <Rocket size={18} />, color: "text-orange-500" },
    { id: "new", label: "Mới cập nhật", icon: <Sparkles size={18} />, color: "text-blue-500" },
    { id: "featured", label: "Chọn lọc bởi Admin", icon: <Star size={18} />, color: "text-amber-500" },
];

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
    return (
        <aside className="w-[280px] hidden xl:block sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto bg-white border-r border-slate-100 py-6 px-4 shrink-0 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="flex flex-col gap-1">
                {CATEGORIES.map((item, index) => {
                    if (item.type === "divider") {
                        return (
                            <div key={`div-${index}`} className="mt-6 mb-2 px-4">
                                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{item.label}</span>
                            </div>
                        );
                    }

                    const isActive = activeCategory === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelectCategory(item.id as string)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${isActive
                                    ? "bg-blue-50 text-brand-blue-deep shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <span className={`${isActive ? "text-brand-blue-deep" : item.color || "text-slate-400 group-hover:text-slate-600"} transition-colors`}>
                                {item.icon}
                            </span>
                            {item.label}
                            {isActive && <div className="ml-auto w-1.5 h-1.5 bg-brand-blue-deep rounded-full"></div>}
                        </button>
                    );
                })}
            </div>

            {/* Bottom Promo */}
            <div className="mt-10 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="text-white font-bold text-sm mb-1 leading-tight">Bạn có công cụ AI tuyệt vời?</h4>
                    <p className="text-white/50 text-[10px] mb-3">Liên hệ với chúng tôi để đưa lên thư viện Việt-AI</p>
                    <button className="w-full py-2 bg-brand-orange text-white text-[10px] font-black rounded-lg hover:brightness-110 transition-all">GỬI CÔNG CỤ</button>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
        </aside>
    );
}
