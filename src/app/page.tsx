"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ToolCard from "@/components/ToolCard";
import { fetchBloggerTools, Tool } from "@/lib/blogger";
import Fuse from "fuse.js";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize Fuse.js for smart search
    const fuse = useMemo(() => new Fuse(tools, {
        keys: ["title", "description", "categories", "tags"],
        threshold: 0.3, // Lower = stricter
        includeMatches: true
    }), [tools]);

    useEffect(() => {
        async function loadData() {
            const data = await fetchBloggerTools();
            setTools(data);
            setFilteredTools(data);
            setLoading(false);
        }
        loadData();
    }, []);

    // Handle Search and Category filtering
    useEffect(() => {
        let result = tools;

        if (activeCategory !== "all") {
            // Very simple mapping for demo, usually category logic is more complex
            result = result.filter(tool =>
                tool.categories.some(cat => cat.toLowerCase().includes(activeCategory.toLowerCase()))
            );
        }

        if (searchTerm) {
            const searchResult = fuse.search(searchTerm);
            result = searchResult.map(res => res.item);
        }

        setFilteredTools(result);
    }, [searchTerm, activeCategory, tools, fuse]);

    return (
        <>
            <Header />

            <main className="flex-grow">
                <Hero onSearch={setSearchTerm} />

                <div className="max-w-[1920px] mx-auto flex">
                    <Sidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    <section className="flex-1 p-6 md:p-10 bg-slate-50/50">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
                                {activeCategory === 'all' ? 'Tất cả công cụ' : `Dịch vụ: ${activeCategory}`}
                                <span className="text-slate-400 font-bold text-sm bg-slate-100 px-2 py-1 rounded-lg ml-2">
                                    {filteredTools.length}
                                </span>
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="animate-spin text-brand-blue" size={40} />
                                <p className="text-slate-400 font-bold animate-pulse">Đang đồng bộ dữ liệu từ Blogger...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredTools.map((tool) => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))}

                                {filteredTools.length === 0 && (
                                    <div className="col-span-full py-40 text-center">
                                        <div className="text-6xl mb-6">🔍</div>
                                        <h3 className="text-xl font-bold text-slate-700">Không tìm thấy công cụ phù hợp</h3>
                                        <p className="text-slate-400">Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-200 py-10 text-center">
                <p className="text-slate-400 font-bold text-sm">
                    © 2026 Việt-AI.online - Một sản phẩm của hệ sinh thái Ksmart
                </p>
            </footer>
        </>
    );
}
