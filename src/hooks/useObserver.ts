import {useContext, useState} from "react";
import {ObserverContext} from "../context/ObserverContext.tsx";

const useObserver = () => {
    const ctx = useContext(ObserverContext);
    if (!ctx) throw ("useObserver must be used inside a observer provider");
    const {observer, refCallbackMap} = ctx
    const [isVisible, setIsVisible] = useState(false);

    const observeElement = (element: HTMLElement) => {
        if (element && observer) {
            refCallbackMap.set(element, (entry: IntersectionObserverEntry) => {
                setIsVisible(entry.isIntersecting);
            });
            observer.observe(element);
        }
    }

    const unobserveElement = (element: HTMLElement) => {
        if (element && observer) {
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
export default useObserver;