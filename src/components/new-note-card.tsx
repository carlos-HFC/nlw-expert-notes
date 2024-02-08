import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated(content: string): void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard(props: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === '') setShouldShowOnboarding(true);
  }

  function handleSaveNote() {
    if (content === "") return;

    props.onNoteCreated(content);

    setContent("");
    setShouldShowOnboarding(true);

    toast.success("Nota criada com sucesso!");
  }

  function handleStartRecording() {
    const isSpeechRecognitionApiAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionApiAvailable) {
      return toast.error("Infelizmente o seu navegador não asuporta a API de gravação!");
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((prev, current) => {
        return prev.concat(current[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    speechRecognition?.stop();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left outline-none ring-slate-600 hover:ring-2 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 md:rounded-md md:max-w-[640px] w-full flex flex-col outline-none md:h-[60vh] overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none">
            <XIcon size={20} />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>

            {shouldShowOnboarding
              ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:text-lime-500">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:text-lime-500">utilize apenas texto</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  value={content}
                  onChange={handleContentChange}
                />
              )}
          </div>

          {isRecording
            ? (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none hover:text-slate-100"
                onClick={handleStopRecording}
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500"
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}