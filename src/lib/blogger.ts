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
    lang: {
        vi: { description: string };
        en: { description: string };
    };
}

export async function fetchBloggerTools(): Promise<Tool[]> {
    const blogUrl = "https://www.viet-ai.online";
    const feedUrl = `${blogUrl}/feeds/posts/default?alt=json&max-results=500`;

    try {
        const response = await fetch(feedUrl);
        if (!response.ok) throw new Error("Failed to fetch Blogger feed");
        const data = await response.json();
        const entries = data.feed.entry || [];

        const tools = entries.map((entry: any) => {
            const content = entry.content.$t || "";
            const summary = entry.summary?.$t || "";

            const title = entry.title.$t;
            const id = entry.id.$t.split("post-")[1];
            const published = entry.published.$t;

            // Bóc tách Metadata
            const icon = extractFirstImage(content) || "https://i.ibb.co/RTDTms0C/Logo-new.png";
            const websiteUrl = extractMeta(content, ["url", "link", "website"]) || "#";
            const price = extractMeta(content, ["price", "giá", "cost"]) || "Free";

            const categories = entry.category?.map((cat: any) => cat.term) || [];

            // Logic đa ngôn ngữ
            const langContent = splitLanguage(content);
            const viDesc = cleanText(langContent.vi || extractPureDescription(content, summary));
            const enDesc = cleanText(langContent.en || viDesc);

            return {
                id,
                title,
                description: viDesc, // Mặc định hiển thị tiếng Việt
                url: websiteUrl,
                icon,
                price,
                categories,
                tags: categories,
                screenshots: extractScreenshots(content),
                published,
                lang: {
                    vi: { description: viDesc },
                    en: { description: enDesc }
                }
            };
        });

        return tools;
    } catch (error) {
        console.error("Error loading Blogger tools:", error);
        return [];
    }
}

function extractMeta(content: string, keys: string[]) {
    for (const key of keys) {
        const regex = new RegExp(key + ':\\s*([^\\n<]+)', 'i');
        const match = content.match(regex);
        if (match) return match[1].trim();
    }
    return '';
}

function splitLanguage(content: string) {
    const viMatch = content.match(/---VI---([\s\S]*?)(---EN---|---META---|---SCREENSHOTS---|---END---|$)/i);
    const enMatch = content.match(/---EN---([\s\S]*?)(---VI---|---META---|---SCREENSHOTS---|---END---|$)/i);
    return {
        vi: viMatch ? viMatch[1].trim() : "",
        en: enMatch ? enMatch[1].trim() : ""
    };
}

function extractPureDescription(content: string, summary: string) {
    const markers = ['---META---', '---SCREENSHOTS---', '---VI---', '---EN---', '---NOTE---'];
    let text = content;

    // Tìm marker xuất hiện sớm nhất
    let firstMarkerIndex = text.length;
    markers.forEach(m => {
        const idx = text.indexOf(m);
        if (idx !== -1 && idx < firstMarkerIndex) firstMarkerIndex = idx;
    });

    if (firstMarkerIndex < text.length) {
        text = text.substring(0, firstMarkerIndex);
    }

    return text || summary;
}

function cleanText(html: string) {
    return html
        .replace(/<[^>]*>/g, '') // Loại bỏ tag HTML
        .replace(/\s+/g, ' ')    // Nén khoảng trắng
        .substring(0, 250)       // Giới hạn độ dài
        .trim() + '...';
}

function extractFirstImage(content: string) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : '';
}

function extractScreenshots(content: string) {
    const match = content.match(/---SCREENSHOTS---([\s\S]*?)---END---/i);
    if (match) {
        return match[1].trim().split('\n')
            .map(url => url.replace(/<[^>]*>/g, '').trim())
            .filter(url => url.startsWith('http'));
    }
    return [];
}
