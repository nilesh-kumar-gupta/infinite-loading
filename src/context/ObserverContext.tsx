import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

interface IObserverContext {
  observer: IntersectionObserver | null,
  refCallbackMap: Map<Element, Function>
}

const ObserverContext = createContext<IObserverContext | null>(null);

const ObserverProvider = ({children}: {children: ReactNode}) => {
  const refCallbackMap = useRef(new Map<Element, Function>());

  const observerOptions = { 
    root: document.querySelector("#list-container"), 
    threshold: 1.0, 
    rootMargin: "100px" 
  }

  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        const callback = refCallbackMap.current.get(entry.target)
        if(callback) callback(entry);
      })
  }, observerOptions)}, []);


  return <ObserverContext.Provider 
    value={{
      observer, 
      refCallbackMap: refCallbackMap.current
    }}>
      {children}
    </ObserverContext.Provider>
}

const useObserver = () => {
  const ctx = useContext(ObserverContext);
  if(!ctx) throw("useObserver must be used inside a observer provider");
  const {observer, refCallbackMap} = ctx
  const [isVisible, setIsVisible] = useState(false);

  const observeElement = (element: HTMLElement) => {
    if(element && observer){
      console.log(element)
      refCallbackMap.set(element, (entry: IntersectionObserverEntry) => {
        setIsVisible(entry.isIntersecting);
      });
      observer.observe(element);
    }
  }

  const unobserveElement = (element: HTMLElement) => {
    if(element && observer){
      observer.unobserve(element);
      refCallbackMap.delete(element);
    }
  }

  return {
    isVisible,
    observeElement,
    unobserveElement
  }
  
}

export {ObserverContext, ObserverProvider, useObserver}