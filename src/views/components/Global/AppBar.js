import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon, XIcon, FolderIcon } from '@heroicons/react/outline'
import { SelectorIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import _ from 'lodash'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../Images/logo.svg'

const UserMenu = () => {
  const navigate = useNavigate()

  const redirectToWebsite = useCallback(() => {
    window.location.href = 'https://www.forminotion.com/'
  }, [])

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={clsx(
          'absolute right-0 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:left-0 lg:w-auto lg:origin-top'
        )}
      >
        <div className="py-1">
          {/*<Menu.Item>*/}
          {/*  {({ active }) => (*/}
          {/*    <button*/}
          {/*      onClick={() => navigate('#')}*/}
          {/*      className={clsx(*/}
          {/*        'w-full text-left px-4 py-2 text-sm',*/}
          {/*        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'*/}
          {/*      )}*/}
          {/*    >*/}
          {/*      View profile*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*</Menu.Item>*/}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={redirectToWebsite}
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm',
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                )}
              >
                Go to website
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/logout')}
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm',
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                )}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  )
}

const AppBar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user } = useAuth0()
  const navigate = useNavigate()

  const navigationItems = useMemo(
    () => [
      { name: 'Forms', path: '/forms', icon: FolderIcon, current: true }
      // { name: 'Settings', path: '#', icon: CogIcon, current: false }
    ],
    []
  )

  // const tags = useMemo(
  //   () => [
  //     { name: 'Engineering', path: '#', bgColorClass: 'bg-indigo-500' },
  //     { name: 'Human Resources', path: '#', bgColorClass: 'bg-green-500' },
  //     { name: 'Customer Success', path: '#', bgColorClass: 'bg-yellow-500' }
  //   ],
  //   []
  // )

  return (
    <>
      <div className="h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="mr-2 h-8 w-auto"
                    src={Logo}
                    alt="forminotion-logo"
                  />
                  Forminotion
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => navigate(_.get(item, 'path'))}
                          className={clsx(
                            'group flex w-full items-center rounded-md px-2 py-2 text-base font-medium leading-5',
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={clsx(
                              'mr-3 h-6 w-6 flex-shrink-0',
                              item.current
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      ))}
                    </div>
                    {/*<div className="mt-8">*/}
                    {/*  <h3*/}
                    {/*    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"*/}
                    {/*    id="mobile-teams-headline"*/}
                    {/*  >*/}
                    {/*    Teams*/}
                    {/*  </h3>*/}
                    {/*  <div*/}
                    {/*    className="mt-1 space-y-1"*/}
                    {/*    role="group"*/}
                    {/*    aria-labelledby="mobile-teams-headline"*/}
                    {/*  >*/}
                    {/*    {tags.map((team) => (*/}
                    {/*      <a*/}
                    {/*        key={team.name}*/}
                    {/*        href={team.href}*/}
                    {/*        className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"*/}
                    {/*      >*/}
                    {/*        <span*/}
                    {/*          className={clsx(*/}
                    {/*            team.bgColorClass,*/}
                    {/*            'w-2.5 h-2.5 mr-4 rounded-full'*/}
                    {/*          )}*/}
                    {/*          aria-hidden="true"*/}
                    {/*        />*/}
                    {/*        <span className="truncate">{team.name}</span>*/}
                    {/*      </a>*/}
                    {/*    ))}*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
          <div className="flex flex-shrink-0 items-center px-6">
            <img
              className="mr-2 h-8 w-auto"
              src={Logo}
              alt="forminotion-logo"
            />
            <span className="text-2xl font-bold">Forminotion</span>
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="relative inline-block px-3 text-left">
              <div>
                <Menu.Button className="group w-full rounded-md px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <span className="flex w-full items-center justify-between">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300"
                        src={_.get(user, 'picture')}
                        alt="Profile picture"
                      />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-gray-900">
                          {_.get(user, 'nickname')}
                        </span>
                        {/*<span className="text-gray-500 text-sm truncate">*/}
                        {/*  @jessyschwarz*/}
                        {/*</span>*/}
                      </span>
                    </span>
                    <SelectorIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
              </div>
              <UserMenu />
            </Menu>
            {/* Sidebar Search */}
            {/*<div className="px-3 mt-5">*/}
            {/*  <label htmlFor="search" className="sr-only">*/}
            {/*    Search*/}
            {/*  </label>*/}
            {/*  <div className="mt-1 relative rounded-md shadow-sm">*/}
            {/*    <div*/}
            {/*      className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"*/}
            {/*      aria-hidden="true"*/}
            {/*    >*/}
            {/*      <SearchIcon*/}
            {/*        className="mr-3 h-4 w-4 text-gray-400"*/}
            {/*        aria-hidden="true"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <input*/}
            {/*      type="text"*/}
            {/*      name="search"*/}
            {/*      id="search"*/}
            {/*      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"*/}
            {/*      placeholder="Search"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <span className="mx-3 my-2 h-px bg-gray-200" />
            {/* Navigation */}
            <nav className="px-3">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(_.get(item, 'path'))}
                    className={clsx(
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                      item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={clsx(
                        'mr-3 h-6 w-6 flex-shrink-0',
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </button>
                ))}
              </div>
              {/*<div className="mt-8">*/}
              {/*  /!* Secondary navigation *!/*/}
              {/*  <h3*/}
              {/*    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"*/}
              {/*    id="desktop-teams-headline"*/}
              {/*  >*/}
              {/*    Teams*/}
              {/*  </h3>*/}
              {/*  <div*/}
              {/*    className="mt-1 space-y-1"*/}
              {/*    role="group"*/}
              {/*    aria-labelledby="desktop-teams-headline"*/}
              {/*  >*/}
              {/*    {tags.map((team) => (*/}
              {/*      <a*/}
              {/*        key={team.name}*/}
              {/*        href={team.href}*/}
              {/*        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"*/}
              {/*      >*/}
              {/*        <span*/}
              {/*          className={clsx(*/}
              {/*            team.bgColorClass,*/}
              {/*            'w-2.5 h-2.5 mr-4 rounded-full'*/}
              {/*          )}*/}
              {/*          aria-hidden="true"*/}
              {/*        />*/}
              {/*        <span className="truncate">{team.name}</span>*/}
              {/*      </a>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</div>*/}
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="flex h-full flex-col overflow-hidden lg:pl-64">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/*Search bar*/}
            <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
              {/*<div className="flex-1 flex">*/}
              {/*  <form className="w-full flex md:ml-0" action="#" method="GET">*/}
              {/*    <label htmlFor="search-field" className="sr-only">*/}
              {/*      Search*/}
              {/*    </label>*/}
              {/*    <div className="relative w-full text-gray-400 focus-within:text-gray-600">*/}
              {/*      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">*/}
              {/*        <SearchIcon className="h-5 w-5" aria-hidden="true" />*/}
              {/*      </div>*/}
              {/*      <input*/}
              {/*        id="search-field"*/}
              {/*        name="search-field"*/}
              {/*        className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"*/}
              {/*        placeholder="Search"*/}
              {/*        type="search"*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </form>*/}
              {/*</div>*/}
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={_.get(user, 'picture')}
                        alt="Profile picture"
                      />
                    </Menu.Button>
                  </div>
                  <UserMenu />
                </Menu>
              </div>
            </div>
          </div>
          {children}

          {/*<main className="flex-1">*/}
          {/*  /!* Page title & actions *!/*/}
          {/*  <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">*/}
          {/*    <div className="flex-1 min-w-0">*/}
          {/*      <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">*/}
          {/*        Home*/}
          {/*      </h1>*/}
          {/*    </div>*/}
          {/*    <div className="mt-4 flex sm:mt-0 sm:ml-4">*/}
          {/*      <button*/}
          {/*        type="button"*/}
          {/*        className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"*/}
          {/*      >*/}
          {/*        Share*/}
          {/*      </button>*/}
          {/*      <button*/}
          {/*        type="button"*/}
          {/*        className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"*/}
          {/*      >*/}
          {/*        Create*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!* Pinned projects *!/*/}
          {/*  <div className="px-4 mt-6 sm:px-6 lg:px-8">*/}
          {/*    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">*/}
          {/*      Pinned Projects*/}
          {/*    </h2>*/}
          {/*    <ul*/}
          {/*      role="list"*/}
          {/*      className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3"*/}
          {/*    >*/}
          {/*      {pinnedProjects.map((project) => (*/}
          {/*        <li*/}
          {/*          key={project.id}*/}
          {/*          className="relative col-span-1 flex shadow-sm rounded-md"*/}
          {/*        >*/}
          {/*          <div*/}
          {/*            className={classNames(*/}
          {/*              project.bgColorClass,*/}
          {/*              'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'*/}
          {/*            )}*/}
          {/*          >*/}
          {/*            {project.initials}*/}
          {/*          </div>*/}
          {/*          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">*/}
          {/*            <div className="flex-1 px-4 py-2 text-sm truncate">*/}
          {/*              <a*/}
          {/*                href="#"*/}
          {/*                className="text-gray-900 font-medium hover:text-gray-600"*/}
          {/*              >*/}
          {/*                {project.title}*/}
          {/*              </a>*/}
          {/*              <p className="text-gray-500">*/}
          {/*                {project.totalMembers} Members*/}
          {/*              </p>*/}
          {/*            </div>*/}
          {/*            <Menu as="div" className="flex-shrink-0 pr-2">*/}
          {/*              <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">*/}
          {/*                <span className="sr-only">Open options</span>*/}
          {/*                <DotsVerticalIcon*/}
          {/*                  className="w-5 h-5"*/}
          {/*                  aria-hidden="true"*/}
          {/*                />*/}
          {/*              </Menu.Button>*/}
          {/*              <Transition*/}
          {/*                as={Fragment}*/}
          {/*                enter="transition ease-out duration-100"*/}
          {/*                enterFrom="transform opacity-0 scale-95"*/}
          {/*                enterTo="transform opacity-100 scale-100"*/}
          {/*                leave="transition ease-in duration-75"*/}
          {/*                leaveFrom="transform opacity-100 scale-100"*/}
          {/*                leaveTo="transform opacity-0 scale-95"*/}
          {/*              >*/}
          {/*                <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">*/}
          {/*                  <div className="py-1">*/}
          {/*                    <Menu.Item>*/}
          {/*                      {({ active }) => (*/}
          {/*                        <a*/}
          {/*                          href="#"*/}
          {/*                          className={classNames(*/}
          {/*                            active*/}
          {/*                              ? 'bg-gray-100 text-gray-900'*/}
          {/*                              : 'text-gray-700',*/}
          {/*                            'block px-4 py-2 text-sm'*/}
          {/*                          )}*/}
          {/*                        >*/}
          {/*                          View*/}
          {/*                        </a>*/}
          {/*                      )}*/}
          {/*                    </Menu.Item>*/}
          {/*                  </div>*/}
          {/*                  <div className="py-1">*/}
          {/*                    <Menu.Item>*/}
          {/*                      {({ active }) => (*/}
          {/*                        <a*/}
          {/*                          href="#"*/}
          {/*                          className={classNames(*/}
          {/*                            active*/}
          {/*                              ? 'bg-gray-100 text-gray-900'*/}
          {/*                              : 'text-gray-700',*/}
          {/*                            'block px-4 py-2 text-sm'*/}
          {/*                          )}*/}
          {/*                        >*/}
          {/*                          Removed from pinned*/}
          {/*                        </a>*/}
          {/*                      )}*/}
          {/*                    </Menu.Item>*/}
          {/*                    <Menu.Item>*/}
          {/*                      {({ active }) => (*/}
          {/*                        <a*/}
          {/*                          href="#"*/}
          {/*                          className={classNames(*/}
          {/*                            active*/}
          {/*                              ? 'bg-gray-100 text-gray-900'*/}
          {/*                              : 'text-gray-700',*/}
          {/*                            'block px-4 py-2 text-sm'*/}
          {/*                          )}*/}
          {/*                        >*/}
          {/*                          Share*/}
          {/*                        </a>*/}
          {/*                      )}*/}
          {/*                    </Menu.Item>*/}
          {/*                  </div>*/}
          {/*                </Menu.Items>*/}
          {/*              </Transition>*/}
          {/*            </Menu>*/}
          {/*          </div>*/}
          {/*        </li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}

          {/*  /!* Projects list (only on smallest breakpoint) *!/*/}
          {/*  <div className="mt-10 sm:hidden">*/}
          {/*    <div className="px-4 sm:px-6">*/}
          {/*      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">*/}
          {/*        Projects*/}
          {/*      </h2>*/}
          {/*    </div>*/}
          {/*    <ul*/}
          {/*      role="list"*/}
          {/*      className="mt-3 border-t border-gray-200 divide-y divide-gray-100"*/}
          {/*    >*/}
          {/*      {projects.map((project) => (*/}
          {/*        <li key={project.id}>*/}
          {/*          <a*/}
          {/*            href="#"*/}
          {/*            className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"*/}
          {/*          >*/}
          {/*            <span className="flex items-center truncate space-x-3">*/}
          {/*              <span*/}
          {/*                className={classNames(*/}
          {/*                  project.bgColorClass,*/}
          {/*                  'w-2.5 h-2.5 flex-shrink-0 rounded-full'*/}
          {/*                )}*/}
          {/*                aria-hidden="true"*/}
          {/*              />*/}
          {/*              <span className="font-medium truncate text-sm leading-6">*/}
          {/*                {project.title}{' '}*/}
          {/*                <span className="truncate font-normal text-gray-500">*/}
          {/*                  in {project.team}*/}
          {/*                </span>*/}
          {/*              </span>*/}
          {/*            </span>*/}
          {/*            <ChevronRightIcon*/}
          {/*              className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"*/}
          {/*              aria-hidden="true"*/}
          {/*            />*/}
          {/*          </a>*/}
          {/*        </li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}

          {/*  /!* Projects table (small breakpoint and up) *!/*/}
          {/*  <div className="hidden mt-8 sm:block">*/}
          {/*    <div className="align-middle inline-block min-w-full border-b border-gray-200">*/}
          {/*      <table className="min-w-full">*/}
          {/*        <thead>*/}
          {/*          <tr className="border-t border-gray-200">*/}
          {/*            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*              <span className="lg:pl-2">Project</span>*/}
          {/*            </th>*/}
          {/*            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*              Members*/}
          {/*            </th>*/}
          {/*            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*              Last updated*/}
          {/*            </th>*/}
          {/*            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />*/}
          {/*          </tr>*/}
          {/*        </thead>*/}
          {/*        <tbody className="bg-white divide-y divide-gray-100">*/}
          {/*          {projects.map((project) => (*/}
          {/*            <tr key={project.id}>*/}
          {/*              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">*/}
          {/*                <div className="flex items-center space-x-3 lg:pl-2">*/}
          {/*                  <div*/}
          {/*                    className={classNames(*/}
          {/*                      project.bgColorClass,*/}
          {/*                      'flex-shrink-0 w-2.5 h-2.5 rounded-full'*/}
          {/*                    )}*/}
          {/*                    aria-hidden="true"*/}
          {/*                  />*/}
          {/*                  <a*/}
          {/*                    href="#"*/}
          {/*                    className="truncate hover:text-gray-600"*/}
          {/*                  >*/}
          {/*                    <span>*/}
          {/*                      {project.title}{' '}*/}
          {/*                      <span className="text-gray-500 font-normal">*/}
          {/*                        in {project.team}*/}
          {/*                      </span>*/}
          {/*                    </span>*/}
          {/*                  </a>*/}
          {/*                </div>*/}
          {/*              </td>*/}
          {/*              <td className="px-6 py-3 text-sm text-gray-500 font-medium">*/}
          {/*                <div className="flex items-center space-x-2">*/}
          {/*                  <div className="flex flex-shrink-0 -space-x-1">*/}
          {/*                    {project.members.map((member) => (*/}
          {/*                      <img*/}
          {/*                        key={member.handle}*/}
          {/*                        className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"*/}
          {/*                        src={member.imageUrl}*/}
          {/*                        alt={member.name}*/}
          {/*                      />*/}
          {/*                    ))}*/}
          {/*                  </div>*/}
          {/*                  {project.totalMembers > project.members.length ? (*/}
          {/*                    <span className="flex-shrink-0 text-xs leading-5 font-medium">*/}
          {/*                      +{project.totalMembers - project.members.length}*/}
          {/*                    </span>*/}
          {/*                  ) : null}*/}
          {/*                </div>*/}
          {/*              </td>*/}
          {/*              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">*/}
          {/*                {project.lastUpdated}*/}
          {/*              </td>*/}
          {/*              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">*/}
          {/*                <a*/}
          {/*                  href="#"*/}
          {/*                  className="text-indigo-600 hover:text-indigo-900"*/}
          {/*                >*/}
          {/*                  Edit*/}
          {/*                </a>*/}
          {/*              </td>*/}
          {/*            </tr>*/}
          {/*          ))}*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</main>*/}
        </div>
      </div>
    </>
  )
}

AppBar.propTypes = {
  children: PropTypes.array
}

export default AppBar
