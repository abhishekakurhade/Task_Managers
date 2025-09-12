import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useTasks from '../../hooks/useTasks';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function TaskPage(){
  const { user } = useAuth();
  const { tasks, createTask, updateTask, deleteTask } = useTasks(user?.uid);
  const [filter, setFilter] = useState('all');

  const visible = tasks.filter(t => {
    if(filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div>
      <h3>My Tasks</h3>
      <TaskForm onCreate={createTask} />
      <div style={{marginTop:12, marginBottom:12}}>
        <button className="filter-btn" onClick={()=>setFilter('all')}>All</button>
        <button className="filter-btn" onClick={()=>setFilter('pending')}>Pending</button>
        <button className="filter-btn" onClick={()=>setFilter('completed')}>Completed</button>
      </div>
      <div>
        {visible.length === 0 && <p className="small">No tasks yet.</p>}
        {visible.map(t => (
          <TaskItem key={t.id} task={t} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}
