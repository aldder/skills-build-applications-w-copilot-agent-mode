export default function CollectionState({ loading, error, children, empty = 'No records found.' }) {
  if (loading) return <div className="alert alert-light border">Loading...</div>
  if (error) return <div className="alert alert-warning" role="alert">{error}</div>
  return children || <div className="alert alert-light border">{empty}</div>
}