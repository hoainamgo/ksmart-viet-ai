"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface HeroProps {
    onSearch: (term: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
    const [activeTab, setActiveTab] = useState("google");
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <section className="p-4 md:p-6 lg:p-10 bg-[#eaedf1]">
            <div className="bg-hero-gradient rounded-[40px] overflow-hidden relative shadow-2xl min-h-[400px] flex flex-col items-center justify-center py-16 px-6">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-[10%] left-[5%] w-60 h-60 bg-white rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-400 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-[900px] text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight">
                        Triệu người tin dùng Thư viện công cụ AI
                    </h1>

                    <div className="flex flex-col items-center">
                        {/* Search Tabs Overlaying Search Bar */}
                        <div className="flex items-center gap-1 mb-[-2px] relative z-20">
                            <button
                                onClick={() => setActiveTab("google")}
                                className={`px-10 py-3 rounded-t-2xl font-black text-sm transition-all ${activeTab === "google" ? "bg-white text-slate-800" : "bg-white/20 text-white/80 hover:bg-white/30 backdrop-blur-md"}`}
                            >
                                Google
                            </button>
                            <button
                                onClick={() => setActiveTab("guide")}
                                className={`px-10 py-3 rounded-t-2xl font-black text-sm transition-all ${activeTab === "guide" ? "bg-white text-slate-800" : "bg-white/20 text-white/80 hover:bg-white/30 backdrop-blur-md"}`}
                            >
                                Hướng dẫn
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full relative group">
                            <div className="bg-white p-2 rounded-2xl rounded-tl-none md:rounded-tl-2xl shadow-2xl flex items-center min-h-[70px]">
                                <input
                                    type="text"
                                    placeholder="Vui lòng nhập công cụ cần tìm kiếm..."
                                    className="flex-1 bg-transparent px-8 py-4 text-slate-700 outline-none text-lg font-medium"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-brand-orange w-[60px] h-[50px] md:w-[100px] rounded-2xl text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg"
                                >
                                    <Search size={28} />
                                </button>
                            </div>
                        </div>

                        {/* HOT Search Tags */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            <span className="text-white font-bold text-xs uppercase opacity-80">Hot search:</span>
                            {[
                                { name: "ChatGPT", badge: "HOT" },
                                { name: "Midjourney", badge: "HOT" },
                                { name: "Luma", badge: "NEW" },
                                { name: "Stable Diffusion" },
                                { name: "Claude" }
                            ].map((tag) => (
                                <button
                                    key={tag.name}
                                    onClick={() => { setInputValue(tag.name); onSearch(tag.name); }}
                                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/5 rounded-xl text-white text-[13px] font-black transition-all flex items-center gap-2 group/tag"
                                >
                                    {tag.name}
                                    {tag.badge && (
                                        <span className={`text-[8px] px-1 py-0.5 rounded-[4px] font-black ${tag.badge === 'HOT' ? 'bg-orange-500' : 'bg-yellow-400 text-slate-800'}`}>
                                            {tag.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
