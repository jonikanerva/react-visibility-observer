import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

const VisibilityContext = createContext({ isVisible: false, entries: [] })

type DivRef = React.MutableRefObject<HTMLDivElement>

interface VisibilityObeserverProps extends IntersectionObserverInit {
  children: React.ReactNode
  className?: string
  triggerOnce?: boolean
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const addObserver = (ref: DivRef, observer: IntersectionObserver) => {
  if (ref.current) {
    observer.observe(ref.current)
  }
}

const removeObserver = (ref: DivRef, observer: IntersectionObserver) => {
  if (ref.current) {
    observer.unobserve(ref.current)
  }
  observer.disconnect()
}

const VisibilityObeserver: React.FC<VisibilityObeserverProps> = ({
  children,
  className,
  triggerOnce = false,
  root = null,
  rootMargin = '0 0 0 0',
  threshold = 0
}) => {
  const [entries, setEntries] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const [observer, setObserver] = useState()

  const ref = useRef() as DivRef

  const observerOptions = { root, rootMargin, threshold }
  const observerCallback: IntersectionObserverCallback = observerEntries => {
    const visible =
      observerEntries.filter(obj => obj.isIntersecting === true).length > 0

    setEntries(observerEntries)
    setIsVisible(visible)
  }

  if (isVisible === true && triggerOnce === true) {
    removeObserver(ref, observer)
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

  return (
    <div ref={ref} className={className}>
      <VisibilityContext.Provider value={{ isVisible, entries }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

const useVisibilityObserver = () => {
  const { isVisible, entries } = useContext(VisibilityContext)

  return {
    isVisible,
    entries: entries as IntersectionObserverEntry[]
  }
}

export { VisibilityObeserver, useVisibilityObserver, VisibilityObeserverProps }
