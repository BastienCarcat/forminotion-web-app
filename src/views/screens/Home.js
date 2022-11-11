import React from 'react'
import HomeLayout from '../components/Home/Layout'
import NavigationBar from '../components/Global/NavBar'
import Footer from '../components/Global/Footer'

const HomeScreen = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <NavigationBar />
        <div className="flex-1 flex flex-col">
          <HomeLayout />
        </div>
      </div>
      <Footer />
    </>
  )
}

HomeScreen.propTypes = {}

export default HomeScreen
