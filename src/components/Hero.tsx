"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

interface HeroProps {
    onSearch: (term: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
    const [activeTab, setActiveTab] = useState("web");
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <section className="px-5 md:px-10 pt-5 pb-8">
            <div className="bg-hero-gradient rounded-3xl overflow-hidden relative shadow-2xl">
                {/* Decorative Circles */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-[1000px] mx-auto py-16 px-6 relative z-10 flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white text-center mb-10 tracking-tight leading-tight">
                        Khám phá 500+ công cụ AI <br className="hidden md:block" />
                        hàng đầu cho hiệu suất đỉnh cao
                    </h1>

                    <div className="w-full max-w-[700px]">
                        {/* Search Tabs */}
                        <div className="flex justify-center gap-1 mb-0 relative z-20">
                            <button
                                onClick={() => setActiveTab("web")}
                                className={`px-6 md:px-8 py-3 rounded-t-2xl font-bold text-sm transition-all ${activeTab === "web" ? "bg-white text-slate-800" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"}`}
                            >
                                WEBSITE
                            </button>
                            <button
                                onClick={() => setActiveTab("app")}
                                className={`px-6 md:px-8 py-3 rounded-t-2xl font-bold text-sm transition-all ${activeTab === "app" ? "bg-white text-slate-800" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"}`}
                            >
                                APP/APK
                            </button>
                            <button
                                onClick={() => setActiveTab("plugin")}
                                className={`hidden sm:block px-6 md:px-8 py-3 rounded-t-2xl font-bold text-sm transition-all ${activeTab === "plugin" ? "bg-white text-slate-800" : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"}`}
                            >
                                PLUGIN
                            </button>
                        </div>

                        {/* Search Bar Wrapper */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Bạn đang tìm kiếm công cụ gì?"
                                className={`w-full bg-white h-[60px] md:h-[70px] ${activeTab === "web" ? "rounded-r-2xl rounded-bl-2xl" : "rounded-2xl"} px-8 pr-32 md:pr-40 text-slate-700 outline-none shadow-xl text-lg transition-all focus:ring-4 focus:ring-brand-blue-light/20`}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-2 bottom-2 bg-brand-orange px-6 md:px-10 rounded-xl text-white font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-brand-orange/30 group-hover:brightness-110"
                            >
                                <Search size={22} />
                                <span className="hidden sm:inline">TÌM KIẾM</span>
                            </button>
                        </div>

                        {/* HOT Tags */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">XU HƯỚNG:</span>
                            {["Chat GPT-4", "Midjourney", "Sora AI", "Jasper", "Canva Magic"].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => { setInputValue(tag); onSearch(tag); }}
                                    className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white/90 text-[11px] font-bold transition-all hover:-translate-y-0.5"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
