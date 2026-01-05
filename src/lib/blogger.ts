export interface Tool {
    id: string;
    title: string;
    description: string;
    url: string;
    icon: string;
    price: string;
    categories: string[];
    tags: string[];
    fullContent?: string;
    screenshots: string[];
    published: string;
}

export async function fetchBloggerTools(): Promise<Tool[]> {
    const blogUrl = "https://www.viet-ai.online";
    const feedUrl = `${blogUrl}/feeds/posts/default?alt=json&max-results=500`;

    try {
        const response = await fetch(feedUrl);
        if (!response.ok) throw new Error("Failed to fetch Blogger feed");
        const data = await response.json();
        const entries = data.feed.entry || [];

        return entries.map((entry: any) => {
            const content = entry.content.$t || "";
            const summary = entry.summary?.$t || "";

            // Extract Metadata using logic from the original XML
            const title = entry.title.$t;
            const id = entry.id.$t.split("post-")[1];
            const published = entry.published.$t;

            // Basic extraction from content
            const icon = extractFirstImage(content) || "https://i.ibb.co/RTDTms0C/Logo-new.png";
            const websiteUrl = extractMeta(content, "url") || extractMeta(content, "Link") || "#";
            const price = extractMeta(content, "price") || "Free";

            const categories = entry.category?.map((cat: any) => cat.term) || [];
            const description = extractDescription(content, summary);
            const screenshots = extractScreenshots(content);

            return {
                id,
                title,
                description,
                url: websiteUrl,
                icon,
                price,
                categories,
                tags: categories,
                screenshots,
                published
            };
        });
    } catch (error) {
        console.error("Error loading Blogger tools:", error);
        return [];
    }
}

function extractMeta(content: string, key: string) {
    const regex = new RegExp(key + ':\\s*([^\\n<]+)', 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
}

function extractDescription(content: string, summary: string) {
    const metaIndex = content.indexOf('---META---');
    let text = "";
    if (metaIndex > 0) {
        text = content.substring(0, metaIndex);
    } else {
        text = summary || content;
    }
    return text.replace(/<[^>]*>/g, '').substring(0, 200).trim() + '...';
}

function extractFirstImage(content: string) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : '';
}

function extractScreenshots(content: string) {
    const match = content.match(/---SCREENSHOTS---([\s\S]*?)---END---/);
    if (match) {
        return match[1].trim().split('\n').map(url => url.trim().replace(/<[^>]*>/g, '')).filter(url => url.startsWith('http'));
    }
    return [];
}
