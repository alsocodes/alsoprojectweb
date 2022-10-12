import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      // easing: 'ease-out-cubic',
      // once: true,
      // offset: 50,
      // delay: 50,
    });
  });

  return <Component {...pageProps} />;
}

export default MyApp;
