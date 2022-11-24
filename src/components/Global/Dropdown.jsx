import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react'
import Button from './Button';
import classNames from 'classnames';

export default function Dropdown({ trigger, label, children, onTrigger }) {
  return <Menu as="div" className="relative">
    <Menu.Button className="w-full flex items-center justify-center text-white">
      {trigger ? (
        trigger
      ) : (
        <button variant='ghost' className="w-full flex justify-between items-center px-4 py-3 rounded-md transition-all duration-200 font-medium bg-zinc-500/5 hover:bg-zinc-500/10">
          {label}
          <i className="fas fa-chevron-down text-black/50 dark:text-white/20" />
        </button>
      )}
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="min-w-[15rem] opacity-hidden-thumb bg-light dark:bg-dark max-h-[20rem] overflow-auto border border-slate-100 dark:border-zinc-900/20 absolute right-0 z-10 mt-2 w-full origin-top-right rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-2">
          {children}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>;
}

export function Text({ children }) {
  return <div className="text-xs font-extrabold uppercase text-slate-400 dark:text-gray-600 p-2">{children}</div>;
}

export function Item(props) {
  const { children, className, onClick, ...rest } = props;
  return <Menu.Item onClick={onClick}>
      {({ active }) => (
        <button className={classNames(`w-full flex items-center p-2 py-2.5 text-sm rounded-md ${active ? 'bg-zinc-500/5' : ''} transition-all duration-200`, className)} {...rest}>
          {children}
        </button>
      )}
    </Menu.Item>;
}