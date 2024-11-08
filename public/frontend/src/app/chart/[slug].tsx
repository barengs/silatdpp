import { useRouter } from 'next/router'
import React from 'react'

const UserDetail = () => {

const router = useRouter();
const { slug } = router.query;


  return (
    <div>Hello {slug}</div>
  )
}

export default UserDetail;