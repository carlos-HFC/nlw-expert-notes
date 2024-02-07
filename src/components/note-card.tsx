export function NoteCard() {
  return (
    <button className="rounded-md bg-slate-800 p-5 space-y-3 outline-none overflow-hidden relative text-left ring-slate-600 hover:ring-2 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">
        Há 2 dias
      </span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ex quisquam odit, delectus harum accusantium nihil fuga, doloribus ipsum assumenda quasi unde nesciunt? Eaque tenetur in perferendis dolor libero! Cupiditate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ex quisquam odit, delectus harum accusantium nihil fuga, doloribus ipsum assumenda quasi unde nesciunt? Eaque tenetur in perferendis dolor libero! Cupiditate.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  );
}
