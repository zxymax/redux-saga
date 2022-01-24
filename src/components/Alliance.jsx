import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/ducks/user'

export default function Alliance() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const alliance = useSelector((state) => state)
  console.log(alliance)
  return (
    <>
      H
    </>
  )

}

