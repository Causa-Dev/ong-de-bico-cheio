import React from 'react'
import './style.css'
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa6'
import { Button } from '../Button'

export const SessionBegin: React.FC = () => {
  return (
    <section id="inicio" className='sb-begin container'>
      <div className='sb-layout_begin'>
        <div className='sb-text'>
          <p className='title--small'>Uma refeição por vez</p>
          <h1 className="title--big">Ajudamos aves de vida livre</h1>
          <p className='big-text'>Promovendo acolhimento, cuidado e carinho.</p>

          <Button buttonClass='button-solid'>
            <a href="#sobre" className='button--link'>Contribua</a>
          </Button>
        </div>

        <div className='sb-image-layout'>
          <div>
            <img
              src='assets/images/plinio1.png'
              alt='Imagem de ave'
              className='sb-image'
            />

            <div className='sb-social-button-container'>
              <div>
                <FaFacebookF />
              </div>

              <div>
                <FaTwitter />
              </div>

              <div>
                <FaInstagram />
              </div>
            </div>
          </div>

          <div>
            <img
              src='assets/images/texture1.png'
              alt='Textura de ave'
              className='sb-small-image'
            />
            <img
              src='assets/images/plinio2.png'
              alt='Imagem de ave'
              className='sb-image'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
