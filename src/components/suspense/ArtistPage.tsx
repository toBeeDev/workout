import { Suspense } from 'react'
import Loading from './Loading'
import Albums from './Albums'

interface Artist {
  name: string
  id: string
}

export default function ArtistPage({ artist }: { artist: Artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        {/* 데이터를 로드하기 전까지 Loading 컴포넌트를 보여준다. */}
        <Albums id={artist.id} />
      </Suspense>
    </>
  )
}
