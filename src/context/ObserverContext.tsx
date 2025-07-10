import {createContext, type ReactNode, useMemo, useRef} from "react";

interface IObserverContext {
  observer: IntersectionObserver | null,
  refCallbackMap: Map<Element, (entry: IntersectionObserverEntry) => void>
}

const ObserverContext = createContext<IObserverContext | null>(null);

const ObserverProvider = ({children}: {children: ReactNode}) => {
  const refCallbackMap = useRef(new Map<Element, (entry: IntersectionObserverEntry) => void>());

  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = refCallbackMap.current.get(entry.target)
        if(callback) callback(entry);
      })
  }, {
      root: null,
      threshold: 0.1,
    })}, []);


  return <ObserverContext.Provider 
    value={{
      observer, 
      refCallbackMap: refCallbackMap.current
    }}>
      {children}
    </ObserverContext.Provider>
}

export {ObserverContext, ObserverProvider}
