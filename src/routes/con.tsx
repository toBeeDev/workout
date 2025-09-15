import { createFileRoute } from '@tanstack/react-router'
import { useDeferredValue, useState, useTransition } from 'react'

export const Route = createFileRoute('/con')({
  component: Con,
})
const TextDummy = [
  '456',
  'Urgent Update2',
  'Important Update2',
  '동시성2',
  '병렬성2',
]

function Con() {
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [isConcurrent, setIsConcurrent] = useState(false)
  const [isUseDeferredValue, setIsUseDeferredValue] = useState(false)

  const deferredList = useDeferredValue(list)
  const isLoading = deferredList !== list
  return (
    <div className="p-2">
      <button
        className="border-2 border-gray-300 p-2 rounded-md"
        onClick={() => setIsConcurrent(!isConcurrent)}
      >
        Toggle Button(useTransition,startTransition){' '}
        {isConcurrent ? 'useTransition' : 'startTransition'}
      </button>
      <button
        className="border-2 border-gray-300 p-2 rounded-md"
        onClick={() => setIsUseDeferredValue(!isUseDeferredValue)}
      >
        Toggle Button(useDeferredValue){' '}
        {isUseDeferredValue ? 'useDeferredValue' : 'useTransition'}
      </button>
      {!isUseDeferredValue && (
        <div className="flex flex-col gap-2 border-2 mt-2 border-gray-300 p-2 rounded-md max-h-100 overflow-y-scroll">
          <label htmlFor="keyword">이름</label>
          <input
            placeholder="Enter your name"
            value={keyword}
            name="keyword"
            onChange={(e) => {
              setKeyword(e.target.value)
              startTransition(() => {
                setList(
                  Array.from({ length: 20000 }).map(
                    () => TextDummy[Math.floor(Math.random() * 5)],
                  ),
                )
              })
            }}
            className="border-2 border-gray-300 p-2 rounded-md"
          />
          <p className="text-sm text-gray-500">Result</p>
          {isPending && isConcurrent && <p>Loading...</p>}
          <ul className="flex flex-col gap-2 border-2 border-gray-300 p-2 rounded-md h-full overflow-y-scroll">
            {list.map((text, i) => (
              <li key={`${text}-${i}`}>
                {text}: {i}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isUseDeferredValue && (
        <div className="flex flex-col gap-2 border-2 mt-2 border-gray-300 p-2 rounded-md max-h-100 overflow-y-scroll">
          <label htmlFor="keyword">이름</label>
          <input
            placeholder="Enter your name"
            value={keyword}
            name="keyword"
            onChange={(e) => {
              setKeyword(e.target.value)
              setList(
                Array.from({ length: 20000 }).map(
                  () => TextDummy[Math.floor(Math.random() * 5)],
                ),
              )
            }}
          />
          <p className="text-sm text-gray-500">Result</p>
          {isLoading && <p>Loading...</p>}
          <ul className="flex flex-col gap-2 border-2 border-gray-300 p-2 rounded-md h-full overflow-y-scroll">
            {deferredList.map((text, i) => (
              <li key={`${text}-${i}`}>
                {text}: {i}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
