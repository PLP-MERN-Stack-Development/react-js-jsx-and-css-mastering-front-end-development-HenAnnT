import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import TaskItem from '../components/TaskItem';
import Button from '../components/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { uid } from '../utils/helpers';

const FILTERS = {ALL:'all', ACTIVE:'active', COMPLETED:'completed'};

export default function TasksPage(){
    const [tasks, setTasks] = useLocalStorage('tasks_v1', [
        { id: uid('t_'), title: 'Example task', completed: false }
    ]);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState(FILTERS.ALL);

    function addTask(e){
        e?.preventDefault();
        if(!text.trim()) return;
        const newTask = { id: uid('t_'), title: text.trim(), completed: false };
        setTasks(prev => [newTask, ...prev]);
        setText('');
    }

    function toggleTask(id){
        setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
    }

    function deleteTask(id){
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    const filtered = useMemo(() => {
        if(filter === FILTERS.ACTIVE) return tasks.filter(t => !t.completed);
        if(filter === FILTERS.COMPLETED) return tasks.filter(t => t.completed);
        return tasks;
    }, [tasks, filter]);

    return (
        <div className="stack" style={{gap:12}}>
            <Card>
                <h2>Task Manager</h2>

                <form onSubmit={addTask} className="mt-2" style={{display:'flex', gap:8}}>
                    <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="New task..." style={{flex:1}} />
                    <button className="btn btn-primary" type="submit">Add</button>
                </form>

                <div className="mt-4 stack">
                    <Button variant={filter === FILTERS.ALL ? 'primary':'secondary'} onClick={() => setFilter(FILTERS.ALL)}>All</Button>
                    <Button variant={filter === FILTERS.ACTIVE ? 'primary':'secondary'} onClick={() => setFilter(FILTERS.ACTIVE)}>Active</Button>
                    <Button variant={filter === FILTERS.COMPLETED ? 'primary':'secondary'} onClick={() => setFilter(FILTERS.COMPLETED)}>Completed</Button>
                </div>

                <div className="mt-4" style={{display:'grid',gap:8}}>
                    {filtered.length === 0 ? <div className="mt-2">No tasks</div> : filtered.map(t => (
                        <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
                    ))}
                </div>
            </Card>
        </div>
    );
}
