import { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import UserNotLogged from '@/components/UserNotLogged';

export default function Anunciar() {
	const [userLogged, setUserLogged] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
		.then((e) => setUserLogged(true))
		.catch((e) => setUserLogged(false))
	}, [])

	return (<>
		{userLogged?
		<div  className="mt-[50px] flex flex-col justify-center items-center text-xl">
			Anunciar veículo
		</div>
		:
		<UserNotLogged/>
		}
	</>)
}