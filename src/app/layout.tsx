import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Việt-AI.online - Kho công cụ AI hàng đầu",
    description: "Khám phá 500+ công cụ AI hàng đầu để tối ưu hóa công việc và cuộc sống của bạn.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                {children}
            </body>
        </html>
    );
}
