import React, { useState, useMemo } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: Date.parse('2025-03-12'), title: 'Coffee', amount: 128.5, category: 'Food', date: Date.parse('2025-03-12') },
    { id: Date.parse('2025-03-05'), title: 'Groceries', amount: 4500.0, category: 'Food', date: Date.parse('2025-03-05') },
    { id: Date.parse('2025-02-28'), title: 'Bus Ticket', amount: 250.0, category: 'Transport', date: Date.parse('2025-02-28') }
  ])

  // filter state
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const [selectedYear, setSelectedYear] = useState(today.getFullYear())

  function addExpense(expense) {
    const id = Date.now()
    setExpenses((prev) => [{ id, ...expense }, ...prev])
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const d = new Date(e.date || e.id)
      return d.getFullYear() === Number(selectedYear) && d.getMonth() === Number(selectedMonth)
    })
  }, [expenses, selectedMonth, selectedYear])

  const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0)

  // totals for selected and previous month
  const totalSelected = filteredExpenses.reduce((s, e) => s + e.amount, 0)

  const prevMonth = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1)
  const prevExpenses = expenses.filter((e) => {
    const d = new Date(e.date || e.id)
    return d.getFullYear() === prevMonth.getFullYear() && d.getMonth() === prevMonth.getMonth()
  })
  const totalPrev = prevExpenses.reduce((s, e) => s + e.amount, 0)

  const changePct = totalPrev === 0 ? (totalSelected === 0 ? 0 : 100) : ((totalSelected - totalPrev) / totalPrev) * 100

  // years options (last 5 years)
  const years = []
  for (let y = today.getFullYear(); y >= today.getFullYear() - 5; y--) years.push(y)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header - centered */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center justify-center bg-white rounded-2xl shadow p-4">
            <div className="bg-blue-600 rounded-lg p-3 mr-4">
              <span className="text-white text-2xl">💰</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
              <p className="text-gray-500">Track and manage your daily expenses</p>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Show expenses for</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="rounded p-2 border">
              {months.map((m, i) => (
                <option value={i} key={m}>{m}</option>
              ))}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="rounded p-2 border">
              {years.map((y) => (
                <option value={y} key={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total across all time</p>
            <p className="text-lg font-semibold">{currency.format(totalAll)}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-gray-900">{currency.format(totalSelected)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500">Last Month</p>
            <p className="text-2xl font-bold text-gray-900">{currency.format(totalPrev)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Change</p>
              <p className={`text-2xl font-bold ${changePct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {changePct >= 0 ? '🔼' : '🔽'} {Math.abs(changePct).toFixed(0)}%
              </p>
            </div>
            <div className="text-sm text-gray-400">{months[selectedMonth]} {selectedYear}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-white p-6">
            <ExpenseForm onAdd={addExpense} />
          </div>
          <div className="card bg-white p-6">
            <ExpenseChart expenses={filteredExpenses} />
          </div>
        </div>

        {/* Expenses List */}
        <section className="mt-6">
          <div className="card bg-white p-6">
            <ExpenseList expenses={filteredExpenses} />
          </div>
        </section>
      </div>
    </div>
  )
}
