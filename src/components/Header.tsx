"use client";

import Link from "next/link";
import { Search, Heart, MessageCircle, Phone, Smartphone, Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-header-gradient h-[60px] sticky top-0 z-[1000] shadow-md border-b border-white/10">
            <div className="max-w-[1920px] mx-auto h-full px-4 md:px-6 flex items-center justify-between">
                {/* Left: Brand */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-white text-2xl font-black tracking-tighter">Việt-AI.online</span>
                    </Link>
                </div>

                {/* Center: Navigation */}
                <nav className="hidden lg:block ml-auto mr-10">
                    <ul className="flex items-center gap-10">
                        <li>
                            <Link href="/" className="text-white font-black text-sm relative opacity-100 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[3px] after:bg-white after:rounded-full">
                                Thư viện
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity relative">
                                Khóa học
                                <span className="absolute -top-3 -right-3 bg-red-400 text-[8px] px-1 py-0 rounded-sm font-black text-white leading-tight uppercase">H</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity">
                                Tin tức
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity relative">
                                Cộng đồng
                                <span className="absolute -top-3 -right-3 bg-red-400 text-[8px] px-1 py-0 rounded-sm font-black text-white leading-tight uppercase">H</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white/80 font-bold text-sm hover:opacity-100 transition-opacity">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Right: Utilities */}
                <div className="flex items-center gap-4 text-white">
                    <Link href="#" className="p-2 bg-white/10 hover:bg-white hover:text-brand-blue-deep rounded-full transition-all">
                        <MessageCircle size={18} />
                    </Link>
                    <Link href="#" className="p-2 bg-white/10 hover:bg-white hover:text-brand-blue-deep rounded-full transition-all">
                        <Smartphone size={18} />
                    </Link>
                    <Link href="#" className="p-2 bg-white/10 hover:bg-white hover:text-brand-blue-deep rounded-full transition-all">
                        <Heart size={18} />
                    </Link>
                    <button className="p-2 bg-white/10 hover:bg-white hover:text-brand-blue-deep rounded-lg transition-all">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
