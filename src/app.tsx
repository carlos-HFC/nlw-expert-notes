import { ChangeEvent, useEffect, useState } from "react";

import { NewNoteCard } from "@/components/new-note-card";
import { NoteCard } from "@/components/note-card";

import { Note } from "@/@types";
import logo from '@/assets/logo-nlw-expert.svg';

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    return JSON.parse(String(localStorage.getItem("notes"))) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    };

    setNotes(prev => ([newNote, ...prev]));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => note.id !== id);

    setNotes(notesArray);
  }

  const filteredNotes = notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img
        src={logo}
        alt="NLW Expert"
      />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(item => (
          <NoteCard
            key={item.id}
            note={item}
            onNoteDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
}