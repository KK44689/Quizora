
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { poppins } from '../font';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    return (
        <div className='relative flex flex-1 flex-shrink-0 items-center justify-center'>
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--theme-blue)]" />
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                id="default-search"
                className={`${poppins.className} text-sm w-full pl-10 pr-4 py-2 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={placeholder}
                required
            />
        </div>
    );
}