// Icons — Lucide-style, 1.5px stroke, line-only
const Icon = ({ d, size = 20, stroke = 1.5, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d}
  </svg>
);

const IconPhone = (props) => <Icon {...props} d={<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></>} />;

const IconArrow = (props) => <Icon {...props} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;

const IconShield = (props) => <Icon {...props} d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>} />;

const IconGavel = (props) => <Icon {...props} d={<><path d="m14 13-7.5 7.5a2.12 2.12 0 1 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></>} />;

const IconCar = (props) => <Icon {...props} d={<><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9l-3.5-.6-2.5-3.5c-.5-.6-1.2-1-2-1H8c-.8 0-1.5.4-2 1L3.5 10.5 1.5 11C.7 11.3 0 12 0 13v3c0 .6.4 1 1 1h2"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></>} />;

const IconLicense = (props) => <Icon {...props} d={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="12" y1="10" x2="18" y2="10"/><line x1="12" y1="14" x2="18" y2="14"/><circle cx="7" cy="12" r="2"/></>} />;

const IconBeer = (props) => <Icon {...props} d={<><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5C9.44 3.5 10 3 11 3s1.44.5 3 .5c.78 0 1.5-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/></>} />;

const IconCheck = (props) => <Icon {...props} d={<><polyline points="20 6 9 17 4 12"/></>} />;

const IconClock = (props) => <Icon {...props} d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />;

const IconStar = (props) => <Icon {...props} stroke={0} d={<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/></>} />;

const IconMapPin = (props) => <Icon {...props} d={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>} />;

const IconMail = (props) => <Icon {...props} d={<><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></>} />;

const IconClipboard = (props) => <Icon {...props} d={<><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><polyline points="9 14 11 16 15 12"/></>} />;

const IconCalendar = (props) => <Icon {...props} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />;

const IconScale = (props) => <Icon {...props} d={<><path d="M16 16.5c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L19 7"/><path d="M2 16.5c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L5 7"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="m3 7 6-2"/><path d="m15 5 6 2"/></>} />;

const IconLock = (props) => <Icon {...props} d={<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>} />;

const IconExternal = (props) => <Icon {...props} d={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>} />;

const IconAward = (props) => <Icon {...props} d={<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>} />;

const IconBuilding = (props) => <Icon {...props} d={<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/></>} />;

const IconSmartphone = (props) => <Icon {...props} d={<><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></>} />;

/* ---------- traffic-law extensions ---------- */
const IconTicket = (props) => <Icon {...props} d={<><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><line x1="13" y1="5" x2="13" y2="7"/><line x1="13" y1="11" x2="13" y2="13"/><line x1="13" y1="17" x2="13" y2="19"/></>} />;

const IconCone = (props) => <Icon {...props} d={<><path d="m4 20 6-15h4l6 15"/><path d="M2 20h20"/><path d="M7 13h10"/><path d="M6 16h12"/></>} />;

const IconAlert = (props) => <Icon {...props} d={<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />;

const IconStopSign = (props) => <Icon {...props} d={<><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>} />;

const IconSpeed = (props) => <Icon {...props} d={<><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 14v6"/><path d="M3 12a9 9 0 0 1 14.85-6.85"/><path d="M21 12a9 9 0 0 1-9 9"/><path d="m17.5 8.5-2 2"/></>} />;

const IconDoc = (props) => <Icon {...props} d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>} />;

const IconUser = (props) => <Icon {...props} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;

const IconSearch = (props) => <Icon {...props} d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;

const IconChevron = (props) => <Icon {...props} d={<><polyline points="9 18 15 12 9 6"/></>} />;

const IconMenu = (props) => <Icon {...props} d={<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>} />;

const IconDollar = (props) => <Icon {...props} d={<><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>} />;

const IconReceipt = (props) => <Icon {...props} d={<><path d="M4 2v20l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V2l-2 1.5L18 2l-2 1.5L14 2l-2 1.5L10 2 8 3.5 6 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></>} />;

const IconGlobe = (props) => <Icon {...props} d={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />;

const IconHandshake = (props) => <Icon {...props} d={<><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></>} />;

const IconShieldCheck = (props) => <Icon {...props} d={<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>} />;

const IconHelp = (props) => <Icon {...props} d={<><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />;

const IconMessage = (props) => <Icon {...props} d={<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>} />;

const IconChat = (props) => <Icon {...props} d={<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></>} />;

const IconPin = (props) => <Icon {...props} d={<><path d="M9 11V7a3 3 0 0 1 6 0v4"/><path d="M5 11h14l-1.5 9h-11z"/></>} />;

const IconBriefcase = (props) => <Icon {...props} d={<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>} />;

window.Icons = { IconPhone, IconArrow, IconShield, IconGavel, IconCar, IconLicense, IconBeer, IconCheck, IconClock, IconStar, IconMapPin, IconMail, IconClipboard, IconCalendar, IconScale, IconLock, IconExternal, IconAward, IconBuilding, IconSmartphone, IconTicket, IconCone, IconAlert, IconStopSign, IconSpeed, IconDoc, IconUser, IconSearch, IconChevron, IconMenu, IconDollar, IconReceipt, IconGlobe, IconHandshake, IconShieldCheck, IconHelp, IconMessage, IconChat, IconPin, IconBriefcase };
Object.assign(window, window.Icons);
