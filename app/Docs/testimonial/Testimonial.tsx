import Image from 'next/image'
import React from 'react'
import Picture from "@/public/Picture.png"

export default function Testimonial({ 
  darkMode = false, 
  name = "Mohamed Zouine", 
  role = "UX Designer", 
  content = "Hello all the city of gotham, i want to thanks the jocker for this opportunity that he gives me to play my little games that i'm aware that i does it in a matter of seconds",
  avatarSrc = Picture.src
}) {
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white'
  const borderColor = darkMode ? 'border-gray-700' : 'border-[#D4D4D8]'
  const nameColor = darkMode ? 'text-gray-100' : 'text-[#09090B]'
  const roleColor = darkMode ? 'text-gray-400' : 'text-[#A1A1AA]'
  const textColor = darkMode ? 'text-gray-300' : 'text-[#71717A]'

  return (
    <section className={`lg:w-[396px] w-[343px] px-6 py-6 rounded-[20px] border justify-center items-center lg:items-start ${borderColor} ${bgColor} flex flex-col gap-[24px]`}>
      <div className='flex lg:flex-row flex-col items-center gap-2'>
        <Image className='rounded-full h-12 w-12' src={avatarSrc} alt='avatar' width={1920} height={1920}/>
        <div className='flex flex-col gap-1'>
          <h1 className={`text-[16px] leading-5 text-center lg:text-start ${nameColor} font-semibold`}>
            {name}
          </h1>
          <h2 className={`text-[14px] text-center lg:text-start leading-[18px] ${roleColor}`}>
            {role}
          </h2>
        </div>
      </div>
      <p className={`-tracking-2 ${textColor} text-base font-normal lg:text-start text-center`}>
        {content}
      </p>
    </section>
  )
}