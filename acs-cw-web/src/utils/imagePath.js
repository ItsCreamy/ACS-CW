// Helper to get correct image path with base URL
// This handles both local development and GitHub Pages deployment

const baseUrl = import.meta.env.BASE_URL || '/';

export function getImagePath(path) {
    // Remove leading slash from path if base already ends with /
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return baseUrl + cleanPath;
}
