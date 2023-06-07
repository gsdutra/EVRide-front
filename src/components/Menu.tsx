import ThemeSwitch from "./ThemeSwitch"
import Link from 'next/link';

export default function Menu(props: any){
	return (<div className="relative">
	<div className={`z-10 h-screen w-[100%] bg-black absolute top-0 left-0 hidebg ${props.show?"show":""}`} onClick={()=>props.hide(false)}/>
	<div className={`h-screen w-[60%] max-w-[350px] bg-light dark:bg-dark absolute top-0 left-0 z-20 p-14 ${props.show?"menu":"menuhidden"}`}>
			<Link href='/chats'>
				Chats
			</Link> <br/><br/>
			<Link href='/sell'>
				Anunciar veículo
			</Link> <br/><br/>
			<Link href='/search'>
				Procurar veículos
			</Link> <br/><br/>
			<Link href='/search'>
				Meus anúncios
			</Link> <br/><br/>
			Esquema de cores: <br/>
			<ThemeSwitch/>
		</div>
	</div>)
}