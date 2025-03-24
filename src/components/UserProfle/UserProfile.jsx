import React, { useState, useRef, useEffect } from 'react'
import './userProfile.scss'
import { useGlobalContext } from '../../context'

const UserProfile = () => {
  const { user, logoutUser } = useGlobalContext()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get first letter of name for avatar
  const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : '?'
  }

  return (
    <div className='user-profile' ref={dropdownRef}>
      <div
        className='user-profile__avatar'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {getInitial()}
      </div>

      {isDropdownOpen && (
        <div className='user-profile__dropdown'>
          <div className='user-profile__info'>
            <span className='user-profile__name'>{user?.name}</span>
            <span className='user-profile__email'>{user?.email}</span>
          </div>
          <div className='user-profile__divider'></div>
          <button className='user-profile__logout-btn' onClick={logoutUser}>
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
