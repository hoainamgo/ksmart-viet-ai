"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface HeroProps {
    onSearch: (term: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
    const [term, setTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <section className="relative pt-32 pb-20 px-4">
            <div className="absolute inset-0 bg-brand-headerStart/5 -z-10" />
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
                    Khám phá <span className="text-brand-blue">500+ công cụ AI</span> hàng đầu
                </h1>
                <p className="text-slate-600 mb-10 text-lg max-w-2xl mx-auto">
                    Tối ưu hóa công việc và cuộc sống của bạn với những công cụ trí tuệ nhân tạo đột phá nhất hiện nay.
                </p>

                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
                    <div className="flex flex-col sm:flex-row gap-0 sm:bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 focus-within:ring-2 ring-brand-blue/30 transition-all group-hover:shadow-2xl">
                        <input
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="Tìm kiếm công cụ AI (ví dụ: ChatGPT, vẽ ảnh...)"
                            className="flex-1 px-6 py-4 outline-none text-slate-700 text-lg rounded-xl sm:rounded-none"
                        />
                        <button
                            type="submit"
                            className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 font-bold flex items-center justify-center gap-2 rounded-xl sm:rounded-none transition-colors"
                        >
                            <Search size={22} />
                            <span>Tìm kiếm</span>
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Xu hướng:</span>
                        {['ChatGPT', 'Midjourney', 'Gemini', 'Lập trình', 'Video'].map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => { setTerm(tag); onSearch(tag); }}
                                className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 hover:border-brand-blue hover:text-brand-blue transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </form>
            </div>
        </section>
    );
}
