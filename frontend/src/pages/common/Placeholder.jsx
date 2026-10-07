import { Sparkles } from 'lucide-react'

export default function Placeholder({ title, description }) {
  return <div className="placeholder card"><div className="placeholder-icon"><Sparkles size={22} /></div><label>Next learning slice</label><h1>{title}</h1><p>{description}</p><div className="placeholder-note">No fake AI, score, or progress operation is presented here.</div></div>
}
