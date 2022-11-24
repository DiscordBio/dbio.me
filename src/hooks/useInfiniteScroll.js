import { useState, useEffect, useCallback, useRef } from "react";

export const useInfiniteScroll = (embla, slides, hasMoreToLoad) => {
  const scrollListener = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pointerIsDown, setPointerIsDown] = useState(false);

  const setPointerDown = useCallback(() => setPointerIsDown(true), []);
  const setPointerNotDown = useCallback(() => setPointerIsDown(false), []);

  const lastSlideIsInView = useCallback(() => {
    if (!embla) return false;
    const lastSlide = embla.slideNodes().length - 1;

    return embla.slidesInView().indexOf(lastSlide - 1) !== -1;
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    setLoadingMore((isLoadingMore) => {
      if (isLoadingMore) return true;
      const shouldLoadMore = lastSlideIsInView();
      if (shouldLoadMore) embla.off("scroll", scrollListener.current);
      return shouldLoadMore;
    });
  }, [embla, setLoadingMore, lastSlideIsInView]);

  const addScrollListener = useCallback(() => {
    if (!embla || !hasMoreToLoad) return;
    scrollListener.current = () => onScroll();
    embla.on("scroll", scrollListener.current);
  }, [embla, hasMoreToLoad, onScroll]);

  const reloadEmbla = useCallback(() => {
    if (!embla) return;
    const oldEngine = embla.internalEngine();
    embla.reInit();
    const newEngine = embla.internalEngine();
    const propsToCopy = ["scrollBody", "location", "target"];
    propsToCopy.forEach((p) => Object.assign(newEngine[p], oldEngine[p]));
    const { index } = newEngine.scrollTarget.byDistance(0, false);
    newEngine.index.set(index);
    newEngine.animation.start();
    setLoadingMore(false);
  }, [embla]);

  useEffect(() => {
    if (!embla || slides.length === embla.slideNodes().length - 1) return;
    const engine = embla.internalEngine();
    const boundsActive = engine.limit.reachedMax(engine.target.get());
    engine.scrollBounds.toggleActive(boundsActive);
  }, [embla, slides]);

  useEffect(() => {
    if (!embla || !hasMoreToLoad || pointerIsDown) return;
    if (slides.length === embla.slideNodes().length - 1) return;
    reloadEmbla();
    addScrollListener();
  }, [
    embla,
    slides,
    pointerIsDown,
    hasMoreToLoad,
    reloadEmbla,
    addScrollListener
  ]);

  useEffect(() => {
    if (!embla || hasMoreToLoad) return;
    if (slides.length === embla.slideNodes().length) return;
    if (pointerIsDown && !lastSlideIsInView()) return;
    reloadEmbla();
    embla.off("pointerDown", setPointerDown);
    embla.off("pointerUp", setPointerNotDown);
  }, [
    embla,
    slides,
    hasMoreToLoad,
    pointerIsDown,
    setPointerDown,
    setPointerNotDown,
    reloadEmbla,
    lastSlideIsInView
  ]);

  useEffect(() => {
    if (!embla) return;
    embla.on("pointerDown", setPointerDown);
    embla.on("pointerUp", setPointerNotDown);
    addScrollListener();
  }, [embla, setPointerDown, setPointerNotDown, addScrollListener]);

  return loadingMore;
};
