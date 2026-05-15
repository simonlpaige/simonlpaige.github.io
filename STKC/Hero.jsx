// Hero — headline, supporting copy, stat strip, and contact form
const ContactForm = () => {
  const [state, setState] = React.useState({
    firstName: '', lastName: '', email: '', phone: '', ticketNumber: '', message: ''
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k) => (e) => {
    setState((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!state.firstName.trim()) e.firstName = 'Required';
    if (!state.lastName.trim()) e.lastName = 'Required';
    if (!state.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = 'Enter a valid email';
    if (!state.phone.trim()) e.phone = 'Required';
    else if (state.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone';
    if (!state.message.trim()) e.message = 'Tell us briefly what happened';
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-card" id="contact">
        <span className="corner">Request received</span>
        <div className="form-success">
          <div className="check"><IconCheck size={26} stroke={2}/></div>
          <h4>Thanks, {state.firstName}. We'll be in touch.</h4>
          <p>A Kansas City traffic attorney will contact you within one business hour — usually faster. If it's urgent, call <a href="tel:18163988772" style={{ fontFamily: 'var(--mono)', color: 'var(--navy)' }}>(816) 398-8772</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-card" id="contact" onSubmit={onSubmit} noValidate>
      <span className="corner">Free consultation</span>
      <h3>Tell us about your ticket</h3>
      <p className="sub">No pressure, no obligation. A traffic attorney will respond within one business hour.</p>

      <div className="field-row">
        <div className="field">
          <label>First name <span className="req">*</span></label>
          <input className={errors.firstName ? 'invalid' : ''} value={state.firstName} onChange={set('firstName')} autoComplete="given-name"/>
          <span className="err">{errors.firstName || ''}</span>
        </div>
        <div className="field">
          <label>Last name <span className="req">*</span></label>
          <input className={errors.lastName ? 'invalid' : ''} value={state.lastName} onChange={set('lastName')} autoComplete="family-name"/>
          <span className="err">{errors.lastName || ''}</span>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Email <span className="req">*</span></label>
          <input type="email" className={errors.email ? 'invalid' : ''} value={state.email} onChange={set('email')} autoComplete="email"/>
          <span className="err">{errors.email || ''}</span>
        </div>
        <div className="field">
          <label>Phone <span className="req">*</span></label>
          <input type="tel" className={errors.phone ? 'invalid' : ''} value={state.phone} onChange={set('phone')} placeholder="(816) 555-0100" autoComplete="tel"/>
          <span className="err">{errors.phone || ''}</span>
        </div>
      </div>

      <div className="field">
        <label>Ticket number <span className="muted" style={{ fontWeight: 400, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>(if you have it)</span></label>
        <input value={state.ticketNumber} onChange={set('ticketNumber')} placeholder="e.g. 23TR-12345"/>
      </div>

      <div className="field">
        <label>What happened? <span className="req">*</span></label>
        <textarea className={errors.message ? 'invalid' : ''} value={state.message} onChange={set('message')} placeholder="Briefly describe the citation — court, date, charge."/>
        <span className="err">{errors.message || ''}</span>
      </div>

      <button className="btn btn-primary btn-block btn-lg" type="submit">
        Request my free quote <IconArrow size={16}/>
      </button>

      <div className="or">or call now</div>
      <a href="tel:18163988772" className="call">
        <IconPhone size={18} className="ico"/> (816) 398-8772
      </a>

      <p className="disclaimer">
        Speeding Ticket KC is a law firm. Submitting this form does not establish an attorney-client relationship. We will discuss your options with you. All fields are kept confidential.
      </p>
    </form>
  );
};

const Hero = () => (
  <section className="hero" data-screen-label="Hero">
    <div className="container">
      <div className="hero-grid">
        <div>
          <div className="hero-rating">
            <span className="stars">★ ★ ★ ★ ★</span>
            <span className="count">1,500+ reviews</span>
            <span className="src">Google · Avvo</span>
          </div>

          <h1 className="h-display">
            Got a speeding ticket in Kansas City? <em>We handle it for <span className="price">$75</span>.</em>
          </h1>

          <p className="hero-sub">
            A Kansas City traffic attorney files your case, talks to the prosecutor, and works to keep points off your record — usually without you ever stepping into a courtroom.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
              Get my free quote <IconArrow size={16}/>
            </a>
            <a href="tel:18163988772" className="btn btn-secondary btn-lg">
              <IconPhone size={16}/> (816) 398-8772
            </a>
          </div>

          <div className="hero-meta">
            <div className="item">
              <div className="v"><span className="accent">$75</span></div>
              <div className="k">Flat fee · basic tickets</div>
            </div>
            <div className="item">
              <div className="v">No court</div>
              <div className="k">Most cases · we appear for you</div>
            </div>
            <div className="item">
              <div className="v">1 hour</div>
              <div className="k">Typical response time</div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm/>
        </div>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
window.ContactForm = ContactForm;
