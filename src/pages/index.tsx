import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
          <Image
            src="/logo_light_mode.png"
            width={350}
            height={100}
            alt="logo"
          />
          <a>O seu marketplace de veículos sustentáveis</a>
    </div>
  )
}
