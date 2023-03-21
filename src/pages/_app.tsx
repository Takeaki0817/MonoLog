import '@/styles/globals.css';
import { useState, useEffect, useRef } from 'react';

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeFirebaseApp } from '@/libs/firebase';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/Header';

import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP400 = Noto_Sans_JP({
	weight: '400',
	display: 'swap',
	preload: false,
});
const notoSansJP700 = Noto_Sans_JP({
	weight: '700',
	display: 'swap',
	preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
	initializeFirebaseApp();

	const [headerHeight, setHeaderHeight] = useState('100vh');
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (headerRef && headerRef.current) {
			const headerHeight = headerRef.current.clientHeight; // Headerコンポーネントの高さを取得
			setHeaderHeight(`calc(100vh - ${headerHeight}px)`);
		}
	}, [headerRef]);

	return (
		<ChakraProvider>
			<AuthProvider>
				<div ref={headerRef}>
					<Header />
				</div>
				<div
					className='bg-slate-100 h-screen h-[100svh] flex flex-col min-h-0'
					style={{ height: `${headerHeight}` }}
				>
					<style jsx global>{`
						html {
							font-family: ${notoSansJP400.style.fontFamily}, ${notoSansJP700};
						}
					`}</style>
					<Component {...pageProps} />
				</div>
			</AuthProvider>
		</ChakraProvider>
	);
}
