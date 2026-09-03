import CollectionTable from './CollectionTable.jsx'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export default function Users() { return <CollectionTable endpoint="users" title="Users" description="Your OctoFit community, all in one place." empty="No users have joined yet." columns={[{ label: 'Name', render: (item) => <strong>{item.name}</strong> }, { label: 'Email', render: (item) => item.email }, { label: 'Profile', render: (item) => item.avatarUrl ? 'Avatar added' : 'No avatar' }]} /> }