"use client";

import Link from "next/link";
import { Search, Heart, MessageCircle, ExternalLink, Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-header-gradient h-[60px] sticky top-0 z-[1000] shadow-md border-b border-white/10">
            <div className="max-w-[1400px] mx-auto h-full px-5 md:px-10 flex items-center justify-between">
                {/* Left: Brand */}
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white hover:text-brand-orange transition-all md:hidden">
                        <Menu size={20} className="text-white" />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-white text-2xl font-black tracking-tighter">VIỆT-AI</span>
                        <span className="hidden sm:inline text-white/80 text-xs font-bold mt-1 tracking-widest uppercase">.online</span>
                    </Link>
                </div>

                {/* Center: Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        <li><Link href="/" className="text-white font-bold text-sm relative opacity-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[3px] after:bg-white after:rounded-full">THƯ VIỆN</Link></li>
                        <li><Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity">KHÓA HỌC</Link></li>
                        <li><Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity">CỘNG ĐỒNG</Link></li>
                        <li>
                            <Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity relative group">
                                TIN TỨC
                                <span className="absolute -top-3 -right-6 bg-red-400 text-[9px] px-1.5 py-0.5 rounded-sm font-black animate-pulse">HOT</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Right: Utilities */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 bg-white/10 p-1 rounded-lg border border-white/10">
                        <Link href="#" className="p-2 hover:bg-white hover:text-blue-600 rounded-md transition-all text-white">
                            <MessageCircle size={18} />
                        </Link>
                        <Link href="#" className="p-2 hover:bg-white hover:text-red-500 rounded-md transition-all text-white">
                            <Heart size={18} />
                        </Link>
                    </div>

                    <Link href="#" className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-brand-blue-deep font-bold text-sm hover:-translate-y-0.5 transition-all shadow-sm">
                        <div className="w-6 h-6 bg-brand-blue-deep rounded-lg flex items-center justify-center text-white text-[10px]">PRO</div>
                        <span className="hidden sm:inline">Nâng cấp</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
