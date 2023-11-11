import GradientText from "./gradient-text";

export default function ContactForm() {
  return (
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="sm:w-7/12">
        <div className="text-3xl font-bold">
          Subscribe to my <GradientText>Newsletters</GradientText> 
        </div>
        <p className="mt-3 text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero
        esse non molestias eos excepturi, inventore atque cupiditate.</p>
      </div>
      <div className="w-full sm:w-5/12">
        <form action=" " className="flex rounded-full bg-slate-800 px-4 py-2 focus-within:ring-2 focus-within:ring-amber-600 hover:ring-2 hover:ring-amber-600">
          <input type="text" className="w-full appearance-none bg-slate-800 focus:outline-none" />
          <button className="ml-2 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 px-3 py-1 text-sm font-medium ring-0 hover:from-orange-700 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/50 text-slate-700 hover:text-slate-50 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}