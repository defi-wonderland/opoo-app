import { useEffect } from 'react';

interface Props {
  update: () => void;
  loading: boolean;
}

export const InfiniteScroll = ({ update, loading }: Props) => {
  const handleScroll = async () => {
    // diff between the bottom of the page and the user's current position
    const diff = document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop;

    // if the user is not at the bottom of the page, or if the requests are still loading, do nothing
    if (diff > 300 || loading) return;

    update();
  };

  useEffect(() => {
    // infinite scroll implementation
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return null;
};
