import { fetchBloggerTools } from "@/lib/blogger";
import HomeClient from "@/components/HomeClient";

// Force dynamic fetch to ensure fresh data if not static export
// But for typical static builds, this will run at build time
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
    const tools = await fetchBloggerTools();

    return <HomeClient initialTools={tools} />;
}
