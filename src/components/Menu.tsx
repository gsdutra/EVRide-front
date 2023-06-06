import ThemeSwitch from "./ThemeSwitch"

export default function Menu(props: any){
	return (
	<div className={`z-10 h-screen w-[100%] bg-black bg-opacity-50 absolute top-0 left-0 ${props.show?"":"hidden"}`} onClick={()=>props.hide(false)}>
		<div className="h-screen w-[60%] bg-light dark:bg-dark absolute top-0 left-0 z-20">
			<ThemeSwitch/>
		</div>
	</div>
	)
}