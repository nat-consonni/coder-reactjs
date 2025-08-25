import React, { useEffect } from 'react';
import { Tooltip } from 'bootstrap';

export default function Footer() {
  useEffect(() => {
    // Activa tooltips de Bootstrap
    const els = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const instances = Array.from(els).map(el => new Tooltip(el));
    return () => instances.forEach(i => i.dispose());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    // TODO: conectar con backend/newsletter
    form.reset();
  };

  return (
    <footer className="footer bg-dark pb-4 py-lg-5 mt-5" data-bs-theme="dark">
      <div className="container pt-5 pt-lg-4 mt-sm-2 mt-md-3">
        <div className="row pb-5">
          <div className="col-12">
            <div className="text-center px-sm-4 mx-auto" style={{ maxWidth: 568 }}>
              <h3 className="text-inverse pb-1 mb-2">¡Recibí nuestras novedades!</h3>
              <p className="fs-sm text-body pb-2 pb-sm-3">
                Promos y lanzamientos directo a tu email
              </p>

              <form
                className="needs-validation position-relative"
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="email"
                  className="form-control form-control-lg rounded-pill text-start"
                  placeholder="Tu email"
                  aria-label="Tu email"
                  required
                />
                <div className="invalid-feedback text-start ps-2">
                  Ingresá un email válido.
                </div>

                <button
                  type="submit"
                  className="btn btn-icon fs-xl btn-light rounded-circle position-absolute top-0 end-0 mt-1 me-1"
                  aria-label="Suscribirme"
                  data-bs-theme="light"
                >
                  <i className="bi bi-arrow-up-right" />
                </button>
              </form>

              <div className="d-flex justify-content-center gap-2 pt-4 pt-md-5 mt-1 mt-md-0">
                <a
                  className="btn btn-icon fs-base btn-outline-secondary border-0"
                  href="#!"
                  data-bs-toggle="tooltip"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <i className="bi bi-youtube" />
                </a>
                <a
                  className="btn btn-icon fs-base btn-outline-secondary border-0"
                  href="#!"
                  data-bs-toggle="tooltip"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <i className="bi bi-facebook" />
                </a>
                <a
                  className="btn btn-icon fs-base btn-outline-secondary border-0"
                  href="#!"
                  data-bs-toggle="tooltip"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <i className="bi bi-instagram" />
                </a>
                <a
                  className="btn btn-icon fs-base btn-outline-secondary border-0"
                  href="#!"
                  data-bs-toggle="tooltip"
                  aria-label="Telegram"
                  title="Telegram"
                >
                  <i className="bi bi-telegram" />
                </a>
                <a
                  className="btn btn-icon fs-base btn-outline-secondary border-0"
                  href="#!"
                  data-bs-toggle="tooltip"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <i className="bi bi-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="fs-xs text-body text-center pt-lg-4 mt-n2 mt-md-0 mb-0">
          © {new Date().getFullYear()} Divino. Hecho por{' '}
          <a
            className="text-white text-decoration-none"
            href="https://nat-consonni.com"
            target="_blank"
            rel="noreferrer"
          >
            Natalia Consonni
          </a>
        </p>
      </div>
    </footer>
  );
}
