"use client";

import { Tool } from "@/lib/blogger";
import { ExternalLink, Heart, Star } from "lucide-react";
import Image from "next/image";

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    return (
        <div className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-brand-blue/30 transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-slate-50 border border-slate-50">
                    <img
                        src={tool.icon}
                        alt={tool.title}
                        className="w-full h-full object-contain p-2"
                    />
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                </button>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors">
                {tool.title}
            </h3>

            <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
                {tool.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-wider">
                    {tool.price}
                </span>
                <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue p-2 hover:bg-brand-blue/10 rounded-lg transition-all"
                >
                    <ExternalLink size={18} />
                </a>
            </div>

            {/* Tooltip on hover for full desc */}
            <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 text-white p-4 text-xs translate-y-full group-hover:translate-y-0 transition-transform hidden md:block">
                <p className="line-clamp-4">{tool.description}</p>
            </div>
        </div>
    );
}
