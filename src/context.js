import axios from 'axios'
import React, { useContext, useState, useEffect, useMemo } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const saveUser = (user) => {
    setUser(user)
  }

  const removeUser = () => {
    setUser(null)
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`)
      saveUser(data.user)
    } catch (error) {
      removeUser()
    }
    setIsLoading(false)
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout')
      removeUser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const contextValue = useMemo(() => {
    return {
      isLoading,
      saveUser,
      user,
      logoutUser,
    }
  }, [isLoading, user])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
