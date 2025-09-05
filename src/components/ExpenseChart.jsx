import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function ExpenseChart({ expenses }) {
  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const data = Object.keys(totals).map((k) => ({
    name: k,
    value: +totals[k].toFixed(2)
  }))

  if (!data.length) return <p className="text-gray-600">No data to display.</p>

  const totalSum = data.reduce((s, d) => s + d.value, 0)

  const renderLabel = (entry) => {
    const pct = ((entry.value / totalSum) * 100).toFixed(0)
    return `${entry.name} ${pct}%`
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">📊 Spending by Category</h2>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={renderLabel}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
