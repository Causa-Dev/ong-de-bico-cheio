import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { useObserver } from './useObserver'
import { idFactory } from '../../utils/idFactory'

const sections = ['Inciativas', 'Quem sou eu', 'Blog', 'Contato']

export const Header: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)
  const [hasShadow, setHasShadow] = useState<boolean>(false)
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0)
  const [indicatorLeft, setIndicatorLeft] = useState<number>(0)
  const [screenWidth, setScreenWidth] = useState<number>(0)

  const resizeTimeoutRef = useRef<number | null>(null)
  const scrollTimeoutRef = useRef<number | null>(null)
  const ulRef = useRef<HTMLUListElement | null>(null)

  const sectionsWithHash = sections?.map(
    (section: string) => `#${idFactory(section)}`
  )
  const { activeId } = useObserver(sectionsWithHash.join(', '))

  useEffect(() => {
    setScreenWidth(window.innerWidth)

    function checkScroll () {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        if (window.scrollY > 0) {
          setHasShadow(true)
        } else {
          setHasShadow(false)
        }
      }, 100)
    }

    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  useEffect(() => {
    const currentActiveLink = sections.find(
      (section: string) => idFactory(section) === activeId
    )

    if (!(currentActiveLink && ulRef.current)) {
      return
    }

    ulRef.current.childNodes.forEach((liElement) => {
      if (!(liElement instanceof HTMLLIElement)) {
        return
      }

      if (liElement.dataset.id === idFactory(currentActiveLink)) {
        setIndicatorLeft(liElement.offsetLeft)
        setIndicatorWidth(liElement.clientWidth)
      }
    })
  }, [activeId])

  useEffect(() => {
    function handleResize () {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        setScreenWidth(window.innerWidth)

        const currentActiveLink = sections.find(
          (section: string) => idFactory(section) === activeId
        )

        if (!(currentActiveLink && ulRef.current)) {
          return
        }

        ulRef.current.childNodes.forEach((liElement) => {
          if (!(liElement instanceof HTMLLIElement)) {
            return
          }

          if (liElement.dataset.id === idFactory(currentActiveLink)) {
            setIndicatorLeft(liElement.offsetLeft)
            setIndicatorWidth(liElement.clientWidth)
          }
        })
      }, 500)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeId])

  return (
    <>
      <header
        className={`hd-header ${hasShadow ? 'hd-hasShadow' : ''}`}
      >
        <div className='hd-headerContainer'>
          <a className='hd-logo' href="/">
            <img
              className='hd-logo'
              src='/assets/images/debicocheiologo.png'
              alt='debicocheiologo'
            />
          </a>
          <nav
            id="menu"
            className={`hd-navbar ${isMenuOpened ? 'hd-open' : ''}`}
          >
            <ul ref={ulRef} className="big-text">
              {sections.map((section: string) => {
                return (
                  <li
                    key={idFactory(section)}
                    data-id={idFactory(section)}
                    className={
                      idFactory(section) === activeId ? 'hd-activeLink' : ''
                    }
                  >
                    <a
                      href={`#${idFactory(section)}`}
                      onClick={() => {
                        setIsMenuOpened(false)
                        document.body.classList.toggle('overflow_y_hidden')
                      }}
                      tabIndex={screenWidth >= 1280 || isMenuOpened ? 0 : -1}
                    >
                      <span>{section}</span>
                    </a>
                  </li>
                )
              })}

              <div
                className='hd-indicator'
                style={{
                  width: `${indicatorWidth}px`,
                  left: `${indicatorLeft}px`
                }}
              ></div>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
