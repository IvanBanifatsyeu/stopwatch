
import React from 'react'

export default function Stopwatch() {
  return (
    <div className='wrapper'>
        <div className='clock'>00-00-00</div>
        <div className='controls'>
            <button className='Button-start'>Start</button>
            <button className='Button-stop'>Stop</button>
            <button className='Button-reset'>Reset</button>
        </div>
    </div>
  )
}
