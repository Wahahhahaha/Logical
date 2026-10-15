import './CloudAnimation.css'
import './GroundDecor.css'

export default function AuthScenery() {
  return <>
    <div className="auth-clouds" aria-hidden="true"><div className="cloud cloud-1"></div><div className="cloud cloud-2"></div><div className="cloud cloud-3"></div><div className="cloud cloud-4"></div><div className="cloud cloud-5"></div><div className="cloud cloud-6"></div><div className="cloud cloud-7"></div><div className="cloud cloud-8"></div><div className="cloud cloud-9"></div></div>
    <svg className="auth-landscape" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true"><path className="landscape-back" d="M0 142C120 72 228 154 354 106C492 54 604 158 738 101C842 57 927 91 1000 66V360H0Z" /><path className="landscape-middle" d="M0 198C132 133 246 202 382 166C526 128 632 211 764 158C866 117 941 164 1000 134V360H0Z" /><path className="landscape-front" d="M0 257C108 213 222 253 346 229C493 201 612 276 742 224C851 181 930 239 1000 207V360H0Z" /></svg>
    <div className="auth-nature" aria-hidden="true"><span className="grass grass-1" /><span className="grass grass-2" /><span className="grass grass-3" /><span className="grass grass-4" /><span className="grass grass-5" /><span className="grass grass-6" /><span className="grass grass-7" /><span className="grass grass-8" /><span className="flower flower-1 flower-yellow" /><span className="flower flower-2 flower-pink" /><span className="flower flower-3 flower-white" /><span className="flower flower-4 flower-yellow" /><span className="flower flower-5 flower-pink" /><span className="flower flower-6 flower-white" /></div>
  </>
}
