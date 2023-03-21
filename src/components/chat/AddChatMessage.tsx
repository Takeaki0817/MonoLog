import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/libs/firebase';

const AddChatMessage = () => {
	const [text, setText] = useState('');
	const router = useRouter();
	const roomId = router.query['roomId'];

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text) {
			// TODO: テキスト未入力のアラート
			return; // text が空の場合、関数を抜ける
		}

		const collectionPath = collection(db, 'chatRooms', `${roomId}`, 'chats');

		await addDoc(collectionPath, {
			text,
			createdAt: serverTimestamp(),
			userId: getAuth().currentUser?.uid,
		});
		setText('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='px-4 py-2 flex justify-between bg-white rounded-full drop-shadow'
		>
			<input
				type='text'
				value={text}
				onChange={handleChange}
				placeholder='ひとりごとを入力'
				className='w-full py-4 px-1'
			/>
			<button type='submit'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
					className='w-5 h-5'
				>
					<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
				</svg>
			</button>
		</form>
	);
};
export default AddChatMessage;
