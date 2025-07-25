import React from 'react'
import CurvedName from './CurvedName'
import SocialLinks from './SocialLinks'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(180deg,#0a0a23 60%,#161630 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Bent/arched name in background */}
      <CurvedName />

      {/* Samay's Hero Image */}
      <img
        src="/samay-hero.png"
        alt="Samay Raina"
        style={{
          width: '340px',
          maxWidth: '80vw',
          zIndex: 2,
          position: 'relative',
          marginBottom: '1.2rem'
        }}
      />

      {/* Tagline */}
      <h2 style={{
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 700,
        margin: 0,
        zIndex: 2,
        textAlign: 'center'
      }}>
        India’s Standup Chess Grandmaster
      </h2>

      {/* Social Icons */}
      <div style={{ marginTop: '1.2rem', zIndex: 2 }}>
        <SocialLinks />
      </div>

      {/* Call-to-action */}
      <button
        style={{
          marginTop: '2rem',
          padding: '0.9rem 2rem',
          fontWeight: 600,
          fontSize: '1.1rem',
          borderRadius: '30px',
          border: 'none',
          background: 'linear-gradient(90deg, #EECC3B, #23B5D3)',
          color: '#232340',
          cursor: 'pointer',
          boxShadow: '0 6px 28px rgba(30,30,60,0.18)'
        }}
      >
        Subscribe
      </button>
    </section>
  )
}
