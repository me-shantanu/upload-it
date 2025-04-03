'use client'
import React from 'react'
import Lottie from 'react-lottie-player'
import authJson from '@/src/assets/lotties/auth.json'

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
