import UserCard from "./UserCard";


export default function ContentSection({MATCHED_USERS}) {
  return (
    <>

      <section className="content-section">
        <h2 className="section-title">Matching Interests</h2>
        <div className="matches-grid">
          {MATCHED_USERS.map((user, index) => (
            <article key={user.id} className="match-card">
              <UserCard user={user} key={user.id||index} />
            </article>

          ))}
        </div>
      </section>
    </>
  )
}