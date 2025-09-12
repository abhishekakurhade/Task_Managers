import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from '../firebaseConfig';

export default function useTasks(userId){
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if(!userId) return;
    const tasksRef = collection(db, "users", userId, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTasks(items);
    });
    return () => unsub();
  }, [userId]);

  const createTask = async (task) => {
    const tasksRef = collection(db, "users", userId, "tasks");
    await addDoc(tasksRef, {
      ...task,
      status: task.status || "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateTask = async (taskId, changes) => {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await updateDoc(taskRef, { ...changes, updatedAt: serverTimestamp() });
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  return { tasks, createTask, updateTask, deleteTask };
}
