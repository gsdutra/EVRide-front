import Image from 'next/image';
import {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'

export default function Home() {
  let logoColor = 'light';
  if (useTheme().theme === 'dark') logoColor = 'dark';
  const logoPath = `/logo_${logoColor}_mode.png`;
  return (
    <div className='flex flex-col items-center pt-[2rem]'>
          <Image
            src={logoPath}
            width={350}
            height={100}
            alt="logo"
          />
          <a className="mt-5 text-xl">O seu marketplace de veículos sustentáveis</a>

          <div className="mt-[30px]"/>

          <button className="button bt bg-blue w-[341px]">
            <a>PROCURAR VEÍCULOS</a>
          </button>

          <button className="button bt bg-gray w-[341px]">
            <a>ANUNCIE SEU VEÍCULO</a>
          </button>
    </div>
  )
}
