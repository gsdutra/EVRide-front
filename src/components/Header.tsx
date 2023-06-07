import Image from 'next/image'
import {useState} from 'react'
import Menu from './Menu'
import UserMenu from './UserMenu'
import {useTheme} from 'next-themes'
import { useRouter } from 'next/router';

export default function Header(){
	const router = useRouter();

	const [showMenu, setShowMenu] = useState(false);
	const [showUser, setShowUser] = useState(false);

	let logoColor = 'light';
	if (useTheme().theme === 'dark' || 'system') logoColor = 'dark';
	return(<div className='overflow-y-hidden h-screen overflow-x-hidden'>
		<div className="h-20 flex justify-between p-3 bg-seclight dark:bg-secdark z-50">
			<Image src={`/menu_${logoColor}.svg`} width={100} height={1} alt="logo" className="button"
			onClick={()=>(setShowMenu(!showMenu))}/>

			<img src={`/logo_${logoColor}_mode.png`} alt="logo"
			className="button" onClick={()=>router.push('/')}/>

			<Image src={`/user_${logoColor}.svg`} width={100} height={1} alt="logo" className="button"
			onClick={()=>(setShowUser(!showUser))}/>
		</div>
		<Menu show={showMenu} hide={setShowMenu}/>
		<UserMenu show={showUser} hide={setShowUser}/>
	</div>)
}