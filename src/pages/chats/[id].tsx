import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router'
import { use, useEffect, useState } from 'react';
import UserNotLogged from '@/components/UserNotLogged';
import Link from 'next/link';

export default function Chat() {
	const router = useRouter()

	const [userLogged, setUserLogged] = useState(true);
	const [update, setUpdate] = useState(false);
	const [chatData, setChatData] = useState<any>({
		messages: [],
		seller: {imageUrl: ''},
		buyer: {imageUrl: ''},
		listing: {brand: {name: ''}, model: {name: ''}}
	});
	const [as, setAs] = useState<string>('buyer');
	const [userId, setUserId] = useState<number>(0);

	const id = router.query.id;

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const checkUser = useApi.get('/user', token)
			.then((e) => {
				setUserLogged(true)
				setUserId(e.data.id)
			})
			.catch((e) => setUserLogged(false))
	}, [])

	useEffect(() => {
		if (!userLogged) return;
		const token = localStorage.getItem("token") || "";
		const getMessages = useApi.get('/chat/' + id, token)
			.then((e) => {
				setChatData(e.data.chat)
				setAs(e.data.as)
			})
			.catch((e) => console.log(e))
	}, [userLogged, update, id])

	return (<>
		{userLogged ?
		<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
			<div className="bg-seclight dark:bg-secdark max-w-[600px] h-24 w-full flex items-center pl-4 pr-4 rounded-3xl mb-2">
				{as === 'buyer' ?
					<>
						<img src={chatData.seller.imageUrl} className="h-20 w-auto img-cover rounded-full mr-7" />
						<div>
						<p className="text-sm">{chatData.seller.name}</p>
						<p>{chatData.listing.brand.name + ' ' + chatData.listing.model.name}</p>
						</div>
					</>
					:
					<>
						<img src={chatData.buyer.imageUrl} className="h-20 w-auto img-cover rounded-full mr-7" />
						<div>
						<p className="text-sm">{chatData.buyer.name}</p>
						<p>{chatData.listing.brand.name + ' ' + chatData.listing.model.name}</p>
						</div>
						
					</>
				}
			</div>

			<div className='max-w-[600px] w-full flex flex-col'>
				{chatData.messages.map((message: any, i: number) => {
					console.log('ID: '+message.senderId, userId)
					return (
						<>
						{
							message.senderId == userId ?
							<div className="bg-blue max-w-[500px] text-black m-2 p-3 text-right self-end rounded-full rounded-br-lg" key={i}>
								{message.message}
							</div>
							:
							<div className="bg-seclight max-w-[500px] dark:bg-secdark m-2 p-3 text-right self-start rounded-full rounded-bl-lg" key={i}>
								{message.message}
							</div>
						}
						</>
					)
				})}
			</div>

		</div>
		:
		<UserNotLogged />}
	</>)
}