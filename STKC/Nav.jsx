const Brand = () => (
  <a href="#" className="brand-stack" aria-label="Speeding Ticket KC home">
    <span className="top">speedingticket<span style={{ color: 'var(--brass)' }}>kc</span></span>
    <span className="sub">Traffic law · Kansas City</span>
  </a>
);

const UrgentBar = () => (
  <div className="urgent-bar">
    <div className="urgent-bar-inner">
      <div className="left">
        <span className="dot"></span>
        <span><span className="hide-sm">Free 10-minute consultation. </span>Available 24/7.</span>
      </div>
      <div className="right">
        <a href="mailto:info@speedingticketkc.com" className="hide-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <IconMail size={14}/> info@speedingticketkc.com
        </a>
        <a href="tel:18163988772" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <IconPhone size={14}/> (816) 398-8772
        </a>
      </div>
    </div>
  </div>
);

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLink = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="nav-inner">
        <Brand/>
        <nav className="nav-links">
          <a href="#services" onClick={(e) => onLink(e, 'services')}>Practice areas</a>
          <a href="#process" onClick={(e) => onLink(e, 'process')}>How it works</a>
          <a href="#pricing" onClick={(e) => onLink(e, 'pricing')}>Pricing</a>
          <a href="#attorneys" onClick={(e) => onLink(e, 'attorneys')}>Attorneys</a>
          <a href="#reviews" onClick={(e) => onLink(e, 'reviews')}>Reviews</a>
          <a href="#locations" onClick={(e) => onLink(e, 'locations')}>Locations</a>
        </nav>
        <div className="nav-right">
          <a href="tel:18163988772" className="nav-phone">
            <IconPhone size={16}/> <span className="num">(816) 398-8772</span>
          </a>
          <a href="style-guide.html" className="nav-phone" style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }} title="Brand & style guide">
            Style guide
          </a>
          <a href="#contact" onClick={(e) => onLink(e, 'contact')} className="btn btn-primary btn-sm">
            Free consultation
          </a>
        </div>
      </div>
    </header>
  );
};

window.Brand = Brand;
window.UrgentBar = UrgentBar;
window.Nav = Nav;
