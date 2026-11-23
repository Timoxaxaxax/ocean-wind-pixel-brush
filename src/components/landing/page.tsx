import { useEffect, useState, type ReactNode } from "react";
import { faq, kit, photos, site, specs, type Photo } from "@/lib/site";
import { jsonLd } from "@/lib/seo";

const nav = [
  { href: "#model", label: "Модель" },
  { href: "#foto", label: "Фото" },
  { href: "#harakteristiki", label: "Характеристики" },
  { href: "#voprosy", label: "Вопросы" },
];

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + "\u00a0₽";
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0">
      <path
        fill="currentColor"
        d="M9.04 15.3 8.9 19.2c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.3.2 1.5-.7l2.7-12.7c.2-1-.4-1.4-1.1-1.2L3.3 10.1c-1 .4-1 1-.2 1.2l4.6 1.4 10.6-6.7c.5-.3 1-.1.6.2L9.04 15.3Z"
      />
    </svg>
  );
}

function TelegramLink({
  children,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const tone =
    variant === "solid"
      ? "bg-brass text-bg hover:bg-brass/90"
      : "border border-fg/15 text-fg hover:border-brass hover:text-brass";
  return (
    <a
      href={site.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-semibold transition-colors duration-200 ${tone} ${className}`}
    >
      <TelegramIcon />
      {children}
    </a>
  );
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="text-xs font-semibold tracking-widest text-brass uppercase">
      {index}
      <span className="px-2 text-fg/30">/</span>
      {children}
    </p>
  );
}

export function HomePage({ origin }: { origin: string }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => (value == null ? value : (value + 1) % photos.length));
      if (event.key === "ArrowLeft") {
        setActive((value) => (value == null ? value : (value - 1 + photos.length) % photos.length));
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <div className="bg-bg text-fg">
      <a
        href="#model"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-brass focus:px-3 focus:py-2 focus:text-bg"
      >
        К содержимому
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(origin) }} />

      <header className="sticky top-0 z-30 border-b border-fg/10 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="group block">
            <span className="font-display block text-sm font-semibold tracking-widest">БУЛЬДОГ</span>
            <span className="text-xs tracking-widest text-brass">KURS</span>
          </a>
          <nav aria-label="Разделы страницы" className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </a>
            ))}
          </nav>
          <TelegramLink className="px-4">В канал</TelegramLink>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold tracking-widest text-brass uppercase">КСОИ · не оружие · 18+</p>
            <h1 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance md:text-5xl">
              Револьвер «Бульдог» KURS
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
              Заводской револьвер на монтажном патроне и резиновом шаре. По сертификату производителя это не
              оружие: лицензия и постановка на учёт не требуются. Заказ, цена и отправка — только в Telegram.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TelegramLink>Написать в Telegram</TelegramLink>
              <a href="#harakteristiki" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-fg">
                Смотреть характеристики
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              Канал{" "}
              <a href={site.telegram} className="text-brass underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                {site.telegramLabel}
              </a>
            </p>
          </div>
          <figure className="md:col-span-7">
            <div className="overflow-hidden border border-fg/10 bg-surface">
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                width={photos[0].width}
                height={photos[0].height}
                fetchPriority="high"
                decoding="async"
                className="aspect-3/2 w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs tracking-wide text-muted uppercase">
              <span>Чёрное исполнение</span>
              <span>740 г · 6 зарядов</span>
            </figcaption>
          </figure>
        </section>

        <section aria-label="Коротко о модели" className="border-y border-fg/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {[
              ["740 г", "масса"],
              ["183 мм", "длина"],
              ["6", "гнёзд барабана"],
              ["10 мм", "резиновый шар"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`border-fg/10 px-5 py-6 ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index > 0 ? "md:border-l" : ""}`}
              >
                <dt className="font-display text-2xl font-semibold md:text-3xl">{value}</dt>
                <dd className="mt-1 text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="model" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel index="01">Модель</SectionLabel>
              <h2 className="font-display mt-4 text-3xl leading-tight font-semibold text-balance">
                Купить револьвер Бульдог KURS
              </h2>
            </div>
            <div className="max-w-prose space-y-5 text-base leading-relaxed text-muted md:col-span-8">
              <p>
                «Бульдог» делают в России на заводе KURS. Ствол и барабан стальные, рамка и кожух — из сплава
                ZAMAK 5, поэтому при длине 183 мм револьвер весит 740 граммов. Барабан на шесть гнёзд: в каждое
                ставятся монтажный патрон 5,6/16 и резиновый шар 10 мм.
              </p>
              <p>
                Энергию выстрелу даёт не оружейный патрон, а строительно-монтажный — тот же принцип, что у
                монтажных пистолетов. Конструкция не принимает патроны гражданского и служебного оружия. Удельная
                кинетическая энергия шара, по опубликованным данным сертификата, остаётся ниже порога 0,5 Дж/мм².
                Поэтому модель сертифицирована как КСОИ: конструктивно сходное с оружием изделие.
              </p>
              <p>
                Совершеннолетний покупатель не оформляет лицензию Росгвардии и не регистрирует револьвер в ОЛРР.
                Отдельный сейф по правилам хранения оружия для КСОИ не предписан. Это сведения производителя: перед
                сделкой их подтверждают сертификатом из комплекта.
              </p>
              <p>
                Модель берут для спортивной стрельбы по мишеням, отработки хвата и куркового УСМ двойного действия,
                а также в коллекцию легальных изделий. «Бульдог» не заменяет травматическое или огнестрельное оружие
                и не предназначен для противоправного применения.
              </p>
              <p className="text-fg">
                Характеристики ниже — по открытым данным производителя. Паспорт конкретной партии и актуальную цену
                присылаем в канале.
              </p>
            </div>
          </div>
        </section>

        <section id="foto" className="border-t border-fg/10 bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <SectionLabel index="02">Фото</SectionLabel>
            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold">Фотографии модели</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Кадры передают характер «Бульдога». Внешний вид конкретной партии перед отправкой сверяйте в канале.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {photos.map((photo, index) => (
                <li key={photo.src}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="group block w-full text-left"
                  >
                    <span className="block overflow-hidden border border-fg/10 bg-bg">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="aspect-square w-full object-cover transition-opacity duration-200 group-hover:opacity-90 sm:aspect-4/3"
                      />
                    </span>
                    <span className="mt-2 block text-xs tracking-widest text-muted uppercase">{photo.caption}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="harakteristiki" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionLabel index="03">Паспорт</SectionLabel>
          <h2 className="font-display mt-4 max-w-xl text-3xl leading-tight font-semibold">
            Характеристики револьвера Бульдог
          </h2>
          <dl className="mt-8 border-t border-fg/10">
            {specs.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-fg/10 py-4 sm:grid-cols-12 sm:gap-6">
                <dt className="text-sm text-muted sm:col-span-4">{row.label}</dt>
                <dd className="text-fg sm:col-span-8">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="komplekt" className="border-t border-fg/10">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <SectionLabel index="04">Коробка</SectionLabel>
              <h2 className="font-display mt-4 text-3xl leading-tight font-semibold">Что обычно в комплекте</h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                Состав партии подтверждаем в Telegram до оплаты. Ниже — типичная заводская укладка, а не обещание
                каждой коробки один в один.
              </p>
              <ol className="mt-8 space-y-3">
                {kit.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-fg/10 pb-3">
                    <span className="font-display w-8 text-sm text-brass">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <SectionLabel index="05">Заказ</SectionLabel>
              <h2 className="font-display mt-4 text-3xl leading-tight font-semibold">Доставка и оплата</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Корзины на сайте нет. Так цена и наличие не отстают от склада: всё актуальное — в канале.
              </p>
              <ul className="mt-8 space-y-6">
                <li>
                  <p className="font-display text-lg font-semibold">
                    {site.priceRub == null ? "Цена по запросу" : formatPrice(site.priceRub)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {site.priceRub == null
                      ? "Цифру называем в Telegram по текущей партии."
                      : "Актуальную цену дублируем в Telegram перед оплатой."}
                  </p>
                </li>
                <li>
                  <p className="font-display text-lg font-semibold">Оплата</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">Способ согласуем в переписке. Предоплаты «в никуда» не просим.</p>
                </li>
                <li>
                  <p className="font-display text-lg font-semibold">Доставка по России</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Службу, срок и стоимость отправки пишем в канале. Если есть самовывоз, тоже скажем там.
                  </p>
                </li>
                <li>
                  <p className="font-display text-lg font-semibold">Гарантия</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">Заводская, срок указан в паспорте изделия.</p>
                </li>
              </ul>
              <div className="mt-8">
                <TelegramLink>Уточнить наличие</TelegramLink>
              </div>
            </div>
          </div>
        </section>

        <section id="voprosy" className="border-t border-fg/10 bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <SectionLabel index="06">FAQ</SectionLabel>
            <h2 className="font-display mt-4 max-w-xl text-3xl leading-tight font-semibold">
              Вопросы о Бульдоге KURS
            </h2>
            <div className="faq mt-8 border-t border-fg/10">
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-fg/10">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-4 text-left">
                    <span className="font-medium">{item.q}</span>
                    <span aria-hidden="true" className="font-display text-brass transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="zakaz" className="border-t border-fg/10">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
                Напишите в канал — ответим по цене и отправке
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Других контактов нет. Не звоним и не просим паспорт в открытую: переписка остаётся в Telegram.
              </p>
            </div>
            <TelegramLink>Открыть {site.telegramLabel}</TelegramLink>
          </div>
        </section>
      </main>

      <footer className="border-t border-fg/10 pb-24 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-fg">БУЛЬДОГ KURS</p>
            <p className="mt-2 max-w-md leading-relaxed">
              КСОИ. Не является оружием по сертификату производителя. Продажа лицам младше 18 лет не осуществляется.
              Покупатель сам проверяет законность приобретения и использования в своём регионе.
            </p>
          </div>
          <a href={site.telegram} className="text-brass hover:underline" target="_blank" rel="noopener noreferrer">
            {site.telegramLabel}
          </a>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fg/10 bg-bg/95 p-3 backdrop-blur-md md:hidden">
        <TelegramLink className="w-full">Написать в Telegram</TelegramLink>
      </div>

      {active != null ? (
        <Lightbox
          photo={photos[active]}
          onClose={() => setActive(null)}
          onPrev={() => setActive((active - 1 + photos.length) % photos.length)}
          onNext={() => setActive((active + 1) % photos.length)}
        />
      ) : null}

      {site.metrikaId.trim() ? (
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${site.metrikaId.trim()}`} alt="" width={1} height={1} />
          </div>
        </noscript>
      ) : null}
    </div>
  );
}

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <div className="flex w-full max-w-5xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-[75vh] w-full object-contain"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">{photo.caption}</p>
          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={onPrev} className="min-h-11 border border-fg/15 px-3 text-sm text-fg">
              Назад
            </button>
            <button type="button" onClick={onNext} className="min-h-11 border border-fg/15 px-3 text-sm text-fg">
              Дальше
            </button>
            <button type="button" onClick={onClose} className="min-h-11 bg-brass px-3 text-sm font-semibold text-bg">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
