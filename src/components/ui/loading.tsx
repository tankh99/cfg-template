import React from 'react'
import { Spinner } from './spinner'

export default function Loading() {
  return (
    <div className='p-12'>
        <Spinner>Loading</Spinner>
    </div>
  )
}
