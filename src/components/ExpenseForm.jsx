import React, { useState } from 'react'

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !amount) return
  onAdd({ title, amount: parseFloat(amount), category, date: Date.parse(date) })
    setTitle('')
    setAmount('')
    setCategory('Other')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">➕ Add New Expense</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expense Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 shadow-sm"
          placeholder="e.g., Lunch"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="0.01"
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 shadow-sm"
          placeholder="e.g., 12.50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 shadow-sm"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Utilities</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300 p-2" />
      </div>

      <button
        type="submit"
        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        ➕ Add Expense
      </button>
    </form>
  )
}
