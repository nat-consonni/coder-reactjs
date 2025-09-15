import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { getProducts } from '../services/productsApi';

const formatUYU = (value) =>
  new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(value);


const isFeatured = (v) => v === true || v === 'true' || v === 'ture';

export default function HeroCarousel({
  categoryId,
  limit = 4,
  featuredOnly = true,
}) {
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]); // productos crudos desde Firestore

  const [mainSwiper, setMainSwiper] = useState(null);
  const [prevSwiper, setPrevSwiper] = useState(null);
  const [nextSwiper, setNextSwiper] = useState(null);
  const [capSwiper,  setCapSwiper]  = useState(null);

  // Traer productos desde Firestore
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts(categoryId)
      .then((data) => {
        if (cancelled) return;
        let base = Array.isArray(data) ? data : [];
        let filtered = featuredOnly ? base.filter(p => isFeatured(p.destacado)) : base;
        if (featuredOnly && filtered.length === 0) filtered = base; // fallback si no hay destacados
        setRows(filtered.slice(0, limit));
      })
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [categoryId, featuredOnly, limit]);

  // Datos normalizados para el carrusel
  const items = useMemo(() => {
    return rows.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.description || '',
      price: formatUYU(p.price ?? 0),
      image: p.img,
      thumb: p.img,
    }));
  }, [rows]);

  const coverflow = useMemo(() => ({
    rotate: 0, scale: 1.3, depth: -200, stretch: -100, slideShadows: false
  }), []);

  // Sincronizar previews (prev / next)
  const syncPreviews = useCallback((idx) => {
    if (!prevSwiper || !nextSwiper || !items.length) return;
    const n = items.length;
    const prevIndex = (idx - 1 + n) % n;
    const nextIndex = (idx + 1) % n;
    prevSwiper.slideToLoop(prevIndex, 0, false);
    nextSwiper.slideToLoop(nextIndex, 0, false);
  }, [prevSwiper, nextSwiper, items.length]);

  // Wire de navegación (prev / next) y controller con captions
  useEffect(() => {
    if (!mainSwiper) return;

    if (prevBtnRef.current && nextBtnRef.current) {
      mainSwiper.params.navigation.prevEl = prevBtnRef.current;
      mainSwiper.params.navigation.nextEl = nextBtnRef.current;
      mainSwiper.navigation.init();
      mainSwiper.navigation.update();
    }

    if (capSwiper) {
      capSwiper.controller.control = mainSwiper;
      mainSwiper.controller.control = capSwiper;
    }

    const init = () => syncPreviews(mainSwiper.realIndex ?? 0);
    init();
    const onChange = () => syncPreviews(mainSwiper.realIndex);
    mainSwiper.on('slideChange', onChange);
    return () => mainSwiper.off('slideChange', onChange);
  }, [mainSwiper, capSwiper, syncPreviews]);

  // Re-sync si cambian sliders laterales
  useEffect(() => {
    if (mainSwiper) syncPreviews(mainSwiper.realIndex ?? 0);
  }, [prevSwiper, nextSwiper, mainSwiper, syncPreviews]);

  if (loading) {
    return (
      <section className="bg-body-tertiary d-flex align-items-center" style={{ minHeight: 380 }}>
        <div className="container py-5 text-center">
          <div className="placeholder-glow">
            <span className="placeholder col-6"></span>
            <div className="mt-3 placeholder col-8"></div>
            <div className="mt-2 placeholder col-5"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="bg-body-tertiary min-vh-100 d-flex align-items-center overflow-hidden"
             style={{ marginTop: -110, paddingTop: 110 }}>
      <div className="container h-100 py-5 my-md-2 my-lg-3 my-xl-4 mb-xxl-5">
        <h1 className="display-4 text-center mx-auto mb-5">
          Destacados de esta semana
        </h1>

        <div className="row align-items-center justify-content-center gx-3 gx-sm-4 mb-3 mb-sm-4">
          {/* Preview anterior */}
          <div className="col-lg-1 col-xl-2 d-none d-lg-flex justify-content-end">
            <div className="position-relative user-select-none" style={{ width: 120 }}>
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50 rounded-circle d-none-dark"></div>
              <Swiper
                onSwiper={setPrevSwiper}
                modules={[EffectCoverflow]}
                className="position-relative z-2 opacity-60 rounded-circle pe-none"
                allowTouchMove={false}
                loop
                effect="coverflow"
                coverflowEffect={coverflow}
              >
                {items.map((it, i) => (
                  <SwiperSlide key={`prev-${i}`}>
                    <div className="ratio ratio-1x1">
                      <img src={it.thumb} alt={it.title} className="w-100 h-100 object-fit-contain rounded-circle" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Botón prev */}
          <div className="col-auto col-sm-1 order-1 order-lg-2 d-flex align-items-center justify-content-center">
            <button ref={prevBtnRef} type="button"
                    className="btn btn-lg btn-dark rounded-circle"
                    aria-label="Previous slide">
              <i className="bi bi-chevron-left" />
            </button>
          </div>

          {/* Slider principal */}
          <div className="col-sm-10 col-lg-8 col-xl-6 order-3">
            <Swiper
              onSwiper={setMainSwiper}
              modules={[EffectCoverflow, Navigation, Controller]}
              className="user-select-none rounded-pill"
              loop
              grabCursor
              speed={600}
              effect="coverflow"
              coverflowEffect={coverflow}
            >
              {items.map((it, i) => (
                <SwiperSlide key={`main-${i}`}>
                  <div className="rounded-pill ratio" style={{ '--bs-aspect-ratio': 'calc(400 / 636 * 100%)' }}>
                    <img src={it.image} alt={it.title} className="w-100 h-100 object-fit-contain" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Botón next */}
          <div className="col-auto col-sm-1 order-2 order-sm-3 order-lg-4 d-flex align-items-center justify-content-center">
            <button ref={nextBtnRef} type="button"
                    className="btn btn-lg btn-dark rounded-circle"
                    aria-label="Next slide">
              <i className="bi bi-chevron-right" />
            </button>
          </div>

          {/* Preview siguiente */}
          <div className="col-lg-1 col-xl-2 order-lg-5 d-none d-lg-block">
            <div className="position-relative user-select-none" style={{ width: 120 }}>
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50 rounded-circle d-none-dark"></div>
              <Swiper
                onSwiper={setNextSwiper}
                modules={[EffectCoverflow]}
                className="position-relative z-2 opacity-60 rounded-circle pe-none"
                allowTouchMove={false}
                loop
                effect="coverflow"
                coverflowEffect={coverflow}
              >
                {items.map((it, i) => (
                  <SwiperSlide key={`next-${i}`}>
                    <div className="ratio ratio-1x1">
                      <img src={it.thumb} alt={it.title} className="w-100 h-100 object-fit-contain rounded-circle" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Captions sincronizados */}
        <Swiper onSwiper={setCapSwiper} modules={[Controller]} allowTouchMove={false} loop>
          {items.map((it, i) => (
            <SwiperSlide key={`cap-${i}`}>
              <div className="text-center bg-body-tertiary py-3">
                <h3 className="text-secondary-emphasis fs-base fw-normal mb-1">{it.title}</h3>
                {it.subtitle && <p className="mb-2">{it.subtitle}</p>}
                <p className="h4 mb-4">{it.price}</p>
                <Link className="btn btn-sm btn-primary rounded-pill" to={`/item/${items[i].id}`}>
                  Comprar <i className="bi bi-chevron-right ms-2" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
