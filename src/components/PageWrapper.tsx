'use client'

import { ToastContainer } from 'react-toastify'
import {
  FaGithubSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaUtensils,
  FaWhatsappSquare,
} from 'react-icons/fa'
import { TranslateMenu } from '@/components/TranslateMenu'
import Head from 'next/head'
import { ReactNode } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface PageWrapperProps {
  children?: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Head>
      <header className="text-bold fixed left-0 top-0 flex h-16 w-full items-center gap-4 bg-rose-400 px-4 text-2xl text-zinc-50 shadow">
        <Link
          className="flex cursor-pointer items-center gap-4 rounded px-1 py-2"
          href={'/'}
        >
          <FaUtensils />{' '}
          <span className="hidden sm:block">{t('app.title')}</span>
        </Link>
        <nav className="flex items-center sm:ml-auto sm:mr-4 sm:gap-4">
          <Link
            href={'/'}
            className="text-md rounded px-2 py-1 underline transition-all"
          >
            {t('home')}
          </Link>
          <Link
            href={'/history'}
            className="text-md rounded px-2 py-1 underline transition-all"
          >
            {t('history')}
          </Link>
        </nav>
        <TranslateMenu />
      </header>
      <main className="mt-16 flex w-full  flex-1 flex-col bg-zinc-100 px-4 pt-4">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
          {children}
        </div>
      </main>
      <footer className="mt-auto flex flex-col items-center justify-center gap-2 bg-zinc-100 pb-2 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/icaroxavier/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            <FaLinkedin
              className="cursor-pointer text-zinc-500 transition-all hover:scale-110"
              size={32}
              onClick={() => push('')}
            />
          </a>
          <a
            href="https://github.com/icaroxavier"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubSquare
              className="cursor-pointer text-zinc-500 transition-all hover:scale-110"
              size={32}
              onClick={() => push('')}
            />
          </a>
          <a
            href="https://twitter.com/icaroxavierdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitterSquare
              className="cursor-pointer text-zinc-500 transition-all hover:scale-110"
              size={32}
              onClick={() => push('', {})}
            />
          </a>
          <a
            href="https://wa.me/5585998164001?text=Oi,%20tudo%20bem?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsappSquare
              size={32}
              className="cursor-pointer text-zinc-500 transition-all hover:scale-110"
            />
          </a>
        </div>
        <span>
          © {new Date().getFullYear()}{' '}
          <a
            href="https://icaroxavier.vercel.app"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Ícaro Xavier
          </a>{' '}
          {t('copyright')}
        </span>
      </footer>
      <ToastContainer />
    </div>
  )
}
