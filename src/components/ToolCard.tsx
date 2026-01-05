"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Tool } from "@/lib/blogger";

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const isHot = parseInt(tool.id) % 3 === 0; // Simple logic to show HOT badge for variety

    return (
        <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
        >
            {/* HOT Badge */}
            {isHot && (
                <div className="absolute -top-1.5 -right-1.5 z-10">
                    <span className="bg-[#FF4D4D] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm animate-pulse">
                        HOT
                    </span>
                </div>
            )}

            <div className="flex items-center gap-4">
                {/* Compact Icon */}
                <div className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-inner overflow-hidden">
                    {tool.icon && tool.icon.includes("http") ? (
                        <img src={tool.icon} alt={tool.title} className="w-full h-full object-cover" />
                    ) : (
                        <span>{tool.title.charAt(0)}</span>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0 pr-4">
                    <h3 className="font-black text-slate-800 text-[15px] leading-tight group-hover:text-brand-blue-deep transition-colors truncate">
                        {tool.title}
                    </h3>
                    <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                        {tool.description}
                    </p>
                </div>

                {/* Subtle Hover Action */}
                <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-brand-blue-deep" />
                </div>
            </div>
        </a>
    );
}
