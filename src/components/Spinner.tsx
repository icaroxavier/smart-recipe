import { FaSpinner } from 'react-icons/fa'

interface SpinnerProps {
  size?: number
}

export function Spinner({ size = 24 }: SpinnerProps) {
  return <FaSpinner size={size} className="animate-spin" />
}
