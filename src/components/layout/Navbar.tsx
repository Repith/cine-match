'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menubar } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SettingsIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Menubar className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-purple-600 dark:text-purple-400"
        >
          CineMatch
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/movies"
            className="hover:text-purple-600 dark:hover:text-purple-400"
          >
            Movie List
          </Link>
          <Link
            href="/search"
            className="hover:text-purple-600 dark:hover:text-purple-400"
          >
            Search
          </Link>
          {session ? (
            <>
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="text-red-500"
              >
                Logout
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <SettingsIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
            </>
          ) : (
            <Link
              href="/auth"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 md:hidden flex justify-around p-3 border-t border-gray-300 dark:border-gray-700">
          <Link href="/" className="text-purple-600 dark:text-purple-400">
            Home
          </Link>
          <Link href="/movies" className="text-purple-600 dark:text-purple-400">
            Movies
          </Link>
          <Link href="/search" className="text-purple-600 dark:text-purple-400">
            Search
          </Link>
          {session ? (
            <Button
              variant="ghost"
              onClick={() => signOut()}
              className="text-red-500"
            >
              Logout
            </Button>
          ) : (
            <Link href="/auth" className="text-purple-600 dark:text-purple-400">
              Login
            </Link>
          )}
        </div>
      </div>
    </Menubar>
  );
};

export default Navbar;
