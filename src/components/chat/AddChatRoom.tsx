import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/libs/firebase';

const AddChatRoom = () => {
	const [name, setName] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const collectionPath = collection(db, 'chatRooms');

		await addDoc(collectionPath, {
			name,
			createdAt: serverTimestamp(),
			uid: getAuth().currentUser?.uid,
		});
		setName('');
	};

	return (
		<form
			className='px-4 flex justify-between bg-white rounded-full'
			onSubmit={handleSubmit}
		>
			<div className='w-full'>
				<input
					type='text'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='トピック名'
					className='w-full py-2 px-1 bg-transparent'
				/>
			</div>
			<button
				type='submit'
				className='grid place-items-center rounded-full dark:bg-gray-800 '
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M12 4.5v15m7.5-7.5h-15'
					/>
				</svg>
			</button>
		</form>
	);
};

export default AddChatRoom;
