import { fetchBloggerTools } from "@/lib/blogger";
import HomeClient from "@/components/HomeClient";

// This will be rendered at build time for static export
export default async function Home() {
    const tools = await fetchBloggerTools();

    return <HomeClient initialTools={tools} />;
}
