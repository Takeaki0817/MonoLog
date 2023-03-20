import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	collection,
	doc,
	getDoc,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '@/libs/firebase';

import ChatContainer from '@/components/chat/ChatContainer';
import AddChatMessage from '@/components/chat/AddChatMessage';

const ChatRoom = () => {
	const chatAreaRef = useRef<HTMLDivElement>(null);
	const [chats, setChats] = useState<{ id: string; text: string }[]>([]);
	const [roomName, setRoomName] = useState([]);
	const router = useRouter();
	const roomId = router.query['roomId'];

	// チャットルーム名を取得
	useEffect(() => {
		const fetchRoomName = async () => {
			if (!roomId) return;
			const roomDoc = doc(collection(db, 'chatRooms'), roomId.toString());
			const roomSnap = await getDoc(roomDoc);
			if (roomSnap.exists()) {
				setRoomName(
					roomSnap.data()['name'] != '' ? roomSnap.data()['name'] : '未設定'
				);
			}
		};
		fetchRoomName();
	}, [roomId]);

	// チャット機能
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, 'chatRooms', `${roomId}`, 'chats'),
				orderBy('createdAt')
			),
			(snapshot) => {
				const chatDocs = snapshot.docs.map((doc) => ({
					id: doc.id,
					text: doc.data()['text'],
					createdAt: doc.data()['createdAt'],
					userId: doc.data()['userId'],
				}));
				setChats(chatDocs);
				if (chatAreaRef.current) {
					chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [roomId]);

	return (
		<div className='bg-slate-100 flex flex-col min-h-0 h-full max-w-3xl mx-auto'>
			<div className='p-4'>
				<h2 className='text-xl font-bold px-4 py-2 flex gap-2 items-center bg-white rounded-full'>
					#<span>{roomName}</span>
					{/* TODO: チャットルーム名変更機能 */}
				</h2>
			</div>
			<ChatContainer className='flex flex-col min-h-0 h-full'>
				<div className='flex flex-col min-h-0 h-full'>
					<div
						ref={chatAreaRef}
						className='flex flex-col gap-4 px-4 overflow-y-auto min-h-0 h-full'
					>
						{chats.map((chat) => (
							<div key={chat.id} className='flex justify-end'>
								<div className='text-white font-bold bg-slate-600 px-5 py-3 rounded-lg relative'>
									{chat.text}
								</div>
							</div>
						))}
					</div>
					<div className='py-3 px-4 flex-shrink-0'>
						<AddChatMessage />
					</div>
				</div>
			</ChatContainer>
		</div>
	);
};

export default ChatRoom;
