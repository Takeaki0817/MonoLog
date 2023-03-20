import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
	Unsubscribe,
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

	return (
		<div className='bg-slate-100 flex flex-col min-h-0 h-full max-w-3xl mx-auto'>
			<div className='p-4'>
				<AddChatRoom />
			</div>
			<ChatContainer className='flex flex-col min-h-0 h-full'>
				<ul className='px-1 pb-10 flex flex-col min-h-0 h-full overflow-y-auto'>
					{chatRooms.map((chatRoom) => (
						<li
							className='text-lg font-bold px-5 py-6 border-b-2 border-solid border-b-slate-300'
							key={chatRoom.id}
							onClick={() => handleClick(chatRoom.id)}
						>
							<button onClick={() => handleClick(chatRoom.id)}>
								{chatRoom.name != '' ? chatRoom.name : '未設定'}
							</button>
						</li>
					))}
				</ul>
			</ChatContainer>
		</div>
	);
};

export default ChatRoomList;
