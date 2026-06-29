import { usePortfolio } from '../context/PortfolioContext'

export default function Footer() {
  const { footer } = usePortfolio()
  const text = footer.text.replace('{year}', String(new Date().getFullYear()))

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] px-[9%] py-10 text-center">
      <p className="text-sm text-ash">{text}</p>
    </footer>
  )
}
