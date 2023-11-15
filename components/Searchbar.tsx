'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductLink = (link: string) => {
    try {
      const parsedUrl = new URL(link);
      const hostname = parsedUrl.hostname;
      if (hostname.includes('amazon.com' || 'amazon.') || hostname.endsWith('amazon')) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductLink(searchTerm);
    if (!isValidLink) return alert('Please enter a valid Amazon product link');

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchTerm);
      console.log(product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type='text'
        className='searchbar-input'
        placeholder='Enter Amazon Product Link'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type='submit'
        className='searchbar-btn'
        disabled={searchTerm.length === 0 || isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
