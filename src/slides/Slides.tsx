import type { ReactNode } from "react";
import { detailPanels } from "../content";
import type { SlideDefinition, SlideProps } from "../types";

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function BenefitList({ items }: { items: Array<{ title: string; text?: string }> }) {
  return (
    <div className="benefit-block">
      <p className="benefit-heading">Плюсы от внедрения</p>
      <div className="benefit-list">
        {items.map((item) => (
          <article className="benefit-row" key={item.title}>
            <strong>{item.title}</strong>
            {item.text ? <span>{item.text}</span> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function NumberedRows({
  items,
  className = "",
}: {
  items: Array<{ title: string; text: string }>;
  className?: string;
}) {
  return (
    <div className={`numbered-rows ${className}`.trim()}>
      {items.map((item, index) => (
        <article className="numbered-row" key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function DetailButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="detail-link" onClick={onClick}>
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  );
}

function ProjectActions({ children }: { children: ReactNode }) {
  return <div className="project-actions">{children}</div>;
}

type CostStage = {
  title: string;
  description: string;
  time: string;
  amount: string;
};

function ProjectCostSlide({
  eyebrow,
  total,
  totalLabel,
  stages,
  note,
}: {
  eyebrow: string;
  total: string;
  totalLabel: string;
  stages: CostStage[];
  note: string;
}) {
  return (
    <div className="slide-layout project-cost-slide">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="project-cost-heading">
        <h2 data-slide-title tabIndex={-1}>Этапы и стоимость</h2>
        <div className="project-cost-total">
          <span>{totalLabel}</span>
          <strong>{total}</strong>
        </div>
      </div>
      <div className={`cost-stage-grid cost-stage-grid-${stages.length}`}>
        {stages.map((stage, index) => (
          <article className="cost-stage-card" key={stage.title}>
            <span className="cost-stage-number">{index + 1}</span>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
            <div className="cost-stage-meta">
              <span>{stage.time}</span>
              <strong>{stage.amount}</strong>
            </div>
          </article>
        ))}
      </div>
      <p className="cost-slide-note">{note}</p>
    </div>
  );
}

function DetailContentSlide({ panelId, eyebrow }: { panelId: "inventory" | "candidates"; eyebrow: string }) {
  const panel = detailPanels[panelId];

  return (
    <div className="slide-layout requirements-slide">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>{panel.title}</h2>
      <p className="requirements-intro">{panel.intro}</p>
      <div className="requirements-grid">
        {panel.groups.map((group) => (
          <article className="requirements-card" key={group.title}>
            <h3>{group.title}</h3>
            {group.owner ? <span>{group.owner}</span> : null}
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      {panel.note ? <p className="requirements-note">{panel.note}</p> : null}
    </div>
  );
}

function InventoryCostSlide() {
  return (
    <ProjectCostSlide
      eyebrow="Проект 1 · Оборачиваемость"
      total="≈ 530 000 ₽"
      totalLabel="Ориентир полного направления · около 9 недель"
      stages={[
        { title: "Discovery", description: "Разбор 1С и складских данных, макет панели, ТЗ и точная смета", time: "2 недели + 2 дня на доступы", amount: "80 000 ₽" },
        { title: "Аналитическое ядро", description: "Единая модель данных и первая рабочая версия панели", time: "4 недели", amount: "≈ 250 000 ₽" },
        { title: "Прогноз и рекомендации", description: "Прогноз потребности и рекомендации по закупкам", time: "3 недели", amount: "≈ 200 000 ₽" },
      ]}
      note="Финальная стоимость основной разработки уточняется после Discovery"
    />
  );
}

function CandidatesCostSlide() {
  return (
    <ProjectCostSlide
      eyebrow="Проект 3 · Кандидаты"
      total="≈ 270 000 ₽"
      totalLabel="Ориентир полного направления · около 3 недель"
      stages={[
        { title: "Discovery данных найма", description: "Проверка истории найма, профиль успешного продавца, ТЗ и точная смета", time: "1–2 недели", amount: "80 000 ₽" },
        { title: "Прогнозная модель", description: "Модель на данных Global Dent и отчёт по новому кандидату", time: "2 недели", amount: "≈ 190 000 ₽" },
      ]}
      note="Разработка начинается только после подтверждения достаточности данных"
    />
  );
}

function BotCostSlide() {
  return (
    <ProjectCostSlide
      eyebrow="Проект 2 · ИИ-бот"
      total="Помесячно"
      totalLabel="Развитие в рамках действующего сопровождения"
      stages={[
        { title: "Плановое развитие", description: "Новые сценарии, развитие базы знаний и контроль качества ответов", time: "Помесячно", amount: "В сопровождении" },
        { title: "Крупные блоки", description: "Самостоятельные функциональные задачи с отдельным описанием и оценкой", time: "По оценке задачи", amount: "Отдельная смета" },
        { title: "Новые системы", description: "Доработки, аналитика работы и плановое развитие после запуска", time: "Помесячно", amount: "от 20 000 ₽/мес" },
      ]}
      note="Состав работ на месяц фиксируется заранее; крупные функциональные блоки согласуются отдельно"
    />
  );
}

function ContentCostSlide() {
  return (
    <ProjectCostSlide
      eyebrow="Проект 4 · Контент-аналитика"
      total="100 000 ₽"
      totalLabel="Пилот на одном канале · 2 недели"
      stages={[
        { title: "Пилот", description: "Сбор и анализ конкурентов, форматов и хуков на одном выбранном канале", time: "2 недели", amount: "100 000 ₽" },
        { title: "Проверяемый результат", description: "Подборка форматов, структура аналитики и основание для масштабирования", time: "По итогам пилота", amount: "Решение команды" },
      ]}
      note="Контент не генерируется автоматически — система усиливает решения команды данными"
    />
  );
}

function InventoryRequirementsSlide() {
  return <DetailContentSlide panelId="inventory" eyebrow="Проект 1 · Что потребуется" />;
}

function CandidatesRequirementsSlide() {
  return <DetailContentSlide panelId="candidates" eyebrow="Проект 3 · Какие данные нужны" />;
}

function HeroSlide() {
  return (
    <div className="slide-layout title-slide">
      <div className="title-slide-main">
        <Eyebrow>ИИ-дорожная карта</Eyebrow>
        <h1 data-slide-title tabIndex={-1}>
          Четыре продукта
          <br />
          Одна инфраструктура
        </h1>
        <p className="title-deck-copy">
          Данные подключаются один раз. Каждый следующий проект запускается быстрее и экономичнее
        </p>
      </div>
      <p className="swipe-hint">
        <span aria-hidden="true">↕</span>
        Свайпайте вверх или вниз
      </p>
      <div className="title-slide-footer">
        <span>Global Dent</span>
        <span>ИИ-продукты на общей базе данных</span>
      </div>
    </div>
  );
}

function ContextSlide() {
  const metrics = [
    { value: "≈ 300 000", label: "имплантатов в год" },
    { value: "≈ 5 000", label: "действующих клиентов" },
    { value: "Ручная", label: "значительная часть анализа" },
    { value: "6 месяцев", label: "до оценки нового продавца" },
  ];

  return (
    <div className="slide-layout context-slide">
      <Eyebrow>Почему сейчас</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>Масштаб уже требует другой скорости решений</h2>
      <div className="context-columns">
        <article>
          <span>Операционный контур</span>
          <p>Продажи растут на данных, но анализ, планирование и проверка информации по-прежнему требуют участия команды</p>
        </article>
        <article>
          <span>Оценка нового продавца</span>
          <p>Эффективность становится понятна только через полгода, когда ресурсы уже вложены</p>
        </article>
      </div>
      <div className="metric-strip" aria-label="Ключевые показатели">
        {metrics.map((metric) => (
          <article className="metric-item" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function InfrastructureSlide() {
  const cards = [
    { title: "Единый контур данных", text: "1С, склады, продажи и HR" },
    { title: "Оборачиваемость", text: "Спрос, запасы и закупки" },
    { title: "ИИ-бот", text: "Сценарии и корпоративные знания" },
    { title: "Кандидаты", text: "Профиль и прогноз эффективности" },
    { title: "Контент", text: "Форматы, хуки и сценарии" },
  ];

  return (
    <div className="slide-layout infrastructure-slide">
      <Eyebrow>Общая инфраструктура</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>Одна база, четыре независимых продукта</h2>
      <div className="architecture-diagram" aria-label="Четыре продукта вокруг единого контура данных">
        <span className="diagram-connector connector-one" aria-hidden="true" />
        <span className="diagram-connector connector-two" aria-hidden="true" />
        <span className="diagram-connector connector-three" aria-hidden="true" />
        <span className="diagram-connector connector-four" aria-hidden="true" />
        {cards.slice(1).map((card, index) => (
          <article className={`architecture-card architecture-product product-${index + 1}`} key={card.title}>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </article>
        ))}
        <article className="architecture-card architecture-core">
          <span>Общая база</span>
          <strong>{cards[0].title}</strong>
          <p>{cards[0].text}</p>
        </article>
      </div>
      <p className="reuse-note">Каждый новый продукт использует уже подключённые данные и накопленную экспертизу</p>
    </div>
  );
}

function InventorySlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout project-slide inventory-slide">
      <Eyebrow>Приоритет №1</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>Панель оборачиваемости</h2>
      <NumberedRows
        className="five-steps"
        items={[
          { title: "1С и склады", text: "Остатки, движение и правила закупок" },
          { title: "Аналитика", text: "Единая логика вместо ручных таблиц" },
          { title: "Прогноз", text: "Спрос и будущая потребность" },
          { title: "Рекомендации", text: "Что и когда закупать" },
          { title: "Вопросы", text: "Ответ обычным языком" },
        ]}
      />
      <BenefitList
        items={[
          { title: "Меньше зависших запасов", text: "Видно, где заморожены деньги" },
          { title: "Меньше дефицита", text: "Закупка учитывает спрос и поставку" },
          { title: "Решения по данным", text: "Одна логика вместо Excel" },
          { title: "Быстрые ответы", text: "Без ручных расчётов" },
        ]}
      />
      <ProjectActions>
        <DetailButton onClick={() => openPanel("inventory")}>Что потребуется</DetailButton>
        <DetailButton onClick={() => openPanel("inventoryCost")}>Цена по проекту</DetailButton>
      </ProjectActions>
    </div>
  );
}

function BotSlide({ openPanel }: SlideProps) {
  const blocks = [
    { title: "Новые сценарии", text: "Расширяем задачи, которые бот решает для команды" },
    { title: "Успешные скрипты", text: "Сохраняем и переиспользуем работающие ответы" },
    { title: "База знаний", text: "Корпоративная экспертиза остаётся внутри системы" },
    { title: "Контроль качества", text: "Проверяем ответы и улучшаем стандарты консультаций" },
  ];

  return (
    <div className="slide-layout bot-slide">
      <Eyebrow>Проект 2</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>ИИ-бот становится рабочей базой знаний</h2>
      <div className="editorial-grid two-by-two">
        {blocks.map((block, index) => (
          <article className="editorial-card" key={block.title}>
            <span className="editorial-card-index" aria-hidden="true">
              {index + 1}
            </span>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
          </article>
        ))}
      </div>
      <BenefitList
        items={[
          { title: "Быстрее ответы", text: "Меньше времени на поиск и подготовку ответа" },
          { title: "Единый стандарт консультаций", text: "Команда опирается на проверенные сценарии" },
          { title: "Масштабирование без роста ручной работы", text: "Больше диалогов без пропорционального роста нагрузки" },
          { title: "Накопление корпоративных знаний", text: "Успешные ответы сохраняются внутри системы" },
        ]}
      />
      <p className="project-note">Развитие идёт в рамках сопровождения. Крупные функциональные блоки согласуются отдельно</p>
      <ProjectActions>
        <DetailButton onClick={() => openPanel("botCost")}>Цена по проекту</DetailButton>
      </ProjectActions>
    </div>
  );
}

function CandidatesSlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout candidates-slide">
      <Eyebrow>Проект 3</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>Прогноз до выхода кандидата в штат</h2>
      <NumberedRows
        className="candidate-process"
        items={[
          { title: "Исторические данные", text: "Резюме, тесты и решения о найме" },
          { title: "Фактические продажи", text: "Результаты сотрудников после выхода" },
          { title: "Профиль успеха", text: "Модель продавца на данных Global Dent" },
          { title: "Прогноз", text: "Оценка нового кандидата до найма" },
        ]}
      />
      <BenefitList
        items={[
          { title: "Ранний отсев", text: "До зарплаты и долгого обучения" },
          { title: "Собственная модель", text: "На данных и KPI Global Dent" },
          { title: "Честная проверка", text: "Сначала оцениваем достаточность истории" },
        ]}
      />
      <ProjectActions>
        <DetailButton onClick={() => openPanel("candidates")}>Какие данные нужны</DetailButton>
        <DetailButton onClick={() => openPanel("candidatesCost")}>Цена по проекту</DetailButton>
      </ProjectActions>
    </div>
  );
}

function ContentSlide({ openPanel }: SlideProps) {
  return (
    <div className="slide-layout content-slide">
      <Eyebrow>Аналитика для продюсирования</Eyebrow>
      <div className="content-title-row">
        <h2 data-slide-title tabIndex={-1}>Полуавтоматический конвейер аналитики</h2>
        <aside>
          <strong>Контент не генерируем</strong>
          <span>Усиливаем решения команды данными</span>
        </aside>
      </div>
      <NumberedRows
        className="content-process"
        items={[
          { title: "Собирать", text: "Конкуренты, Reels, TikTok, Shorts и YouTube" },
          { title: "Разбирать", text: "Просмотры, паттерны, темы и структура роликов" },
          { title: "Выделять", text: "Форматы и хуки, которые уже работают" },
          { title: "Передавать команде", text: "Готовая идея, формат и сценарий" },
        ]}
      />
      <BenefitList
        items={[
          { title: "Быстрее находить сильные форматы", text: "Видно, какие темы и хуки уже дают просмотры" },
          { title: "Поддерживать регулярность", text: "Команда быстрее получает идеи для выпусков" },
          { title: "Переиспользовать идеи между каналами", text: "Сильный формат адаптируется под разные площадки" },
          { title: "Сохранять редакционный контроль", text: "Финальное решение всегда остаётся за командой" },
        ]}
      />
      <ProjectActions>
        <DetailButton onClick={() => openPanel("contentCost")}>Цена по проекту</DetailButton>
      </ProjectActions>
    </div>
  );
}

function InvestmentSlide({ openPanel }: SlideProps) {
  const items = [
    { title: "Оборачиваемость", amount: "≈ 530 000 ₽", first: "Discovery 80 000 ₽", time: "≈ 9 недель" },
    { title: "Кандидаты", amount: "≈ 270 000 ₽", first: "Discovery 80 000 ₽", time: "≈ 3 недели" },
    { title: "Контент", amount: "100 000 ₽", first: "Пилот", time: "2 недели" },
    { title: "ИИ-бот", amount: "Помесячно", first: "В рамках сопровождения", time: "Системы от 20 000 ₽/мес" },
  ];

  return (
    <div className="slide-layout investment-slide">
      <div className="investment-topline">
        <div>
          <Eyebrow>Запуск и инвестиции</Eyebrow>
          <h2 data-slide-title tabIndex={-1}>Короткие этапы. Проверяемый результат</h2>
        </div>
      </div>
      <div className="investment-cards">
        {items.map((item) => (
          <article className="investment-card" key={item.title}>
            <h3>{item.title}</h3>
            <strong>{item.amount}</strong>
            <p>{item.first}</p>
            <span>{item.time}</span>
          </article>
        ))}
      </div>
      <div className="investment-total">
        <span>Итого по трём фиксированным направлениям</span>
        <strong>≈ 900 000 ₽</strong>
      </div>
      <div className="investment-bottom">
        <p>Оборачиваемость, кандидаты и контент входят в итог. ИИ-бот и сопровождение считаются отдельно</p>
        <DetailButton onClick={() => openPanel("investment")}>Все этапы и суммы</DetailButton>
      </div>
    </div>
  );
}

function NextStepSlide() {
  const starts = [
    {
      label: "Приоритет №1",
      title: "Discovery оборачиваемости",
      text: "Разбираем 1С, структуру складских данных и правила закупки",
      inputs: ["Доступ к 1С", "Остатки и движение", "Правила закупок"],
    },
    {
      label: "Независимый старт",
      title: "Discovery кандидатов",
      text: "Проверяем историю найма и связываем её с фактическими продажами",
      inputs: ["Резюме и тесты", "История найма", "Фактические продажи"],
    },
  ];

  return (
    <div className="slide-layout next-slide">
      <Eyebrow>Следующий шаг</Eyebrow>
      <h2 data-slide-title tabIndex={-1}>Рабочий звонок</h2>
      <p className="next-intro">Показываем концепты, фиксируем приоритеты и выбираем первый независимый старт</p>
      <div className="start-grid">
        {starts.map((start) => (
          <article className="start-card" key={start.title}>
            <span>{start.label}</span>
            <h3>{start.title}</h3>
            <p>{start.text}</p>
            <ul>
              {start.inputs.map((input) => <li key={input}>{input}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="final-principle">
        <span>Принцип запуска</span>
        <strong>Сначала ТЗ и точная смета. Затем разработка</strong>
      </div>
    </div>
  );
}

export const slides: SlideDefinition[] = [
  { id: "slide-1", title: "ИИ-дорожная карта", component: HeroSlide },
  { id: "slide-2", title: "Почему сейчас", component: ContextSlide },
  { id: "slide-3", title: "Общая инфраструктура", component: InfrastructureSlide },
  { id: "slide-4", title: "Оборачиваемость", component: InventorySlide },
  { id: "slide-5", title: "Стоимость оборачиваемости", component: InventoryCostSlide },
  { id: "slide-6", title: "Что потребуется", component: InventoryRequirementsSlide },
  { id: "slide-7", title: "ИИ-бот", component: BotSlide },
  { id: "slide-8", title: "Стоимость развития ИИ-бота", component: BotCostSlide },
  { id: "slide-9", title: "Кандидаты", component: CandidatesSlide },
  { id: "slide-10", title: "Стоимость модели кандидатов", component: CandidatesCostSlide },
  { id: "slide-11", title: "Данные для модели кандидатов", component: CandidatesRequirementsSlide },
  { id: "slide-12", title: "Контент", component: ContentSlide },
  { id: "slide-13", title: "Стоимость контент-аналитики", component: ContentCostSlide },
  { id: "slide-14", title: "Запуск и инвестиции", component: InvestmentSlide },
  { id: "slide-15", title: "Следующий шаг", component: NextStepSlide },
];
