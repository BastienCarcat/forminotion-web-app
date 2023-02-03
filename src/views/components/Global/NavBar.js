import { useAuth0 } from '@auth0/auth0-react'
import _ from 'lodash'
import React, { Fragment, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Logo from '../../../Images/logo.svg'
import { config } from '../../../config'

const NavigationBar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  const { appUrl } = config || {}

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
      <Disclosure as="nav" className="w-full bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
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
                  <div className="flex items-center font-main font-bold">
                    <Link to="/" className="flex items-center">
                      <img
                        className="mr-2 h-8 w-8"
                        src={Logo}
                        alt="forminotion-logo"
                      />
                      <span>Forminotion</span>
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-primary text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href={`${appUrl}#pricing`}
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Pricing
                    </a>
                    <a
                      href={`${appUrl}#guide`}
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Guide
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  {isAuthenticated ? (
                    <>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleNavigate('/forms')}
                          className="inline-flex items-center rounded border border-transparent bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-primary-600"
                        >
                          <span>My workspace</span>
                        </button>
                      </div>
                      <div className="z-10 hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex rounded-full bg-white text-sm ">
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
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleNavigate('/logout')}
                                      className={clsx(
                                        'w-full px-4 py-2 text-left text-sm text-gray-700',
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
                        className="mx-2 inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium text-primary hover:text-primary-200"
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
                        className="inline-flex items-center rounded border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600"
                      >
                        Try for free
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {/* Current: "bg-primary-50 border-primary text-primary-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <a
                  href={`${appUrl}#pricing`}
                  className={clsx(
                    'block flex w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6',
                    _.get(location, 'pathname') === '/pricing'
                      ? 'border-primary bg-primary-50 text-primary-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  Pricing
                </a>
                <a
                  href={`${appUrl}#guide`}
                  className={clsx(
                    'block flex w-full border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6',
                    _.get(location, 'pathname') === '/pricing'
                      ? 'border-primary bg-primary-50 text-primary-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  Guide
                </a>
              </div>
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-4 pb-3">
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
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                    >
                      My forms
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
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
