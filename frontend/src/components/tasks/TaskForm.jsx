import React, { useState } from 'react';

export default function TaskForm({ onCreate }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if(!title.trim()) return;
    await onCreate({ title, description });
    setTitle(''); setDescription('');
  };

  return (
    <form onSubmit={submit} style={{marginTop:8}}>
      <div className="form-row">
        <input className="input" placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <input className="input" placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      <div>
        <button className="button" type="submit">Add Task</button>
      </div>
    </form>
  );
}
