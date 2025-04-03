'use client'
import React from 'react'
import authJson from '@/src/assets/lotties/auth.json'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

function AuthLotties() {
  return (
    <Lottie
      loop
      animationData={authJson}
      play
      style={{ width: 342, height: 342 }}
      className='transition-all hover:rotate-2 hover:scale-105'
    />
  )
}

export default AuthLotties
