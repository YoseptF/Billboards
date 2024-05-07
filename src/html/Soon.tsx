"use client";

import "./plugins.css";
import "./main.css";

import { FC } from "react";
import Image from "next/image";
import Script from "next/script";

const Soon: FC = () => {
  console.debug("Soonss");
  return (
    <>
      <div className="preloader">
        <div className="spinner">
          <div className="bounce-1"></div>
          <div className="bounce-2"></div>
          <div className="bounce-3"></div>

        </div>

      </div>


      <div className="hero">


        <div className="front-content">


          <div className="container-mid">


            <div className="animation-container animation-fade-down" data-animation-delay="0">

              <Image className="img-responsive logo" src="images/logo.png" alt="image" width={250} height={250}/>

            </div>


            <div className="animation-container animation-fade-right" data-animation-delay="300">

              <h1>Pronto Estaremos Aquí...</h1>

            </div>


            <div className="animation-container animation-fade-left" data-animation-delay="600">

              <p className="subline">Estamos trabajando en traerte una mejor experiencia. Únete a nuestro boletín y recibe notificaciones.</p>

            </div>


            <div className="animation-container animation-fade-up" data-animation-delay="900">

              <div className="open-popup">Avísame!</div>

            </div>


          </div>


          <div className="footer">


          </div>


        </div>


        <div className="background-content parallax-on">

          <div className="background-overlay"></div>
          <div className="background-img layer" data-depth="0.05"></div>

        </div>


      </div>


      <div className="popup">


        <div className="card">


          <div className="close-popup close-button"></div>

          <i className="fa fa-envelope-o" aria-hidden="true"></i>
          <h3>Regístrate</h3>
          <p className="subline">¡Suscríbete a nuestro boletín y obtén acceso exclusivo al lanzamiento del sitio web!</p>

          <form action="https://usebasin.com/f/efeea68e2eb0" method="post" className="subscribe-form">


            <input
              type="text"
              name="email"
              placeholder="* Ingresa tu email"
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = "* Ingresa tu email"}
              className="email form-control"
            />
            <button type="submit" className="btn btn-primary form-control">Suscribirse<i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>

            <div className="error-message">¡Ingrese una dirección de correo electrónico válida!</div>
            <div className="success-message">¡Suscrito con éxito!</div>


          </form>


        </div>
      </div>
    </>
  );
};

export default Soon;