import GradientText from "./gradient-text";

export default function SectionHeader({ type }) {
  return (
    <div className="mb-6 text-3xl font-serif">
      <div className="flex items-baseline justify-between">
        <div>Recent <GradientText>{type}</GradientText></div>
        {/* <div className="text-sm">View all {type} →</div> */}
      </div>
    </div>
  )
}