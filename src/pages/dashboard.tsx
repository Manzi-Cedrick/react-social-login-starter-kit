import RouteProtector from '@/utils/RouteProtection'
import React from 'react'

const Dashboard = () => {
  return (
    <RouteProtector>Welcome</RouteProtector>
  )
}

export default Dashboard