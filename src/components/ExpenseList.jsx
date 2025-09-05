import React from 'react'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })

export default function ExpenseList({ expenses }) {
  if (!expenses.length) return <p className="text-gray-600">No expenses yet.</p>

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
      <ul className="space-y-3">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div>
              <div className="font-medium text-gray-800">{e.title}</div>
              <div className="text-sm text-gray-500">{new Date(e.date || e.id).toLocaleDateString()}</div>
              <span
                className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  e.category === 'Food'
                    ? 'bg-orange-100 text-orange-600'
                    : e.category === 'Transport'
                    ? 'bg-blue-100 text-blue-600'
                    : e.category === 'Utilities'
                    ? 'bg-purple-100 text-purple-600'
                    : e.category === 'Entertainment'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {e.category}
              </span>
            </div>
            <div className="font-semibold text-gray-800">{currency.format(e.amount)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
