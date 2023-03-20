import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { FirebaseError } from '@firebase/util';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import SearchBar from '@/components/SerchBar';

export const Header = () => {
	const { user } = useAuthContext();
	const toast = useToast();
	const { push } = useRouter();

	const handleSignOut = async () => {
		try {
			const auth = getAuth();

			await signOut(auth);
			toast({
				title: 'ログアウトしました。',
				status: 'success',
				position: 'top',
			});
			push('/signin');
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.log(error);
			}
		}
	};
	const auth = getAuth();
	const userId = auth.currentUser?.uid;

	const router = useRouter();

	return (
		<header className='flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700'>
			<nav
				className='relative max-w-7xl w-full h-20 mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8'
				aria-label='Global'
			>
				<div className='flex items-center justify-between'>
					{router.pathname === '/[userId]/[roomId]' ? (
						<Link
							className='text-lg font-semibold dark:text-white flex items-center gap-1'
							href={`/${userId}`}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='w-4 h-4 shrink-0'
							>
								<path
									fillRule='evenodd'
									d='M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z'
									clipRule='evenodd'
								/>
							</svg>
							もどる
						</Link>
					) : (
						<h1>
							<Link
								className='flex-none text-xl font-semibold dark:text-white'
								href={'/product'}
							>
								MonoLog
							</Link>
						</h1>
					)}
				</div>

				<div className=''>
					{user ? (
						<button
							className='py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500'
							onClick={handleSignOut}
						>
							ログアウトする
						</button>
					) : (
						<Link
							className='flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:my-6 sm:pl-6 dark:text-gray-400 dark:hover:text-blue-500'
							href='/signin'
						>
							<svg
								className='w-4 h-4'
								xmlns='http://www.w3.org/2000/svg'
								width={16}
								height={16}
								fill='currentColor'
								viewBox='0 0 16 16'
							>
								<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
							</svg>
							ログインする
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
};
