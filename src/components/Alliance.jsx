import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { getUser } from '../store/ducks/user'
import { getUser } from '../store/ducks/userSlice'

export default function Alliance() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('calling get')
    console.log(getUser.type)
    dispatch(getUser())
  }, [dispatch])

  const alliance = useSelector((state) => state.user)
  console.log(alliance)
  return (
    <>
      H
    </>
  )

}

