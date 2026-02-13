import { useState, useEffect } from 'react'
import './styles.css'

const missions = [
  { name: 'Big Smoke', status: 'completed', reward: '$10,000' },
  { name: 'Ryder', status: 'completed', reward: '$5,000' },
  { name: 'Sweet', status: 'active', reward: '$15,000' },
  { name: 'OG Loc', status: 'locked', reward: '???' },
  { name: 'Cesar', status: 'locked', reward: '???' },
]

const stats = [
  { label: 'Respect', value: 78, color: '#4ade80' },
  { label: 'Stamina', value: 65, color: '#fbbf24' },
  { label: 'Muscle', value: 45, color: '#ef4444' },
  { label: 'Fat', value: 20, color: '#f97316' },
  { label: 'Sex Appeal', value: 55, color: '#ec4899' },
  { label: 'Driving', value: 82, color: '#3b82f6' },
]

const territories = [
  { name: 'Grove Street', control: 100, gang: 'GSF' },
  { name: 'Idlewood', control: 75, gang: 'GSF' },
  { name: 'East Los Santos', control: 45, gang: 'Vagos' },
  { name: 'Glen Park', control: 60, gang: 'Ballas' },
  { name: 'Jefferson', control: 30, gang: 'GSF' },
]

function App() {
  const [time, setTime] = useState('12:00')
  const [stars, setStars] = useState(0)
  const [money, setMoney] = useState(125847)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const mins = now.getMinutes().toString().padStart(2, '0')
      setTime(`${hours}:${mins}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const starInterval = setInterval(() => {
      setStars(prev => (prev + 1) % 7)
    }, 3000)
    return () => clearInterval(starInterval)
  }, [])

  const handleMoneyClick = () => {
    setMoney(prev => prev + Math.floor(Math.random() * 1000))
  }

  return (
    <div className="min-h-screen bg-[#1a1205] text-[#f5e6c8] overflow-x-hidden relative">
      {/* Scanline overlay */}
      <div className="scanlines pointer-events-none fixed inset-0 z-50" />

      {/* Noise texture overlay */}
      <div className="noise pointer-events-none fixed inset-0 z-40" />

      {/* Vignette */}
      <div className="vignette pointer-events-none fixed inset-0 z-30" />

      {/* HUD - Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-20 p-3 md:p-4">
        <div className="flex justify-between items-start">
          {/* Time & Wanted Level */}
          <div className="flex flex-col gap-2">
            <div className="gta-text text-xl md:text-2xl text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
              {time}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map(star => (
                <span
                  key={star}
                  className={`text-lg md:text-xl transition-all duration-300 ${
                    star <= stars ? 'text-[#3b82f6] animate-pulse' : 'text-[#1a1205] opacity-30'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Money */}
          <button
            onClick={handleMoneyClick}
            className="gta-text text-xl md:text-3xl text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] hover:scale-110 transition-transform cursor-pointer"
          >
            ${money.toLocaleString()}
          </button>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed bottom-4 right-4 z-30 w-14 h-14 bg-[#4ade80] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)]"
      >
        <span className="gta-text text-[#1a1205] text-2xl">{menuOpen ? '×' : '☰'}</span>
      </button>

      {/* Navigation */}
      <nav className={`fixed z-20 transition-all duration-500 ${
        menuOpen
          ? 'inset-0 bg-[#1a1205]/95 flex items-center justify-center'
          : 'hidden md:flex md:fixed md:left-4 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-2'
      }`}>
        <div className={`flex ${menuOpen ? 'flex-col gap-4' : 'flex-col gap-2'}`}>
          {['home', 'missions', 'stats', 'turf'].map((section, i) => (
            <button
              key={section}
              onClick={() => { setActiveSection(section); setMenuOpen(false); }}
              style={{ animationDelay: `${i * 0.1}s` }}
              className={`gta-button px-4 py-3 md:px-6 md:py-3 text-sm md:text-base uppercase tracking-widest transition-all duration-300 ${
                activeSection === section
                  ? 'bg-[#4ade80] text-[#1a1205] shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                  : 'bg-[#2a2010] text-[#f5e6c8] hover:bg-[#3a3020]'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 md:px-20 md:ml-32">
        {activeSection === 'home' && (
          <section className="animate-fadeIn">
            {/* Hero */}
            <div className="relative mb-8 md:mb-16">
              <h1 className="graffiti-text text-5xl md:text-8xl lg:text-[10rem] leading-none text-center">
                <span className="text-[#4ade80] drop-shadow-[0_0_30px_rgba(74,222,128,0.6)]">Grove</span>
                <br />
                <span className="text-[#f5e6c8] drop-shadow-[0_0_20px_rgba(245,230,200,0.3)]">Street</span>
              </h1>
              <div className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 gta-text text-lg md:text-2xl text-[#fbbf24] tracking-[0.3em] md:tracking-[0.5em]">
                HOME
              </div>
            </div>

            {/* Tagline */}
            <div className="text-center mb-8 md:mb-16">
              <p className="gta-text text-xl md:text-3xl text-[#f97316] mb-4 spray-in">
                "All you had to do was follow the damn train, CJ!"
              </p>
              <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent mx-auto" />
            </div>

            {/* Character Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
              {[
                { name: 'CJ', role: 'Protagonist', color: '#4ade80' },
                { name: 'Sweet', role: 'Brother', color: '#4ade80' },
                { name: 'Big Smoke', role: '???', color: '#fbbf24' },
                { name: 'Ryder', role: '???', color: '#fbbf24' },
              ].map((char, i) => (
                <div
                  key={char.name}
                  className="gta-card p-4 md:p-6 text-center group cursor-pointer"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full border-4 flex items-center justify-center text-2xl md:text-4xl group-hover:scale-110 transition-transform"
                    style={{ borderColor: char.color, boxShadow: `0 0 20px ${char.color}40` }}
                  >
                    {char.name[0]}
                  </div>
                  <h3 className="gta-text text-lg md:text-xl mb-1" style={{ color: char.color }}>{char.name}</h3>
                  <p className="text-xs md:text-sm text-[#a09080]">{char.role}</p>
                </div>
              ))}
            </div>

            {/* Radio Stations */}
            <div className="gta-card p-4 md:p-8">
              <h2 className="gta-text text-xl md:text-2xl text-[#fbbf24] mb-4 md:mb-6 flex items-center gap-3">
                <span className="text-2xl md:text-3xl">📻</span> RADIO LOS SANTOS
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
                {['K-DST', 'Radio X', 'K-JAH', 'Master Sounds', 'Bounce FM', 'Playback FM'].map((station, i) => (
                  <button
                    key={station}
                    className="py-3 md:py-4 px-2 md:px-4 bg-[#2a2010] hover:bg-[#4ade80] hover:text-[#1a1205] transition-all duration-300 text-xs md:text-sm gta-text truncate"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {station}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'missions' && (
          <section className="animate-fadeIn">
            <h2 className="graffiti-text text-4xl md:text-6xl text-[#4ade80] mb-6 md:mb-8">MISSIONS</h2>
            <div className="space-y-3 md:space-y-4">
              {missions.map((mission, i) => (
                <div
                  key={mission.name}
                  className="gta-card p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                      mission.status === 'completed' ? 'bg-[#4ade80]' :
                      mission.status === 'active' ? 'bg-[#fbbf24] animate-pulse' : 'bg-[#3a3020]'
                    }`} />
                    <span className="gta-text text-lg md:text-xl">{mission.name}</span>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 ml-7 sm:ml-0">
                    <span className={`text-xs md:text-sm uppercase ${
                      mission.status === 'completed' ? 'text-[#4ade80]' :
                      mission.status === 'active' ? 'text-[#fbbf24]' : 'text-[#5a5040]'
                    }`}>{mission.status}</span>
                    <span className="text-[#f97316] gta-text text-sm md:text-base">{mission.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'stats' && (
          <section className="animate-fadeIn">
            <h2 className="graffiti-text text-4xl md:text-6xl text-[#4ade80] mb-6 md:mb-8">STATS</h2>
            <div className="grid gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="gta-card p-4 md:p-6"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex justify-between mb-2 md:mb-3">
                    <span className="gta-text text-base md:text-lg">{stat.label}</span>
                    <span className="gta-text text-base md:text-lg" style={{ color: stat.color }}>{stat.value}%</span>
                  </div>
                  <div className="h-3 md:h-4 bg-[#2a2010] rounded-sm overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 stat-bar"
                      style={{
                        width: `${stat.value}%`,
                        backgroundColor: stat.color,
                        boxShadow: `0 0 10px ${stat.color}80`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'turf' && (
          <section className="animate-fadeIn">
            <h2 className="graffiti-text text-4xl md:text-6xl text-[#4ade80] mb-6 md:mb-8">TERRITORY</h2>
            <div className="grid gap-3 md:gap-4">
              {territories.map((territory, i) => (
                <div
                  key={territory.name}
                  className="gta-card p-4 md:p-6 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: territory.gang === 'GSF'
                        ? 'linear-gradient(90deg, #4ade80 0%, transparent 100%)'
                        : territory.gang === 'Ballas'
                        ? 'linear-gradient(90deg, #a855f7 0%, transparent 100%)'
                        : 'linear-gradient(90deg, #fbbf24 0%, transparent 100%)',
                      width: `${territory.control}%`
                    }}
                  />
                  <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="gta-text text-lg md:text-xl mb-1">{territory.name}</h3>
                      <span className={`text-xs md:text-sm ${
                        territory.gang === 'GSF' ? 'text-[#4ade80]' :
                        territory.gang === 'Ballas' ? 'text-[#a855f7]' : 'text-[#fbbf24]'
                      }`}>{territory.gang}</span>
                    </div>
                    <div className="gta-text text-2xl md:text-3xl" style={{
                      color: territory.gang === 'GSF' ? '#4ade80' :
                             territory.gang === 'Ballas' ? '#a855f7' : '#fbbf24'
                    }}>
                      {territory.control}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 p-2 md:p-3 text-center">
        <p className="text-[10px] md:text-xs text-[#5a5040] tracking-wide">
          Requested by @trustnoneisakey · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App