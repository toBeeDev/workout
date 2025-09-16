import { use } from 'react'

interface Albums {
  userId: number
  id: number
  title: string
}

// Promise를 캐시하기 위한 Map
const cache = new Map<string, Promise<Albums[]>>()

function fetchData<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then((response) => response.json()),
    )
  }

  const promise = cache.get(url)!
  return promise as Promise<T>
}

export default function Albums({ id }: { id: string }) {
  const albums = use(
    fetchData<Albums[]>(
      `https://jsonplaceholder.typicode.com/albums?userId=${id}`,
    ),
  )

  return (
    <ul>
      {albums.map((album: Albums) => (
        <li key={album.id}>{album.title}</li>
      ))}
    </ul>
  )
}
