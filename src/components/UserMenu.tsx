import 'animate.css';

export default function Menu(props: any){
	return (<>
	<div className={`z-10 h-screen w-[100%] bg-black bg-opacity-50 absolute top-0 left-0 ${props.show?"":"hidden"}`} onClick={()=>props.hide(false)}/>
	<div className={`h-screen w-[60%] max-w-[350px] bg-light dark:bg-dark absolute top-0 right-0 z-20 p-14 ${props.show?"":"hidden"} fade-in-out`}>

			<button className='button bt bg-blue w-[240px]'>
				<a>CRIAR CONTA</a>
			</button>
			<div className="mt-5"/>
			<button className='button bt bg-gray w-[240px]'>
				<a>FAZER LOGIN</a>
			</button>
		</div>
	</>)
}