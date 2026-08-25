import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaGlobe,
  FaCheck,
} from 'react-icons/fa';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useSettings,
  type Language,
} from '../../context/SettingsContext';

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {

  const {
    darkMode,
    language,
    toggleDarkMode,
    setLanguage,
  } = useSettings();

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const languageRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        languageRef.current &&
        !languageRef.current.contains(
          event.target as Node
        )
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };

  }, []);

  const translations = {

    en: {
      title: 'Employee Payroll Management',
      dark: 'Dark Mode',
      language: 'Language',
      admin: 'Admin',
      english: 'English',
      hindi: 'हिंदी (Hindi)',
      chinese: '中文 (Chinese)',
    },

    hi: {
      title: 'कर्मचारी पेरोल प्रबंधन',
      dark: 'डार्क मोड',
      language: 'भाषा',
      admin: 'एडमिन',
      english: 'English',
      hindi: 'हिंदी',
      chinese: '中文 (Chinese)',
    },

    zh: {
      title: '员工薪资管理',
      dark: '深色模式',
      language: '语言',
      admin: '管理员',
      english: 'English',
      hindi: '印地语',
      chinese: '中文',
    },
  };

  const text = translations[language];

  const changeLanguage = (
    value: Language
  ) => {

    setLanguage(value);
    setLanguageOpen(false);
  };

  return (
    <header className="top-navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <button
          type="button"
          className="mobile-menu-btn d-md-none"
          onClick={onMenuClick}
        >
          <FaBars />
        </button>

        <h5>{text.title}</h5>

      </div>


      {/* RIGHT */}

      <div className="navbar-right">

        {/* DARK MODE */}

        <button
          type="button"
          className="dark-mode-control"
          onClick={toggleDarkMode}
        >

          {darkMode ? (
            <FaSun className="dark-mode-icon" />
          ) : (
            <FaMoon className="dark-mode-icon" />
          )}

          <span className="dark-mode-label">
            {text.dark}
          </span>

          <span
            className={`toggle-switch ${
              darkMode ? 'toggle-active' : ''
            }`}
          >
            <span className="toggle-circle" />
          </span>

        </button>


        {/* LANGUAGE */}

        <div
          className="language-wrapper"
          ref={languageRef}
        >

          <button
            type="button"
            className="language-control"
            onClick={() =>
              setLanguageOpen(
                previous => !previous
              )
            }
          >

            <FaGlobe />

            <span>{text.language}</span>

            <FaChevronDown
              className={
                languageOpen
                  ? 'rotate-arrow'
                  : ''
              }
            />

          </button>


{languageOpen && (
  <div className="language-dropdown">

    {/* English */}

    <button
      type="button"
      className={`language-option ${
        language === 'en' ? 'selected' : ''
      }`}
      onClick={() => changeLanguage('en')}
    >
      <span className="language-flag">
        🇬🇧
      </span>

      <span className="language-name">
        {text.english}
      </span>

      {language === 'en' && (
        <FaCheck className="language-check" />
      )}
    </button>


    {/* Hindi */}

    <button
      type="button"
      className={`language-option ${
        language === 'hi' ? 'selected' : ''
      }`}
      onClick={() => changeLanguage('hi')}
    >
      <span className="language-flag">
        🇮🇳
      </span>

      <span className="language-name">
        {text.hindi}
      </span>

      {language === 'hi' && (
        <FaCheck className="language-check" />
      )}
    </button>


    {/* Chinese */}

    <button
      type="button"
      className={`language-option ${
        language === 'zh' ? 'selected' : ''
      }`}
      onClick={() => changeLanguage('zh')}
    >
      <span className="language-flag">
        🇨🇳
      </span>

      <span className="language-name">
        {text.chinese}
      </span>

      {language === 'zh' && (
        <FaCheck className="language-check" />
      )}
    </button>

  </div>
)}

        </div>


        {/* NOTIFICATION */}

        <button
          type="button"
          className="notification-btn"
        >

          <FaBell />

          <span className="notification-badge">
            3
          </span>

        </button>


        {/* ADMIN */}

        <div className="profile-area">

          <div className="profile-icon">
            <FaUserCircle />
          </div>

          <span className="profile-name">
            {text.admin}
          </span>

          <FaChevronDown
            className="profile-arrow"
          />

        </div>

      </div>

    </header>
  );
}

export default Navbar;