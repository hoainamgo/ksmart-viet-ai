"use client";

import { ExternalLink, Star, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Tool } from "@/lib/blogger";

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const isFree = tool.price.toLowerCase().includes("free") || tool.price.toLowerCase().includes("miễn phí");

    return (
        <div className="card-hover-lift group bg-white rounded-2xl border border-slate-100 flex flex-col h-full relative overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                    src={tool.icon}
                    alt={tool.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Price Badge */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm z-10 ${isFree ? "bg-green-500 text-white" : "bg-amber-400 text-slate-900"
                    }`}>
                    {tool.price}
                </span>

                {/* Category Badge */}
                {tool.categories[0] && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-slate-800 text-[10px] font-bold shadow-sm z-10">
                        {tool.categories[0]}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-extrabold text-slate-800 group-hover:text-brand-blue-deep transition-colors line-clamp-1 text-lg">
                        {tool.title}
                    </h3>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {tool.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                            <ShieldCheck size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified</span>
                    </div>

                    <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[11px] font-black rounded-xl hover:bg-brand-orange transition-all group/btn shadow-md active:scale-95"
                    >
                        TRUY CẬP
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* New Badge (Optional logic) */}
            {parseInt(tool.id) % 5 === 0 && (
                <div className="absolute -right-8 top-4 w-32 bg-red-500 text-white text-[10px] font-black py-1 text-center rotate-45 shadow-lg">
                    HOT NEWS
                </div>
            )}
        </div>
    );
}
