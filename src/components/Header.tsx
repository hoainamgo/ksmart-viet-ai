"use client";

import { useEffect, useState } from "react";
import { Search, Menu, Globe } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-[60px] bg-gradient-to-r from-brand-headerStart to-brand-headerEnd z-50 flex items-center px-4 md:px-10 justify-between shadow-lg">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/20 rounded-lg lg:hidden">
                    <Menu className="text-white" />
                </button>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white tracking-tighter">Việt-AI</span>
                    <span className="text-white/80 text-xs font-semibold">.online</span>
                </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
                {['Trang chủ', 'Tin tức', 'AI Hot', 'Giới thiệu'].map((item) => (
                    <a key={item} href="#" className="text-white/90 hover:text-white font-semibold text-sm transition-opacity">
                        {item}
                    </a>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all">
                    <Globe size={20} />
                </button>
                <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-700 uppercase">Pro Version</span>
                </div>
            </div>
        </header>
    );
}
