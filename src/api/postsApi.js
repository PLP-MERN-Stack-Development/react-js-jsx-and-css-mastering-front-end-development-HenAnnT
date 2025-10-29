const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts() {
    const res = await fetch(`${BASE}/posts`);
    if (!res.ok) throw new Error('Failed fetching posts');
    return res.json();
}
