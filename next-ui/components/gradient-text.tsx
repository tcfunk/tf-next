export default function GradientText({ children }) {
  return (
    <span className="bg-gradient-to-br from-orange-500 to-amber-400 bg-clip-text text-transparent">{children}</span>
  )
}