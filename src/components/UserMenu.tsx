import Link from 'next/link';

export default function Menu(props: any){
	return (<div className="relative">
	<div className={`z-10 h-screen w-[100%] bg-black absolute top-0 left-0 hidebg ${props.show?"show":""}`} onClick={()=>props.hide(false)}/>
	<div className={`h-screen w-[60%] max-w-[350px] bg-light dark:bg-dark absolute top-0 right-0 z-20 p-14 ${props.show?"usermenu":"usermenuhidden"}`}>

			<Link href='/signup'>
				<button onClick={()=>props.hide(false)} className='button bt bg-blue w-[240px]'>
					CRIAR CONTA
				</button>
			</Link>

			<div className="mt-5"/>

			<Link href='/signin'>
				<button onClick={()=>props.hide(false)} className='button bt bg-gray w-[240px]'>
					FAZER LOGIN
				</button>
			</Link>
		</div>
	</div>)
}