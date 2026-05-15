// Attorneys, Reviews, Partnership, Locations, CTA, Footer

const Attorneys = () => (
  <section id="attorneys" className="section" data-screen-label="Attorneys">
    <div className="container">
      <div className="eyebrow"><span className="line"></span><span className="num">05</span>Our attorneys</div>
      <h2 className="h-section" style={{ marginTop: 16, marginBottom: 20, maxWidth: '24ch' }}>
        Three Kansas City attorneys. One who oversees every case.
      </h2>
      <p className="lede">
        R. Christopher Simons oversees each matter from beginning to end. All attorneys live in the Kansas City Metro and appear regularly in the courts where your ticket was issued.
      </p>

      <div className="attorneys">
        <div className="attorney lead">
          <div className="lead-inner">
            <div className="portrait">
              <div className="ph">RCS</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div className="role">Lead attorney · oversees every case</div>
                <h4>R. Christopher Simons</h4>
                <span className="post">Founder · Traffic & Criminal Defense</span>
              </div>
              <p>
                Born in Kansas City. Raised in Richmond and Kearney, Missouri. Graduated suma cum laude from William Jewell College in Liberty, then law school. Chris has handled thousands of traffic and criminal matters across the KC metro and personally signs off on every case the firm files.
              </p>
              <ul className="creds">
                <li><span className="b">Recognition</span><span>Missouri Pro Bono Wall of Fame · AVVO client reviews honoree</span></li>
                <li><span className="b">Practice</span><span>Traffic, DWI, criminal defense, license reinstatement</span></li>
                <li><span className="b">Media</span><span>Featured on KCTV · Kansas City Star</span></li>
                <li><span className="b">Bar</span><span>Licensed in Missouri</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="attorney">
          <div className="portrait"><div className="ph">JW</div></div>
          <div>
            <div className="role">Partner</div>
            <h4>Jordan R. Watson</h4>
            <span className="post">Attorney & Partner</span>
          </div>
          <p>
            Experienced defense attorney representing clients in matters ranging from city ordinance violations to serious felonies. Recognized as a Super Lawyers Rising Star.
          </p>
          <ul className="creds">
            <li><span className="b">Practice</span><span>Traffic, criminal defense</span></li>
            <li><span className="b">Honors</span><span>Super Lawyers Rising Star</span></li>
          </ul>
        </div>

        <div className="attorney">
          <div className="portrait"><div className="ph">JH</div></div>
          <div>
            <div className="role">Partner</div>
            <h4>Justin Hunt</h4>
            <span className="post">Attorney & Partner</span>
          </div>
          <p>
            B.A. Political Science, University of Kansas (2011). J.D., Santa Clara University School of Law. Clients consistently note Justin's clear, down-to-earth approach.
          </p>
          <ul className="creds">
            <li><span className="b">Practice</span><span>Traffic, DWI, misdemeanor</span></li>
            <li><span className="b">Bar</span><span>Missouri · Kansas</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Reviews
const Reviews = () => {
  const reviews = [
    {
      stars: 5,
      text: 'Forgot I had a ticket past my court date — woke up to a warrant on a Friday afternoon. One call to Chris and one hour later the warrant was gone and the ticket was amended. My weekend was a lot less stressful.',
      name: 'Jake L.',
      src: 'Google',
      date: 'Mar 2026'
    },
    {
      stars: 5,
      text: 'I have a commercial driver\'s license and it is my lifeline. My ticket was reduced to a non-moving violation and I didn\'t even have to go to court or miss work. Chris is kind and does not fit the lawyer stereotype.',
      name: 'Michael S.',
      src: 'Google',
      date: 'Feb 2026'
    },
    {
      stars: 5,
      text: 'I was put at fault in an accident and given two tickets. They got one amended and brought down, and the other completely dismissed. They explain exactly what they plan to do and make sure everything is good for your court date.',
      name: 'Diana R.',
      src: 'Avvo',
      date: 'Jan 2026'
    },
  ];

  return (
    <section id="reviews" className="section" data-screen-label="Reviews">
      <div className="container">
        <div className="reviews-meta">
          <div>
            <div className="eyebrow"><span className="line"></span><span className="num">06</span>Reviews</div>
            <h2 className="h-section" style={{ marginTop: 16, maxWidth: '20ch' }}>
              What clients say after the case closes.
            </h2>
          </div>
          <div className="summary">
            <div>
              <div className="score">4.9</div>
            </div>
            <div className="score-meta">
              <span className="stars">★ ★ ★ ★ ★</span>
              <div><span style={{ fontFamily: 'var(--mono)', color: 'var(--ink)', fontWeight: 500 }}>1,500+</span> verified reviews</div>
              <div style={{ marginTop: 2 }}>Google · Avvo · Yelp</div>
            </div>
          </div>
        </div>

        <div className="reviews">
          {reviews.map((r, i) => (
            <article key={i} className="review">
              <div className="top">
                <span className="stars">{'★ '.repeat(r.stars).trim()}</span>
                <span className="date">{r.date}</span>
              </div>
              <blockquote>"{r.text}"</blockquote>
              <div className="who">
                <span className="name">— {r.name}</span>
                <span className="src">{r.src}</span>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <a href="https://maps.app.goo.gl/hbdWRMZJpxXk6BJWA" target="_blank" rel="noopener" className="btn btn-secondary">
            Read 1,500+ Google reviews <IconExternal size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
};

// Partnership strip
const Partnership = () => (
  <section className="section compact" data-screen-label="Partnership">
    <div className="container">
      <div className="partnership">
        <div className="seal" aria-hidden="true">KC</div>
        <div>
          <div className="lbl">Strategic partnership</div>
          <div className="name">KC Defense Counsel</div>
          <p>For criminal matters that fall outside our traffic focus — felonies, violent crimes, drug charges — we work alongside KC Defense Counsel. Same attorneys, broader coverage.</p>
        </div>
        <a href="https://kcdefensecounsel.com/" target="_blank" rel="noopener" className="link">
          Visit kcdefensecounsel.com <IconExternal size={14}/>
        </a>
      </div>
    </div>
  </section>
);

// Locations
const Locations = () => {
  const cities = [
    'Adrian', 'Archie', 'Belton', 'Blue Springs', 'Buckner', 'Butler', 'Claycomo',
    'Cleveland', 'Drexel', 'Ferrelview', 'Gladstone', 'Grain Valley', 'Grandview',
    'Greenwood', 'Houston Lake', 'Independence', 'Kansas City', 'Kearney',
    'Lake Lotawana', 'Lake Tapawingo', 'Lake Waukomis', 'Lake Winnebago', 'Lathrop',
    'Lawson', 'Lee\u2019s Summit', 'Liberty', 'North Kansas City', 'Oak Grove',
    'Oakview', 'Parkville', 'Peculiar', 'Platte City', 'Platte Woods', 'Plattsburg',
    'Pleasant Hill', 'Raymore', 'Raytown', 'Riverside', 'Smithville', 'Sugar Creek',
    'Warrensburg', 'Weatherby Lake', 'Weston'
  ];
  const counties = ['Bates', 'Cass', 'Clay', 'Jackson', 'Platte', 'Ray'];

  return (
    <section id="locations" className="section" data-screen-label="Locations">
      <div className="container">
        <div className="locations">
          <div>
            <div className="eyebrow"><span className="line"></span><span className="num">07</span>Locations served</div>
            <h2 className="h-section" style={{ marginTop: 16, marginBottom: 20, maxWidth: '20ch' }}>
              The Kansas City metro, and beyond.
            </h2>
            <p className="lede">
              We handle tickets across the Missouri side of the metro plus statewide matters through the Missouri Fine Collection Center and Missouri State Highway Patrol.
            </p>
            <div className="counties">
              <span className="lbl">Counties</span>
              {counties.map((c, i) => (
                <React.Fragment key={c}>
                  <a href={'#county-' + c.toLowerCase()}>{c} County</a>{i < counties.length - 1 ? ' · ' : ''}
                </React.Fragment>
              ))}
            </div>
            <div className="counties" style={{ marginTop: 16 }}>
              <span className="lbl">Statewide</span>
              Missouri Fine Collection Center · Missouri State Highway Patrol
            </div>
            <div style={{ marginTop: 28, fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
              Don't see your court? <a href="tel:18163988772" style={{ color: 'var(--navy)' }}>Call us</a> — we likely cover it.
            </div>
          </div>
          <div className="location-list">
            {cities.map((c) => (
              <a key={c} href={'#city-' + c.toLowerCase().replace(/[^a-z]/g, '-')}>{c}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA strip (dark)
const CTAStrip = () => (
  <section className="cta-strip" data-screen-label="CTA">
    <div className="cta-strip-inner">
      <div>
        <h2>Put the flashing lights behind you.</h2>
        <p className="cta-sub">Free 10-minute consultation. Most tickets quoted on the call.</p>
      </div>
      <div className="cta-actions">
        <a href="tel:18163988772" className="btn btn-primary btn-lg">
          <IconPhone size={16}/> (816) 398-8772
        </a>
        <a href="#contact" className="btn btn-secondary btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
          Request a quote
        </a>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer data-screen-label="Footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="name">speedingticket<span className="kc">kc</span></div>
          <p>A modern Kansas City traffic law firm. Flat fees. Electronic process. Most matters resolved without you ever stepping into court.</p>
          <div className="addr">
            <div className="block">
              <strong>Office · downtown</strong>
              2300 Main Street, Suite 900<br/>Kansas City, MO 64108
            </div>
            <div className="block">
              <strong>Office · Brookside</strong>
              6301 Rockhill Road, Suite 100C<br/>Kansas City, MO 64131
            </div>
          </div>
        </div>

        <div>
          <h5>Practice areas</h5>
          <ul>
            <li><a href="#services">Traffic tickets</a></li>
            <li><a href="#services">DWI / DUI</a></li>
            <li><a href="#services">Driving while suspended</a></li>
            <li><a href="#services">Driving record cleanup</a></li>
            <li><a href="#services">Traffic warrant</a></li>
            <li><a href="#services">CDL violations</a></li>
          </ul>
        </div>

        <div>
          <h5>Firm</h5>
          <ul>
            <li><a href="#attorneys">Attorneys</a></li>
            <li><a href="#process">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#">Awards & recognition</a></li>
            <li><a href="#">Blog & resources</a></li>
          </ul>
        </div>

        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:18163988772" style={{ fontFamily: 'var(--mono)' }}>(816) 398-8772</a></li>
            <li><a href="mailto:info@speedingticketkc.com">info@speedingticketkc.com</a></li>
            <li style={{ color: 'var(--ink-muted)', fontSize: 13 }}>Fax · 816-897-1090</li>
            <li style={{ color: 'var(--ink-muted)', fontSize: 13, marginTop: 8 }}>Available 24/7</li>
            <li><a href="https://kcdefensecounsel.com/" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>KC Defense Counsel <IconExternal size={12}/></a></li>
          </ul>
        </div>
      </div>

      <p className="footer-disclaimer">
        Speeding Ticket KC is a law firm. Communication of information by, in, to or through this website and your receipt of it does not create or constitute an attorney-client relationship. This site is not intended as a solicitation. This information is not intended to convey or constitute legal advice and is not a substitute for obtaining legal advice from a qualified attorney. The choice of a lawyer is an important decision and should not be based solely upon advertising.
      </p>

      <div className="footer-bottom">
        <span>© 2026 Speeding Ticket KC. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Disclaimer</a>
          <a href="#" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Sitemap</a>
        </div>
      </div>
      <p className="site-credit" style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--ink-muted)' }}>
        Designed in KCMO &mdash; <a href="https://simonlpaige.com" rel="noopener" style={{ color: 'var(--ink-muted)' }}>simonlpaige.com</a>
      </p>
    </div>
  </footer>
);

window.Attorneys = Attorneys;
window.Reviews = Reviews;
window.Partnership = Partnership;
window.Locations = Locations;
window.CTAStrip = CTAStrip;
window.Footer = Footer;
