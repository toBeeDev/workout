import ArtistPage from '@/components/suspense/ArtistPage'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/suspense')({
  component: Suspense,
})

function Suspense() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show && <ArtistPage artist={{ name: 'The Beatles', id: '1' }} />}
    </div>
  )
}
