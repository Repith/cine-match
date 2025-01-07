'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menubar } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Film,
  Search as SearchIcon,
  Settings as SettingsIcon,
  LogOut,
  LogIn,
} from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? 'text-purple-600 dark:text-purple-400'
      : 'text-gray-500 dark:text-gray-300';

  return (
    <Menubar
      className="
        fixed top-0 left-0 right-0 md:h-16
        bg-white dark:bg-gray-900 shadow-md z-50
        py-4
      "
    >
      <div
        className="
          container max-w-screen-xl mx-auto
          flex items-center justify-between
          px-6 
        "
      >
        {/* Logo (desktop) */}
        <Link
          href="/"
          className="
            hidden md:block text-2xl font-extrabold 
            text-purple-600 dark:text-purple-400
          "
        >
          CineMatch
        </Link>

        {/* Desktop Links */}
        <div
          className="
            hidden md:flex items-center space-x-6
            text-lg /* zwiększona czcionka linków */
          "
        >
          {/* Movies */}
          <Link
            href="/movies"
            className={`
              transition-colors duration-200 
              hover:text-purple-600 dark:hover:text-purple-400
              ${isActive('/movies')}
            `}
          >
            Movies
          </Link>

          {/* Search */}
          <Link
            href="/search"
            className={`
              transition-colors duration-200 
              hover:text-purple-600 dark:hover:text-purple-400
              ${isActive('/search')}
            `}
          >
            Search
          </Link>

          {/* CineMatch */}
          <Link
            href="/swipe"
            className={`
              transition-colors duration-200 
              hover:text-purple-600 dark:hover:text-purple-400
              flex items-center space-x-1
              ${isActive('/swipe')}
            `}
          >
            <Film className="w-5 h-5" />
            <span>Swipe</span>
          </Link>

          {/* Dropdown: Settings + ThemeToggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <SettingsIcon
                  className={`
                    h-5 w-5 
                    transition-colors duration-200
                    ${
                      pathname.startsWith('/settings')
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-500 dark:text-gray-300'
                    }
                    hover:text-purple-600 dark:hover:text-purple-400
                  `}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ThemeToggle />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login / Logout */}
          {session ? (
            <Button
              variant="ghost"
              onClick={() => signOut()}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
            >
              Logout
            </Button>
          ) : (
            <Link
              href="/auth"
              className="
                transition-colors duration-200
                hover:text-purple-600 dark:hover:text-purple-400
              "
            >
              Login
            </Link>
          )}
        </div>

        {/* Logo (mobile) */}
        <Link
          href="/"
          className="
            md:hidden text-2xl font-extrabold
            text-purple-600 dark:text-purple-400
          "
        >
          CineMatch
        </Link>
      </div>

      {/* Mobile Navbar (Bottom Nav) */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          bg-white dark:bg-gray-900 
          md:hidden flex justify-between
          px-5 py-2 border-t border-gray-300 dark:border-gray-700
        "
      >
        {/* Movies */}
        <Link
          href="/movies"
          className={`
            flex flex-col items-center 
            transition-transform duration-200
            hover:-translate-y-1 /* leciutkie uniesienie */
            ${
              pathname === '/movies'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }
          `}
        >
          <Film className="h-6 w-6" />
          <span className="text-xs">Movies</span>
        </Link>

        {/* Search */}
        <Link
          href="/search"
          className={`
            flex flex-col items-center 
            transition-transform duration-200
            hover:-translate-y-1
            ${
              pathname === '/search'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }
          `}
        >
          <SearchIcon className="h-6 w-6" />
          <span className="text-xs">Search</span>
        </Link>

        {/* CineMatch */}
        <Link
          href="/swipe"
          className={`
            flex flex-col items-center 
            transition-transform duration-200
            hover:-translate-y-1
            ${
              pathname === '/swipe'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }
          `}
        >
          <Film className="h-7 w-7" />
          <span className="text-xs">Swipe</span>
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={`
            flex flex-col items-center
            transition-transform duration-200
            hover:-translate-y-1
            ${
              pathname.startsWith('/settings')
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }
          `}
        >
          <SettingsIcon className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </Link>

        {/* Login / Logout */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="
              flex flex-col items-center text-red-500 
              transition-transform duration-200
              hover:-translate-y-1 hover:bg-red-50 dark:hover:bg-red-900
              rounded-full p-2 
            "
          >
            <LogOut className="h-6 w-6" />
            <span className="text-xs">Logout</span>
          </button>
        ) : (
          <Link
            href="/auth"
            className="
              flex flex-col items-center
              text-gray-500 dark:text-gray-300
              transition-transform duration-200
              hover:-translate-y-1 hover:text-purple-600 dark:hover:text-purple-400
            "
          >
            <LogIn className="h-6 w-6" />
            <span className="text-xs">Login</span>
          </Link>
        )}
      </div>
    </Menubar>
  );
};

export default Navbar;
