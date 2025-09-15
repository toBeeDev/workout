import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/nocon')({
  component: Nocon,
})

const TextDummy = [
  '123',
  'Urgent Update',
  'Important Update',
  '동시성',
  '병렬성',
]

function Nocon() {
  const [name, setName] = useState('')
  const [text, setText] = useState<string[]>([])
  return (
    <div className="p-2">
      <h3 className="text-lg font-bold py-4">
        동시성 렌더링 사용하지않은 상태
      </h3>
      <div className="flex flex-col gap-2 border-2 border-gray-300 p-2 rounded-md h-full overflow-y-scroll">
        <label htmlFor="name">이름</label>
        <input
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={(e) => {
            setName(e.target.value)
            setText(() =>
              Array.from({ length: 20000 }).map(
                () => TextDummy[Math.floor(Math.random() * 4)],
              ),
            )
          }}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        <p className="text-sm text-gray-500">Result</p>
        <ul className="flex flex-col gap-2 border-2 border-gray-300 p-2 rounded-md h-full overflow-y-scroll">
          {text.map((text, i) => (
            <li key={`${text}-${i}`}>
              {text}: {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
