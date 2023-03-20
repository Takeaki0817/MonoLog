import Head from 'next/head';
import { AuthGuard } from '@/utils/AuthGuard';
import Page from '@/pages/product';

export default function Home() {
	return (
		<>
			<Head>
				<title>MonoLog</title>
				<meta
					name='description'
					content='メモよりもテキトーに、ひとりごとよりもシンプルに。ひとりごと型-思考整理アプリ'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='h-full overflow-y-scroll'>
				<AuthGuard>
					<Page />
				</AuthGuard>
			</main>
		</>
	);
}
