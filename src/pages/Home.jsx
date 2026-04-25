import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const features = [
  { icon: '🤖', title: 'AI Credit Scoring',      desc: 'Alternative data — transactions, GST, digital payments — scored in seconds.' },
  { icon: '⚡', title: 'Fast Approval',           desc: 'Apply online and get a decision in under 5 minutes, 24/7.' },
  { icon: '📊', title: 'Repayment Tracking',      desc: 'Live EMI schedule with one-click payment marking and overdue alerts.' },
  { icon: '🔒', title: 'Secure & Transparent',    desc: 'Bank-grade security. No hidden fees. Clear breakdown of every charge.' },
  { icon: '📱', title: 'Digital Payments',        desc: 'UPI auto-debit, bank transfer, or cash — repay the way you work.' },
  { icon: '🌍', title: 'Financial Inclusion',     desc: 'Built for underserved entrepreneurs with no formal credit history.' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Why MicroFin?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-emerald-700 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
