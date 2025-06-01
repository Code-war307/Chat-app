import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { CircleArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = ({userInfo}) => {
  return (
    <Card className={'w-full flex rounded-lg p-2 justify-between'}>
        <div className='flex items-center gap-2'>
            <Link href={'/dashboard/conversation'} className='block lg:hidden'>
            <CircleArrowLeft/>
            </Link>
            <Avatar className='w-8 h-8'>
              <AvatarImage src={userInfo.profilePic}/>
              <AvatarFallback>{userInfo.username.substring(0,1)}</AvatarFallback>
            </Avatar>
            <h2 className='font-semibold'>{userInfo.username}</h2>
        </div>
    </Card>
  )
}

export default Header