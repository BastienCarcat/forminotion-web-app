import { useAuth0 } from '@auth0/auth0-react'
import _ from 'lodash'
import React, { Fragment, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

const NavigationBar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  const login = useCallback(
    async (opt = {}) => {
      try {
        await loginWithRedirect({ ...opt })
      } catch (e) {
        console.error(e)
      }
    },
    [loginWithRedirect]
  )

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow w-full">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="font-main flex items-center font-bold">
                    <Link to="/">Forminotion</Link>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-primary text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <button
                      onClick={() => handleNavigate('pricing')}
                      className={clsx(
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                        _.get(location, 'pathname') === '/pricing'
                          ? 'border-primary text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      Pricing
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  {isAuthenticated ? (
                    <>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleNavigate('/forms')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-600"
                        >
                          <span>My workspace</span>
                        </button>
                      </div>
                      <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center z-10">
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none ">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={_.get(user, 'picture')}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleNavigate('#')}
                                      className={clsx(
                                        'w-full text-left px-4 py-2 text-sm text-gray-700',
                                        active ? 'bg-gray-100' : ''
                                      )}
                                    >
                                      View profile
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleNavigate('#')}
                                      className={clsx(
                                        'w-full text-left px-4 py-2 text-sm text-gray-700',
                                        active ? 'bg-gray-100' : ''
                                      )}
                                    >
                                      Settings
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleNavigate('/logout')}
                                      className={clsx(
                                        'w-full text-left px-4 py-2 text-sm text-gray-700',
                                        active ? 'bg-gray-100' : ''
                                      )}
                                    >
                                      Logout
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={login}
                        type="button"
                        className="inline-flex items-center mx-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary hover:text-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Sign in
                      </button>
                      <button
                        onClick={() =>
                          login({
                            screen_hint: 'signup'
                          })
                        }
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Try for free
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-primary-50 border-primary text-primary-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="button"
                  onClick={() => handleNavigate('pricing')}
                  className={clsx(
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 w-full flex',
                    _.get(location, 'pathname') === '/pricing'
                      ? 'bg-primary-50 border-primary text-primary-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  Pricing
                </Disclosure.Button>
              </div>
              {isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={_.get(user, 'picture')}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {_.get(user, 'nickname')}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {_.get(user, 'email')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="button"
                      onClick={() => handleNavigate('/forms')}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      My forms
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
