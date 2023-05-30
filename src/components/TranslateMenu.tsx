import { MdOutlineTranslate } from 'react-icons/md'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

export function TranslateMenu() {
  const { lang } = useTranslation('home')
  const [isTranslateMenuOpen, setIsTranslateMenuOpen] = useState<boolean>(false)

  const handleCloseTranslateMenu = () => setIsTranslateMenuOpen(false)
  const toggleTranslateMenu = () => setIsTranslateMenuOpen((state) => !state)

  const handleChangeLanguage = (langParam: string) => {
    setLanguage(langParam)
    localStorage.setItem('@icaroxavier/receita-inteligente:lang', langParam)
    handleCloseTranslateMenu()
  }

  useEffect(() => {
    const localStorageLang = localStorage.getItem(
      '@icaroxavier/receita-inteligente:lang',
    )
    if (localStorageLang === 'en') {
      setLanguage('en')
    }
    if (localStorageLang === 'pt') {
      setLanguage('pt')
    }
  }, [])

  return (
    <>
      <MdOutlineTranslate
        size={42}
        onClick={toggleTranslateMenu}
        className="fixed right-2 top-2 z-30 cursor-pointer rounded-full bg-blue-500 p-2 text-zinc-50 transition-all hover:scale-110 md:right-8 md:top-4"
      />
      <div
        className={`shadow-lgg fixed right-4 top-16 z-30 bg-white md:right-8 md:top-20 ${
          isTranslateMenuOpen ? 'scale-100' : 'scale-0'
        } flex flex-col gap-2 rounded-md p-2 transition-all`}
      >
        <button
          onClick={() => lang !== 'en' && handleChangeLanguage('en')}
          className={`${
            lang === 'en' ? 'bg-blue-700' : 'bg-zinc-400'
          } rounded-md p-2 text-zinc-100 transition-all hover:scale-105 hover:bg-blue-600`}
        >
          English
        </button>
        <button
          onClick={() => lang !== 'pt' && handleChangeLanguage('pt')}
          className={`${
            lang === 'pt' ? 'bg-blue-700' : 'bg-zinc-400'
          } rounded-md p-2 text-zinc-100 transition-all hover:scale-105 hover:bg-blue-600`}
        >
          Português
        </button>
      </div>
      {isTranslateMenuOpen && (
        <div
          className="fixed z-20 h-screen w-screen"
          onClick={handleCloseTranslateMenu}
        />
      )}
    </>
  )
}
