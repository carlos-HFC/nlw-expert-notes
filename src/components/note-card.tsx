import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { XIcon } from "lucide-react";

import { Note } from "@/@types";

interface NoteCardProps {
  note: Note;
  onNoteDeleted(id: string): void;
}

export function NoteCard(props: Readonly<NoteCardProps>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-800 p-5 flex flex-col gap-3 outline-none overflow-hidden relative text-left ring-slate-600 hover:ring-2 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">
          {props.note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 md:rounded-md md:max-w-[640px] w-full flex flex-col outline-none md:h-[60vh] overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none">
            <XIcon size={20} />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">
              {props.note.content}
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none group"
            onClick={() => props.onNoteDeleted(props.note.id)}
          >
            Desejar <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
