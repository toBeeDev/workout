import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useReducer } from 'react'

export const Route = createFileRoute('/state')({
  component: State,
})

function State() {
  const init = () => {
    return 0
  }
  const [count, setCount] = useState(init)

  // mini useState 구현을 컴포넌트 내부에서 안전하게 돌리기 위한 저장소/리렌더러
  const hookStatesRef = useRef<any[]>([])
  const hookIndexRef = useRef(0)
  // 강제 리렌더러(배칭 없이 간단히)
  const [, forceRerender] = useReducer((x: number) => x + 1, 0)

  hookIndexRef.current = 0

  const useStateTest = <T,>(
    initialState: T | (() => T),
  ): [T, (next: T | ((prev: T) => T)) => void] => {
    const i = hookIndexRef.current
    const states = hookStatesRef.current

    // 최초 호출 시에만 초기화 (undefined도 유효 초기값일 수 있으므로 "in" 체크)
    if (!(i in states)) {
      states[i] =
        typeof initialState === 'function'
          ? (initialState as () => T)()
          : initialState
    }

    const setState = (next: T | ((prev: T) => T)) => {
      const prev = states[i] as T
      states[i] =
        typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      // 값 갱신 후 리렌더
      forceRerender()
    }

    const value = states[i] as T
    hookIndexRef.current = i + 1
    return [value, setState]
  }

  const [count2, setCount2] = useStateTest(0)

  console.log(count2)

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <div>Count: {count}</div>

      <button onClick={() => setCount2((v) => v + 1)}>Increment</button>
      <div>Count2: {count2}</div>
    </div>
  )
}
