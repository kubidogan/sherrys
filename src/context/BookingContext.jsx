import { createContext, useState, useContext } from 'react'

const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({})
  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
