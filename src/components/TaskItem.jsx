import React from 'react';

export default function TaskItem({task, onToggle, onDelete}){
    return (
        <div className="task-row">
            <div className="task-left">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <div className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</div>
            </div>
            <div>
                <button className="btn btn-secondary" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
}
