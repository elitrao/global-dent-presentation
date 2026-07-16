import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Brain,
  CalendarBlank,
  ChartLineUp,
  ChatCircleDots,
  CheckCircle,
  Clock,
  CurrencyRub,
  Database,
  FilmStrip,
  FlowArrow,
  FunnelSimple,
  Lightning,
  MagnifyingGlass,
  Package,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Stack,
  Target,
  UserFocus,
  VideoCamera,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { SlideDefinition, SlideProps } from "../types";

const asset = (name: string) => `/assets/${name}`;

function Benefit({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="benefit-item">
      <span className="benefit-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flow-steps" aria-label="Последовательность процесса">
      {steps.map((step, index) => (
        <div className="flow-step-wrap" key={step}>
          <span className="flow-step">{step}</span>
          {index < steps.length - 1 ? (
            <ArrowRight className="flow-arrow" size={18} weight="bold" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function HeroSlide() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="slide-layout hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">ИИ-дорожная карта</p>
        <h1 data-slide-title tabIndex={-1}>
          Четыре продукта.
          <span> Одна инфраструктура.</span>
        </h1>
        <p className="hero-lead">
          Данные подключаются один раз. Каждый следующий проект запускается быстрее и экономичнее.
        </p>
      </div>

      <motion.figure
        className="hero-art visual-frame visual-frame-hero"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 48 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={asset("hero-infrastructure-1200.webp")}
          srcSet={`${asset("hero-infrastructure-768.webp")} 768w, ${asset("hero-infrastructure-1200.webp")} 1200w`}
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 48px), 58vw"
          alt="Абстрактная янтарная инфраструктура, объединяющая несколько продуктов"
          width={1536}
          height={1024}
          loading="eager"
          fetchPriority="high"
        />
      </motion.figure>
    </div>
  );
}

function ContextSlide() {
  return (
    <div className="slide-layout context-layout">
      <div className="context-heading">
        <h2 data-slide-title tabIndex={-1}>
          Масштаб уже требует другой скорости решений
        </h2>
        <p>
          Продажи растут на данных, но анализ, планирование и проверка информации по-прежнему занимают ручное время.
        </p>
      </div>

      <div className="metric-composition" aria-label="Ключевые показатели масштаба и ручных процессов">
        <article className="metric metric-volume">
          <span className="metric-label">Годовой объем</span>
          <span className="metric-number">≈ 300 000</span>
          <p>имплантатов</p>
        </article>
        <article className="metric metric-clients">
          <span className="metric-label">Клиентская база</span>
          <span className="metric-number">≈ 5 000</span>
          <p>действующих клиентов</p>
        </article>
        <article className="metric metric-manual">
          <div className="metric-icon" aria-hidden="true">
            <Clock size={30} weight="duotone" />
          </div>
          <div>
            <h3>Ручной контур</h3>
            <p>Анализ, планирование и проверка информации требуют участия команды.</p>
          </div>
          <ArrowRight className="metric-flow-arrow" size={24} weight="bold" aria-hidden="true" />
        </article>
        <article className="metric metric-hiring">
          <div className="hiring-number">
            <strong>6</strong>
            <span>месяцев</span>
          </div>
          <p>до понимания, эффективен ли новый продавец</p>
        </article>
      </div>
    </div>
  );
}

function InfrastructureSlide() {
  return (
    <div className="slide-layout infrastructure-layout">
      <div className="infra-copy">
        <div className="section-heading infra-heading">
          <h2 data-slide-title tabIndex={-1}>
            Общая база превращает четыре задачи в систему
          </h2>
          <p>Подключаем источники один раз и развиваем независимые продукты поверх единого контура данных.</p>
        </div>

        <div className="reuse-statement">
          <Lightning size={24} weight="fill" aria-hidden="true" />
          <p>Каждый новый продукт использует уже подключенные данные и накопленную экспертизу.</p>
        </div>
      </div>

      <div className="system-map" aria-label="Четыре продукта на общей инфраструктуре">
        <article className="system-node node-turnover">
          <ChartLineUp size={28} weight="duotone" aria-hidden="true" />
          <div>
            <h3>Оборачиваемость</h3>
            <p>Спрос, запасы, закупки</p>
          </div>
        </article>
        <article className="system-node node-bot">
          <ChatCircleDots size={28} weight="duotone" aria-hidden="true" />
          <div>
            <h3>ИИ-бот</h3>
            <p>Сценарии и знания</p>
          </div>
        </article>
        <div className="system-core">
          <Database size={40} weight="duotone" aria-hidden="true" />
          <strong>Единый контур данных</strong>
          <span>1С, склады, продажи, HR</span>
        </div>
        <article className="system-node node-people">
          <UserFocus size={28} weight="duotone" aria-hidden="true" />
          <div>
            <h3>Кандидаты</h3>
            <p>Профиль и прогноз</p>
          </div>
        </article>
        <article className="system-node node-content">
          <VideoCamera size={28} weight="duotone" aria-hidden="true" />
          <div>
            <h3>Контент</h3>
            <p>Анализ и производство</p>
          </div>
        </article>
      </div>
    </div>
  );
}

function InventorySlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout project-layout project-inventory">
      <figure className="visual-frame project-art inventory-art">
        <img
          src={asset("inventory-forecast.webp")}
          alt="Абстрактная система запасов с янтарной линией прогноза"
          width={1536}
          height={1024}
          loading="lazy"
        />
      </figure>

      <div className="project-copy inventory-copy">
        <p className="eyebrow">Приоритет №1</p>
        <h2 data-slide-title tabIndex={-1}>
          Панель оборачиваемости
        </h2>
        <FlowSteps steps={["1С и склады", "Аналитика", "Прогноз", "Рекомендации", "Вопросы"]} />

        <div className="benefit-grid compact-benefits">
          <Benefit
            icon={<Package size={22} weight="duotone" />}
            title="Меньше зависших запасов"
            text="Видно, что перестало двигаться и где заморожены деньги."
          />
          <Benefit
            icon={<ShieldCheck size={22} weight="duotone" />}
            title="Меньше дефицита"
            text="Закупка учитывает спрос, остаток, поставку и аналоги."
          />
          <Benefit
            icon={<ChartLineUp size={22} weight="duotone" />}
            title="Решения по данным"
            text="Единая логика вместо разрозненных Excel-расчетов."
          />
          <Benefit
            icon={<ChatCircleDots size={22} weight="duotone" />}
            title="Ответ обычным языком"
            text="Что закупить в августе и какие позиции зависли."
          />
        </div>

        <button type="button" className="text-button" onClick={() => openPanel("inventory")}>
          <SlidersHorizontal size={20} weight="bold" aria-hidden="true" />
          Что потребуется
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function BotSlide() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="slide-layout bot-layout">
      <div className="bot-copy">
        <h2 data-slide-title tabIndex={-1}>
          ИИ-бот становится рабочей базой знаний
        </h2>
        <p>
          Первые сценарии дали положительный результат. Следующий уровень: больше знаний, устойчивее ответы, шире применение.
        </p>

        <div className="bot-capabilities">
          <Benefit
            icon={<Lightning size={22} weight="duotone" />}
            title="Быстрее ответы"
            text="Готовые сценарии сокращают путь от вопроса к действию."
          />
          <Benefit
            icon={<ShieldCheck size={22} weight="duotone" />}
            title="Единый стандарт"
            text="Ответы опираются на проверенную базу знаний."
          />
          <Benefit
            icon={<FlowArrow size={22} weight="duotone" />}
            title="Больше сценариев"
            text="Новые задачи без пропорционального роста ручной работы."
          />
          <Benefit
            icon={<BookOpenText size={22} weight="duotone" />}
            title="Знания остаются"
            text="Успешные скрипты накапливаются и улучшаются."
          />
        </div>

        <div className="support-line">
          <CheckCircle size={20} weight="fill" aria-hidden="true" />
          <span>Развитие идет в рамках сопровождения. Крупные блоки согласуются отдельно.</span>
        </div>
      </div>

      <div className="bot-orbit" aria-hidden="true">
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <motion.div
          className="bot-core"
          animate={reduceMotion ? { y: 0 } : { y: [-5, 5, -5] }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Brain size={68} weight="duotone" />
        </motion.div>
        <div className="bot-satellite sat-one">
          <ChatCircleDots size={26} weight="duotone" />
        </div>
        <div className="bot-satellite sat-two">
          <BookOpenText size={26} weight="duotone" />
        </div>
        <div className="bot-satellite sat-three">
          <ShieldCheck size={26} weight="duotone" />
        </div>
      </div>
    </div>
  );
}

function CandidatesSlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout candidates-layout">
      <div className="candidates-copy">
        <h2 data-slide-title tabIndex={-1}>
          Прогноз до выхода кандидата в штат
        </h2>
        <p>
          Не универсальный тест, а профиль успешного продавца Global Dent на основе фактических результатов.
        </p>

        <div className="candidate-flow">
          <div>
            <FilesIcon />
            <span>Резюме и тесты</span>
          </div>
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
          <div>
            <ChartLineUp size={24} weight="duotone" aria-hidden="true" />
            <span>Продажи</span>
          </div>
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
          <div className="candidate-flow-result">
            <Target size={24} weight="duotone" aria-hidden="true" />
            <span>Прогноз</span>
          </div>
        </div>

        <div className="candidate-outcomes">
          <Benefit
            icon={<FunnelSimple size={21} weight="duotone" />}
            title="Ранний отсев"
            text="До зарплаты и полугода обучения"
          />
          <Benefit
            icon={<Brain size={21} weight="duotone" />}
            title="Собственная модель"
            text="На данных и KPI Global Dent"
          />
          <Benefit
            icon={<ShieldCheck size={21} weight="duotone" />}
            title="Честная проверка"
            text="Сначала оцениваем достаточность истории"
          />
        </div>

        <button type="button" className="text-button" onClick={() => openPanel("candidates")}>
          <SlidersHorizontal size={20} weight="bold" aria-hidden="true" />
          Какие данные нужны
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <figure className="visual-frame project-art candidate-art">
        <img
          src={asset("candidate-profile.webp")}
          alt="Абстрактный профиль кандидата, собранный из слоев данных"
          width={1536}
          height={1024}
          loading="lazy"
        />
      </figure>
    </div>
  );
}

function FilesIcon() {
  return <Stack size={24} weight="duotone" aria-hidden="true" />;
}

function ContentSlide() {
  const steps = [
    {
      icon: <MagnifyingGlass size={30} weight="duotone" />,
      title: "Анализировать",
      text: "Конкуренты, Reels, TikTok и YouTube",
    },
    {
      icon: <Target size={30} weight="duotone" />,
      title: "Находить",
      text: "Темы и форматы, которые уже работают",
    },
    {
      icon: <FilmStrip size={30} weight="duotone" />,
      title: "Генерировать",
      text: "Сценарии и контент для выбранного канала",
    },
    {
      icon: <CheckCircle size={30} weight="duotone" />,
      title: "Проверять",
      text: "Человек принимает решение до публикации",
    },
  ];

  return (
    <div className="slide-layout content-layout">
      <div className="content-heading">
        <p className="eyebrow">Контент-процесс</p>
        <h2 data-slide-title tabIndex={-1}>
          От анализа форматов до готовой публикации
        </h2>
      </div>

      <div className="content-conveyor">
          {steps.map((step, index) => (
            <article className={`content-stage stage-${index + 1}`} key={step.title}>
              <div className="stage-icon" aria-hidden="true">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {index < steps.length - 1 ? (
              <ArrowRight className="stage-arrow" size={22} weight="bold" aria-hidden="true" />
            ) : null}
          </article>
        ))}
      </div>

      <div className="content-benefits">
        <span>Быстрее находить сильные форматы</span>
        <span>Поддерживать регулярность</span>
        <span>Переиспользовать идеи между каналами</span>
        <span>Сохранять редакционный контроль</span>
      </div>
    </div>
  );
}

function InvestmentSlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout investment-layout">
      <div className="investment-heading">
        <h2 data-slide-title tabIndex={-1}>
          Короткие этапы. Понятный результат.
        </h2>
        <p>Каждые 1-2 недели появляется результат, который можно проверить на данных.</p>
        <div className="investment-summary">
          <span>Итого по 3 фиксированным направлениям</span>
          <strong>≈ 900 000 ₽</strong>
          <p>Оборачиваемость, кандидаты и контент. ИИ-бот и сопровождение считаются отдельно.</p>
        </div>
        <button type="button" className="text-button" onClick={() => openPanel("investment")}>
          <SlidersHorizontal size={20} weight="bold" aria-hidden="true" />
          Все этапы и суммы
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </button>
      </div>

      <div className="investment-grid">
        <article className="investment-card investment-primary">
          <div className="investment-icon"><ChartLineUp size={28} weight="duotone" /></div>
          <h3>Оборачиваемость</h3>
          <p className="investment-price-label">Ориентир полного направления</p>
          <strong>≈ 530 000 ₽</strong>
          <div className="investment-card-details">
            <span>Первый этап: Discovery 80 000 ₽</span>
            <span>Срок: ≈ 9 недель</span>
          </div>
        </article>
        <article className="investment-card">
          <div className="investment-icon"><UserFocus size={28} weight="duotone" /></div>
          <h3>Кандидаты</h3>
          <p className="investment-price-label">Ориентир полного направления</p>
          <strong>≈ 270 000 ₽</strong>
          <div className="investment-card-details">
            <span>Первый этап: Discovery 80 000 ₽</span>
            <span>Срок: ≈ 3 недели</span>
          </div>
        </article>
        <article className="investment-card investment-content-card">
          <div className="investment-icon"><VideoCamera size={28} weight="duotone" /></div>
          <h3>Контент</h3>
          <p className="investment-price-label">Стоимость пилота</p>
          <strong>100 000 ₽</strong>
          <div className="investment-card-details">
            <span>1 канал</span>
            <span>Срок: 2 недели</span>
          </div>
        </article>
        <article className="investment-card investment-support-card">
          <div className="investment-icon"><ChatCircleDots size={28} weight="duotone" /></div>
          <h3>ИИ-бот</h3>
          <p className="investment-price-label">Модель оплаты</p>
          <strong>Помесячно</strong>
          <div className="investment-card-details support-price">
            <span>В рамках сопровождения</span>
            <span><CurrencyRub size={18} weight="bold" />Новые системы от 20 000 ₽/мес</span>
          </div>
        </article>
      </div>
    </div>
  );
}

function NextStepSlide() {
  return (
    <div className="slide-layout next-layout">
      <div className="next-heading">
        <PhoneCall size={34} weight="duotone" aria-hidden="true" />
        <h2 data-slide-title tabIndex={-1}>
          Следующий шаг: рабочий звонок
        </h2>
        <p>Показываем концепты, фиксируем приоритеты и выбираем первый независимый старт.</p>
      </div>

      <div className="start-paths">
        <article className="start-path path-turnover">
          <div className="path-head">
            <ChartLineUp size={30} weight="duotone" aria-hidden="true" />
            <span>Приоритет №1</span>
          </div>
          <h3>Discovery оборачиваемости</h3>
          <p>Разбираем 1С, структуру складских данных и правила закупки.</p>
          <div className="path-inputs">
            <span>Доступ к 1С</span>
            <span>Остатки и движение</span>
            <span>Правила закупок</span>
          </div>
        </article>

        <article className="start-path path-candidates">
          <div className="path-head">
            <UserFocus size={30} weight="duotone" aria-hidden="true" />
            <span>Независимый старт</span>
          </div>
          <h3>Discovery кандидатов</h3>
          <p>Проверяем историю найма и связываем ее с фактическими продажами.</p>
          <div className="path-inputs">
            <span>Резюме и тесты</span>
            <span>История найма</span>
            <span>Фактические продажи</span>
          </div>
        </article>
      </div>

      <div className="final-statement">
        <span className="final-statement-icon">
          <CalendarBlank size={26} weight="duotone" aria-hidden="true" />
        </span>
        <div className="final-statement-copy">
          <span>Принцип запуска</span>
          <strong>
            <span>Сначала ТЗ и точная смета.</span>
            <span>Затем разработка.</span>
          </strong>
        </div>
      </div>
    </div>
  );
}

export const slides: SlideDefinition[] = [
  { id: "slide-1", title: "ИИ-дорожная карта", component: HeroSlide },
  { id: "slide-2", title: "Почему сейчас", component: ContextSlide },
  { id: "slide-3", title: "Общая инфраструктура", component: InfrastructureSlide },
  { id: "slide-4", title: "Оборачиваемость", component: InventorySlide },
  { id: "slide-5", title: "ИИ-бот", component: BotSlide },
  { id: "slide-6", title: "Кандидаты", component: CandidatesSlide },
  { id: "slide-7", title: "Контент", component: ContentSlide },
  { id: "slide-8", title: "Запуск и инвестиции", component: InvestmentSlide },
  { id: "slide-9", title: "Следующий шаг", component: NextStepSlide },
];
