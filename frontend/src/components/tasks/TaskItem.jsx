import React from 'react';

export default function TaskItem({ task, onUpdate, onDelete }){
  const toggle = () => {
    onUpdate(task.id, { status: task.status === 'pending' ? 'completed' : 'pending' });
  };
  return (
    <div className="task">
      <div>
        <div style={{fontWeight:600}}>{task.title}</div>
        {task.description && <div className="small">{task.description}</div>}
        <div className="small">Status: {task.status}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="button" onClick={toggle}>{task.status === 'pending' ? 'Mark Done' : 'Mark Pending'}</button>
        <button className="button" style={{background:'#ef4444'}} onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
