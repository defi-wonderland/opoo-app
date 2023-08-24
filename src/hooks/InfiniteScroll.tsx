import { useEffect } from 'react';

interface Props {
  update: () => Promise<void>;
  loading: boolean;
}

export const InfiniteScroll = ({ update, loading }: Props) => {
  // We need to keep track of the scrolling state to avoid calling the update function multiple times
  let isScrolling = false;

  const handleScroll = async () => {
    if (isScrolling) return;

    isScrolling = true;

    const diff = document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop;

    const threshold = 0.8; // 80% of the page
    if (diff > window.innerHeight * threshold || loading) {
      isScrolling = false;
      return;
    }

    await update();

    isScrolling = false;
  };

  // Add the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // If the loading state changes, we need to check if we need to load more data
  useEffect(() => {
    if (!loading) handleScroll();
  }, [loading]);

  return null;
};
