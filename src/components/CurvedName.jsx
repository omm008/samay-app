import React, { useEffect, useRef } from 'react'
export default function CurvedName() {
  return (
    <svg
      width="80vw"
      height="220"
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, 0) scale(0.8)',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.7s, transform 1s',
        pointerEvents: 'none'
      }}
    >
      <path
        id="curve"
        d="M60,200 Q350,-120 640,200"
        fill="transparent"
        stroke="none"
      />
      <text fill="#ffffff26" fontFamily='font-custom' fontSize="80" fontWeight="bold">
        <textPath xlinkHref="#curve" startOffset="0">
          <span className='font-custom'>SAMAY RAINA</span>
        </textPath>
      </text>
    </svg>
  )
}
