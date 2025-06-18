'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { StyledButton } from '../components/StyledButton'
type Todo = {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')

  const fetchTodos = async () => {
      const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('id')

    if (error) {
      console.error('fetch error:', error)
      return
    }

    setTodos((data as Todo[]) || [])
  }

  const addTodo = async () => {
    if (!title.trim()) return
    await supabase.from('todos').insert({ title })
    setTitle('')
    fetchTodos()
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    await supabase.from('todos').update({ completed: !completed }).eq('id', id)
    fetchTodos()
  }

  const deleteTodo = async (id: number) => {
    await supabase.from('todos').delete().eq('id', id)
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Supabase Todo</h1>
      <div className="flex mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="border px-2" />
        <button onClick={addTodo} className="ml-2 bg-blue-500 text-white px-2">Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-1">
            <span
              onClick={() => toggleTodo(todo.id, todo.completed)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">x</button>
          </li>
        ))}
      </ul>
      <StyledButton variant="primary">Click Me</StyledButton>
    </main>
  )
}

