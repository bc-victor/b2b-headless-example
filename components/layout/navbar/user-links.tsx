'use client';

import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';

const loggedInLinks = [
  { title: 'Account', route: 'ORDERS' },
  { title: 'Log out', route: 'LOG_OUT' }
];
const loggedOutLinks = [
  { title: 'Log in', route: 'SIGN_IN' },
  { title: 'Register', route: 'REGISTER_ACCOUNT' }
];

export default function UserLinks({ mobile }: { mobile: boolean }) {
  const [component, setComponent] = useState<ReactElement | null>(null);
  const containerClassess = mobile
    ? 'flex w-full flex-col'
    : 'hidden gap-6 text-sm md:flex md:items-center';
  const linkClassess = mobile
    ? 'py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white'
    : 'text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300';

  const handleClick = ({ currentTarget }: SyntheticEvent<HTMLButtonElement>) => {
    const { route } = currentTarget.dataset;
    if (!route || route === '') return;

    window.b2b.utils.openPage(route);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!window.b2b?.initializationEnvironment.isInit) {
        return;
      }

      clearInterval(intervalId);
      const selectedLinks =
        window.b2b.utils.user.getProfile()?.role === 100 ? loggedOutLinks : loggedInLinks;
      setComponent(
        <ul className={containerClassess}>
          {selectedLinks.map((link) => (
            <li key={link.route} className={linkClassess}>
              <button onClick={handleClick} data-route={link.route}>
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      );
    }, 50);
  }, []);

  return component;
}
