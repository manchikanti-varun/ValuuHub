import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://valuuhub.in"
    const currentDate = new Date()

    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: currentDate,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/our-mission`,
            lastModified: currentDate,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/clients`,
            lastModified: currentDate,
            priority: 0.8,
        },
    ]

    const clientIds = ["thoothukudi", "rivora"]
    const clientRoutes = clientIds.map((clientId) => ({
        url: `${baseUrl}/clients/${clientId}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    return [...staticRoutes, ...clientRoutes]
}
