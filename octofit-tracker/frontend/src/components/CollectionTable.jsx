import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

export default function CollectionTable({ endpoint, title, description, columns, empty }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setRecords).catch((reason) => setError(reason.message)).finally(() => setLoading(false))
  }, [endpoint])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">OctoFit data</p><h1>{title}</h1><p className="lead">{description}</p></div><span className="record-count">{records.length} records</span></div><CollectionState loading={loading} error={error} empty={empty}>{records.length > 0 && <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr></thead><tbody>{records.map((record, index) => <tr key={record._id || record.id || index}>{columns.map((column) => <td key={column.label}>{column.render(record, index)}</td>)}</tr>)}</tbody></table></div>}</CollectionState></section>
}

export const displayUser = (user) => typeof user === 'object' ? user?.name || 'Unknown athlete' : user || 'Unknown athlete'