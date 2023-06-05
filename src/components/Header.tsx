import Image from 'next/image'
import Menu from './Menu'
import {useTheme} from 'next-themes'

export default function Header(){
	let logoColor = 'light';
	if (useTheme().theme === 'dark') logoColor = 'dark';
	return(
		<div className="h-20 flex justify-between p-3 bg-seclight dark:bg-secdark">
			<Image src={`/menu_${logoColor}.svg`} width={100} height={1} alt="logo" className="fill-txtdark"/>
			<img src={`/logo_${logoColor}_mode.png`} alt="logo"/>
			<Image src={`/user_${logoColor}.svg`} width={100} height={1} alt="logo"/>
		</div>
	)
}