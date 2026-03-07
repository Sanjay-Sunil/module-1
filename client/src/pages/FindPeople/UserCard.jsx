// UserCard.jsx
export default function UserCard({ user }) {
  return (
    <>
      <div className="avatar-placeholder">
        <img className="user-image" src={user?.image} alt={user?.name || "User avatar"} />
      </div>
      
      <h3 className="user-name">{user?.name}</h3>
      
      {/* Replaced user.role with user.location based on your DB response */}
      <p className="user-role">{user?.location}</p> 
      
      <div className="overlap-indicator">
        {/* Placeholder text since 'overlap' isn't in your DB yet */}
        <span className="overlap-text">Interests</span> 
        
        <div className="tags-container">
 
          {user?.interests?.map(interest => (
            <span key={interest.id} className="small-tag">{interest.name}</span>
          ))}
        </div>
      </div>
      
      <button className="connect-btn">Connect</button>
    </>
  )
}