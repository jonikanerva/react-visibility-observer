import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type DivRef = React.MutableRefObject<HTMLDivElement>

interface VisibilityObserverResponse {
  isVisible: boolean
  entries: IntersectionObserverEntry[] | undefined
}

interface VisibilityObserverProps extends IntersectionObserverInit {
  children: React.ReactNode
  className?: string
  triggerOnce?: boolean
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const VisibilityContext = createContext<VisibilityObserverResponse>({
  isVisible: false,
  entries: [],
})

const addObserver = (ref: DivRef, observer: IntersectionObserver) => {
  if (ref.current) {
    observer.observe(ref.current)
  }
}

const removeObserver = (ref: DivRef, observer?: IntersectionObserver) => {
  if (observer) {
    if (ref.current) {
      observer.unobserve(ref.current)
    }
    observer.disconnect()
  }
}

const isTargetVisible = (entries: IntersectionObserverEntry[]) =>
  entries.filter((obj) => obj.isIntersecting === true).length > 0

const VisibilityObserver: React.FC<VisibilityObserverProps> = ({
  children,
  className,
  triggerOnce = false,
  root = null,
  rootMargin = '0px 0px 0px 0px',
  threshold = 0,
}: VisibilityObserverProps) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [observer, setObserver] = useState<IntersectionObserver>()

  const ref = useRef() as DivRef
  const observerOptions = { root, rootMargin, threshold }
  const observerCallback: IntersectionObserverCallback = (observerEntries) => {
    const visible = isTargetVisible(observerEntries)

    setEntries(observerEntries)
    setIsVisible(visible)
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      observerCallback,
      observerOptions
    )
    setObserver(intersectionObserver)
    addObserver(ref, intersectionObserver)

    return () => removeObserver(ref, intersectionObserver)
  }, [])

  if (isVisible === true && triggerOnce === true) {
    removeObserver(ref, observer)
  }

  return (
    <div ref={ref} className={className}>
      <VisibilityContext.Provider value={{ isVisible, entries }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

const useVisibilityObserver = (): VisibilityObserverResponse => {
  const { isVisible, entries } = useContext(VisibilityContext)

  return {
    isVisible,
    entries: entries,
  }
}

export { VisibilityObserver, useVisibilityObserver, VisibilityObserverProps }
