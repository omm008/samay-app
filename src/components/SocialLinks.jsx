import React from 'react'

const socials = [
  { url: 'https://youtube.com/@samayraina', icon: '📺', label: 'YouTube' },
  { url: 'https://instagram.com/samayraina_', icon: '📸', label: 'Instagram' },
  { url: 'https://twitter.com/ReheSamay', icon: '🐦', label: 'Twitter' }
]

export default function SocialLinks() {
  return (
    <div style={{
      display: 'flex',
      gap: '1.2rem',
      fontSize: '2rem'
    }}>
      {socials.map(social =>
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#eee',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          title={social.label}
        >
          <span role="img" aria-label={social.label}>{social.icon}</span>
        </a>
      )}
    </div>
  )
}
