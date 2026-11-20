import { useEffect } from 'react'
import { resume as r, RESUME_PDF } from '../data/resume'
import { navigate } from '../lib/router'
import { Arrow } from './Header'

/** Single-column, text-only resume. The same page prints to the ATS-friendly PDF. */
export function Resume() {
  useEffect(() => {
    document.title = `${r.name} — ${r.title} Resume`
    return () => {
      document.title = 'Sivadarshan — Product Designer'
    }
  }, [])
  const contact = [r.location, r.email, r.portfolio, r.linkedin].filter(Boolean)

  return (
    <div className="rs-page">
      <div className="rs-bar container">
        <a href="/" className="rs-back" onClick={(e) => { e.preventDefault(); navigate('/') }}>
          <span className="rs-back__arrow"><Arrow /></span> Back to portfolio
        </a>
        <a className="btn btn--ink" href={RESUME_PDF} download>
          Download PDF <Arrow />
        </a>
      </div>

      <article className="rs">
        <header className="rs-head">
          <h1>{r.name}</h1>
          <p className="rs-title">{r.title}</p>
          <p className="rs-contact">
            {contact.map((c, i) => (
              <span key={c}>
                {c.includes('@') ? <a href={`mailto:${c}`}>{c}</a> : c.includes('.') && !c.includes(' ') ? <a href={`https://${c}`}>{c}</a> : c}
                {i < contact.length - 1 && ' | '}
              </span>
            ))}
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{r.summary}</p>
        </section>

        <section>
          <h2>Skills</h2>
          {r.skills.map((s) => (
            <p key={s.group}><strong>{s.group}: </strong>{s.items}</p>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {r.experience.map((e) => (
            <div key={e.role} className="rs-item">
              <h3>{e.role}</h3>
              <p className="rs-meta">{e.org} | {e.location} | {e.dates}</p>
              <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {r.projects.map((p) => (
            <div key={p.name} className="rs-item">
              <h3>{p.name}</h3>
              <p className="rs-meta">{p.meta}</p>
              <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Certifications</h2>
          <ul>{r.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>

        {r.education.length > 0 && (
          <section>
            <h2>Education</h2>
            {r.education.map((e) => (
              <p key={e.degree}><strong>{e.degree}</strong>, {e.school} | {e.dates}</p>
            ))}
          </section>
        )}
      </article>
    </div>
  )
}
