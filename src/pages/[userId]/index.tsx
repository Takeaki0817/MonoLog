import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	doc,
	query,
	where,
	orderBy,
	onSnapshot,
	Unsubscribe,
	updateDoc,
} from 'firebase/firestore';
import { db } from '@/libs/firebase';
import ChatContainer from '@/components/chat/ChatContainer';
import AddChatRoom from '@/components/chat/AddChatRoom';

const ChatRoomList = () => {
	const [chatRooms, setChatRooms] = useState<{ id: string; name: string }[]>(
		[]
	);
	const router = useRouter();
	const auth = getAuth();
	const [userId, setUserId] = useState<string | null>('');
	const [editingRoomId, setEditingRoomId] = useState('');
	const [editingName, setEditingName] = useState('');

	useEffect(() => {
		// AuthProviderでも似たようなコードあった
		const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				setUserId(null);
			}
		});
		return () => {
			unsubscribeAuth();
		};
	}, [auth]);

	useEffect(() => {
		let unsubscribe: Unsubscribe;
		if (userId) {
			unsubscribe = onSnapshot(
				query(
					collection(db, 'chatRooms'),
					where('uid', '==', userId),
					orderBy('createdAt', 'desc')
				),
				(snapshot) => {
					const chatRoomDocs = snapshot.docs.map((doc) => ({
						id: doc.id,
						name: doc.data()['name'],
						createdAt: doc.data()['createdAt'],
					}));
					setChatRooms(chatRoomDocs);
				}
			);
		}
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userId]);

	const handleClick = (id: string) => {
		router.push(`/${userId}/${id}`);
	};

	const handleEditClick = (chatRoom: { id: string; name: string }) => {
		setEditingRoomId(chatRoom.id);
		setEditingName(chatRoom.name);
	};

	const handleSave = async () => {
		try {
			const docRef = doc(db, 'chatRooms', editingRoomId);
			// Firebaseのデータベースに変更を保存
			await updateDoc(docRef, {
				name: editingName,
			});
			setEditingRoomId('');
			setEditingName('');
		} catch (error) {
			console.error('Error updating document: ', error);
		}
	};

	return (
		<div className='bg-slate-100 flex flex-col min-h-0 h-full w-full max-w-3xl mx-auto'>
			<div className='p-4'>
				<AddChatRoom />
			</div>
			<ChatContainer className='flex flex-col min-h-0 h-full'>
				<ul className='px-1 pb-10 flex flex-col min-h-0 h-full overflow-y-auto'>
					{chatRooms.map((chatRoom) => (
						<li
							className='text-lg font-bold flex border-b-2 border-solid border-b-slate-300'
							key={chatRoom.id}
							// onClick={() => handleClick(chatRoom.id)}
						>
							{editingRoomId === chatRoom.id ? (
								<>
									<div className='w-full text-left pl-5 py-6'>
										<input
											type='text'
											value={editingName}
											onChange={(e) => setEditingName(e.target.value)}
										/>
									</div>
									<button onClick={handleSave} className='px-5 py-6'>
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
												d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => handleClick(chatRoom.id)}
										className='w-full text-left pl-5 py-6'
									>
										{chatRoom.name != '' ? chatRoom.name : '未設定'}
									</button>
									<button
										onClick={() => handleEditClick(chatRoom)}
										className='px-5 py-6'
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
												d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
											/>
										</svg>
									</button>
								</>
							)}
						</li>
					))}
				</ul>
			</ChatContainer>
		</div>
	);
};

export default ChatRoomList;
