import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import { fetchPosts } from '../api/postsApi';

export default function PostsPage(){
    const [allPosts, setAllPosts] = useState([]);
    const [visible, setVisible] = useState([]); // current page
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 9;

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchPosts().then(data => {
            if(!mounted) return;
            setAllPosts(data);
            setLoading(false);
        }).catch(err => {
            setError(String(err));
            setLoading(false);
        });
        return () => { mounted = false; }
    }, []);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if(!s) return allPosts;
        return allPosts.filter(p => p.title.toLowerCase().includes(s) || p.body.toLowerCase().includes(s));
    }, [allPosts, q]);

    useEffect(() => {
        setPage(1);
    }, [q]);

    useEffect(() => {
        const start = (page - 1) * perPage;
        setVisible(filtered.slice(start, start + perPage));
    }, [filtered, page]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

    return (
        <div className="stack" style={{gap:12}}>
            <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
                    <h2 style={{margin:0}}>Posts</h2>
                    <div style={{display:'flex', gap:8}}>
                        <input className="input" placeholder="Search posts..." value={q} onChange={e=>setQ(e.target.value)} />
                    </div>
                </div>

                <div className="mt-4">
                    {loading && <div>Loading posts...</div>}
                    {error && <div style={{color:'var(--danger)'}}>Error: {error}</div>}
                    {!loading && !error && (
                        <>
                            <div className="grid">
                                {visible.map(p => (
                                    <article key={p.id} className="card">
                                        <h3 style={{marginTop:0}}>{p.title}</h3>
                                        <p className="mt-2" style={{color:'var(--muted)'}}>{p.body}</p>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-4 center" style={{gap:8, justifyContent:'center'}}>
                                <button className="btn btn-secondary" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
                                <div>Page {page} / {totalPages}</div>
                                <button className="btn btn-secondary" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
