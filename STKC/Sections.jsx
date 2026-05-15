// Practice area cards
const Services = () => {
  const items = [
    { id: 'traffic', Ico: IconCar, title: 'Traffic tickets', desc: 'Speeding, stop sign, failure to signal, following too closely — most basic moving violations.', flat: '$75' },
    { id: 'dui', Ico: IconBeer, title: 'DWI / DUI', desc: 'Aggressive defense for drunk driving charges. We protect your license and your record.', flat: 'Quote' },
    { id: 'suspended', Ico: IconLicense, title: 'Driving while suspended', desc: 'Charged with driving on a suspended license? Talk to us before your court date.', flat: 'Quote' },
    { id: 'cleanup', Ico: IconShield, title: 'Driving record cleanup', desc: 'Resolve old tickets, warrants and points so your record stops costing you money.', flat: 'Quote' },
  ];
  return (
    <section id="services" data-screen-label="Practice areas">
      <div className="container" style={{ paddingTop: 96, paddingBottom: 0 }}>
        <div className="eyebrow"><span className="line"></span><span className="num">01</span>Practice areas</div>
        <h2 className="h-section" style={{ marginTop: 16, marginBottom: 16, maxWidth: '24ch' }}>
          One firm for everything between you and your driving record.
        </h2>
        <p className="lede" style={{ marginBottom: 48 }}>
          Tap a service for details, or jump straight to a free quote. If you're not sure which applies, just call.
        </p>
      </div>
      <div className="services">
        {items.map(({ id, Ico, title, desc, flat }) => (
          <a key={id} className="service" href={'#' + id}>
            <span className="ico"><Ico size={28} stroke={1.4}/></span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="more">{flat === '$75' ? 'Flat fee $75' : 'Get a quote'} <IconArrow size={14}/></span>
          </a>
        ))}
      </div>
    </section>
  );
};

// Pricing block
const Pricing = () => (
  <section id="pricing" className="section" data-screen-label="Pricing">
    <div className="container">
      <div className="eyebrow"><span className="line"></span><span className="num">02</span>Pricing</div>
      <h2 className="h-section" style={{ marginTop: 16, marginBottom: 56, maxWidth: '22ch' }}>
        A flat fee. Not an hourly meter.
      </h2>

      <div className="pricing">
        <div className="left">
          <div className="big">
            <sup>$</sup>75<span className="star">*</span>
          </div>
          <div className="lbl">Attorney's flat fee · basic ticket</div>
        </div>
        <div className="right">
          <h3>What $75 covers</h3>
          <p>For basic traffic tickets, that's the entire attorney fee — start to finish. The amount you'll be quoted on the call is the amount you'll pay. No surprise add-ons.</p>
          <ul>
            <li><IconCheck size={16} className="tick"/> Speeding under 19 mph over limit</li>
            <li><IconCheck size={16} className="tick"/> Stop sign and signal violations</li>
            <li><IconCheck size={16} className="tick"/> Failure to signal or yield</li>
            <li><IconCheck size={16} className="tick"/> Following too closely (no accident)</li>
            <li><IconCheck size={16} className="tick"/> No insurance (now covered)</li>
            <li><IconCheck size={16} className="tick"/> Most 2-4 point violations</li>
          </ul>
          <p className="footnote">
            *Court fines and court costs are separate, paid to the jurisdiction. More serious charges (DWI, suspended, hit & run, accident tickets) are quoted individually — almost always less than what one insurance hike would cost you over three years.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Process / How it works
const Process = () => {
  const steps = [
    {
      n: '01',
      label: 'Step one',
      Ico: IconSmartphone,
      title: 'Send us your ticket',
      body: 'Call, click, or text us your ticket number and a quick note. If you\'re under 21, mention your age. Takes about two minutes.'
    },
    {
      n: '02',
      label: 'Step two',
      Ico: IconClipboard,
      title: 'Sign your retainer online',
      body: 'You get an email with an electronic contract, your quoted fee, expected court costs, and a payment link. Sign from your phone.'
    },
    {
      n: '03',
      label: 'Step three',
      Ico: IconScale,
      title: 'We file and negotiate',
      body: 'We enter on your case, request a recommendation from the prosecutor, and work toward an amended charge with no points on your record.'
    },
    {
      n: '04',
      label: 'Step four',
      Ico: IconCheck,
      title: 'Done. No court for you',
      body: 'When the prosecutor accepts, you pay the fine (or we do, then send the receipt). You get a confirmation email and move on with your life.'
    },
  ];
  return (
    <section id="process" className="section" data-screen-label="How it works">
      <div className="container">
        <div className="two-col">
          <div>
            <div className="eyebrow"><span className="line"></span><span className="num">03</span>How it works</div>
            <h2 className="h-section" style={{ marginTop: 16, marginBottom: 20 }}>
              Four steps. No office visit. No court appearance in most cases.
            </h2>
            <p className="lede">
              The entire process runs over phone and email. Our attorney lives in the Kansas City Metro and handles your matter from filing through resolution.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconClock size={14}/> Most matters in under 2 weeks
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconLock size={14}/> Confidential, secure
              </span>
            </div>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <div className="n">{s.label}<strong>{s.n}</strong></div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
                <div className="icon"><s.Ico size={20} stroke={1.4}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Why hire a traffic lawyer — three columns of real reasons
const Why = () => (
  <section className="section" data-screen-label="Why hire a lawyer">
    <div className="container">
      <div className="eyebrow"><span className="line"></span><span className="num">04</span>Why hire a traffic lawyer</div>
      <h2 className="h-section" style={{ marginTop: 16, marginBottom: 20, maxWidth: '24ch' }}>
        Paying a ticket is rarely the cheapest way to make it go away.
      </h2>
      <p className="lede">
        Insurance hikes, license points and surcharges add up fast. For most clients, our flat fee is recovered many times over before the next renewal.
      </p>
      <div className="triplets">
        <div className="triplet">
          <div className="stat">22<span className="unit">%</span></div>
          <h4>Keep insurance rates low</h4>
          <p>A single moving violation can raise premiums up to 22% for three years. Amending to a non-moving violation typically keeps your rate where it is.</p>
        </div>
        <div className="triplet">
          <div className="stat">0<span className="unit">pts</span></div>
          <h4>Keep points off your record</h4>
          <p>Missouri tracks points on your license for up to three years. Too many and you lose driving privileges. Our work targets an amended charge with no points.</p>
        </div>
        <div className="triplet">
          <div className="stat">0<span className="unit">hrs</span></div>
          <h4>Skip the day in court</h4>
          <p>You don't sit in a hallway and you don't miss work. In most basic cases, we appear, negotiate, and resolve the matter without you ever showing up.</p>
        </div>
      </div>
    </div>
  </section>
);

window.Services = Services;
window.Pricing = Pricing;
window.Process = Process;
window.Why = Why;
