import React from 'react'
import HomeLayout from '../components/Home/Layout'
import NavigationBar from '../components/Global/NavBar'
import Footer from '../components/Global/Footer/Footer'

const HomeScreen = () => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <NavigationBar />
        <div className="flex flex-1 flex-col">
          <HomeLayout />
        </div>
      </div>
      <div className="pt-24">
        <Footer />
      </div>
    </>
  )
}

HomeScreen.propTypes = {}

export default HomeScreen
