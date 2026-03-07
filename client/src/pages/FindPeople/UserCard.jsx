export default function UserCard({ user }) {
  return (
    <>

      <div className="avatar-placeholder"></div>
      <h3 className="user-name">{user.name}</h3>
      <p className="user-role">{user.role}</p>
      <div className="overlap-indicator">
        <span className="overlap-text">{user.overlap} Match</span>
        <div className="tags-container">
          {user.tags.map(tag => (
            <span key={tag} className="small-tag">{tag}</span>
          ))}
        </div>
      </div>
      <button className="connect-btn">Connect</button>
    </>
  )
}