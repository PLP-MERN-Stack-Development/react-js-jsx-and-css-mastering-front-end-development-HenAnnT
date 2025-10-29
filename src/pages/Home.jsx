import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <div className="stack" style={{gap:16}}>
            <Card>
                <h1 style={{margin:0}}>Welcome to React Task Manager</h1>
                <p className="mt-2">This demo app shows a component architecture, hooks usage, API integration and responsive layout.</p>
                <div className="mt-4 stack">
                    <Link to="/tasks"><button className="btn btn-primary">Open Tasks</button></Link>
                    <Link to="/posts"><button className="btn btn-secondary">Browse Posts</button></Link>
                </div>
            </Card>

            <Card>
                <h3 style={{margin:0}}>What you'll find</h3>
                <ul>
                    <li>Task manager with add / complete / delete / filters and local storage persistence</li>
                    <li>Posts page fetching from JSONPlaceholder with search + pagination</li>
                    <li>Theme switcher (light/dark) using React Context</li>
                </ul>
            </Card>
        </div>
    );
}
