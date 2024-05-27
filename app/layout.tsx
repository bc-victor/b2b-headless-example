import Navbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        {/* Add your script tag here */}
        {/* <script
          type="module"
          data-storehash="glzvoziq5k"
          data-channelid="1489146"
          src="http://localhost:3001/src/buyerPortal.ts"
        ></script> */}
        <script
          id="script-buyer-portal"
          type="module"
          data-storehash="glzvoziq5k"
          data-channelid="1489146"
          src="https://store-glzvoziq5k.mybigcommerce.com/content/bp/index.Y2Gr2Y9Q.js"
        ></script>
        <script src="https://store-glzvoziq5k.mybigcommerce.com/dav/content/bp/polyfills-legacy.NdEEpcpz.js"></script>
        <script src="https://store-glzvoziq5k.mybigcommerce.com/dav/content/bp/index-legacy.BuT-gmvs.js"></script>
      </body>
    </html>
  );
}
