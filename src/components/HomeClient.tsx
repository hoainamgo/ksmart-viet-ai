"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ToolCard from "@/components/ToolCard";
import { Tool } from "@/lib/blogger";
import Fuse from "fuse.js";
import { Menu, ChevronRight } from "lucide-react";

interface HomeClientProps {
    initialTools: Tool[];
}

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

                <div className="max-w-[1400px] w-full mx-auto flex flex-1">
                    <Sidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    <section className="flex-1 p-6 md:p-10">
                        {/* Breadcrumbs / Section Title */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                    <span>THƯ VIỆN</span>
                                    <ChevronRight size={10} />
                                    <span className="text-brand-blue-deep">{activeCategory.toUpperCase()}</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                                    <div className="w-1.5 h-8 bg-brand-orange rounded-full"></div>
                                    {activeCategory === 'all' ? 'Tất cả công cụ' : filteredTools[0]?.categories.find(c => c.toLowerCase().includes(activeCategory)) || activeCategory}
                                    <div className="bg-slate-200 text-slate-600 text-[11px] px-2 py-0.5 rounded-md ml-2 font-black">
                                        {filteredTools.length}
                                    </div>
                                </h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400">Sắp xếp:</span>
                                <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none hover:border-brand-blue-deep transition-all cursor-pointer shadow-sm">
                                    <option>Mới nhất</option>
                                    <option>Phổ biến nhất</option>
                                </select>
                            </div>
                        </div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}

                            {filteredTools.length === 0 && (
                                <div className="col-span-full py-40 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-5xl mb-6 grayscale opacity-50">
                                        🔍
                                    </div>
                                    <h3 className="text-xl font-black text-slate-700">Rất tiếc, không tìm thấy kết quả</h3>
                                    <p className="text-slate-400 text-sm mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
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

            {/* Premium Footer */}
            <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
                        <div className="max-w-xs">
                            <div className="text-2xl font-black text-brand-blue-deep tracking-tighter mb-4">VIỆT-AI.ONLINE</div>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                Thư viện công cụ AI lớn nhất Việt Nam, cập nhật hàng ngày những xu hướng công nghệ mới nhất để giúp bạn bứt phá trong công việc.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                            <div>
                                <h5 className="font-black text-[10px] text-slate-800 tracking-widest uppercase mb-4">TÀI NGUYÊN</h5>
                                <ul className="flex flex-col gap-2 text-xs font-bold text-slate-500">
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Thư viện AI</Link></li>
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Khóa học Pro</Link></li>
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Blog tin tức</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-black text-[10px] text-slate-800 tracking-widest uppercase mb-4">HỖ TRỢ</h5>
                                <ul className="flex flex-col gap-2 text-xs font-bold text-slate-500">
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Liên hệ quảng cáo</Link></li>
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Gửi công cụ AI</Link></li>
                                    <li><Link href="#" className="hover:text-brand-blue-deep">Chính sách bảo mật</Link></li>
                                </ul>
                            </div>
                            <div className="hidden sm:block">
                                <h5 className="font-black text-[10px] text-slate-800 tracking-widest uppercase mb-4">THEO DÕI</h5>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-slate-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"></div>
                                    <div className="w-8 h-8 bg-slate-100 rounded-lg hover:bg-black hover:text-white transition-all cursor-pointer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-slate-50">
                        <p className="text-slate-400 font-bold text-[10px] tracking-wide mb-4 md:mb-0">
                            © 2026 VIỆT-AI.ONLINE • LÀM BẰNG CẢ TRÁI TIM TẠI VIỆT NAM
                        </p>
                        <div className="flex gap-6 text-[10px] font-black text-slate-300">
                            <span className="hover:text-slate-500 cursor-pointer">FACEBOOK</span>
                            <span className="hover:text-slate-500 cursor-pointer">ZALO</span>
                            <span className="hover:text-slate-500 cursor-pointer">YOUTUBE</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
