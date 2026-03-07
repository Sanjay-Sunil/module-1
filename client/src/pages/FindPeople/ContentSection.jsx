import UserCard from "./UserCard";


export default function ContentSection({matchedUsers}) {
  return (
    <>

      <section className="content-section">
        <h2 className="section-title">Matching Interests</h2>
        <div className="matches-grid">

          {
            matchedUsers?.length > 0 ?
            matchedUsers?.map((user, index) => (
              <article key={user.id} className="match-card">
                <UserCard user={user} key={user.id||index} />
              </article>
  
            ))
             :
             "Try selecting some interests to find like-minded individuals!"
          }

          {
          /*  */
          }
        </div>
      </section>
    </>
  )
}