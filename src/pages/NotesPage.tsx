import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Save, Download, Edit, Eye, Shield } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Button from '../components/Button';

export default function NotesPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSupported, setIsSupported] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setNoteContent(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access to use voice recording.');
      }
      setIsRecording(false);
      setIsPaused(false);
    };

    recognitionRef.current = recognition;

    const savedNote = localStorage.getItem('notesprout-note');
    if (savedNote) {
      setNoteContent(savedNote);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('notesprout-note', noteContent);
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [noteContent]);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const extractHashtags = (text: string): string[] => {
    const hashtagRegex = /#[\w]+/g;
    return text.match(hashtagRegex) || [];
  };

  const downloadNote = () => {
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notesprout-note-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hashtags = extractHashtags(noteContent);

  const rightButtons = (
    <>
      <Button variant="secondary" size="sm" className="gap-2">
        <Shield size={16} />
        <span className="hidden sm:inline">Privacy</span>
      </Button>
      <Button size="sm">Sign Up Free</Button>
    </>
  );

  return (
    <AppLayout
      appTitle="NoteSprout"
      appSubtitle="Voice-to-text note taking made simple"
      rightButtons={rightButtons}
      maxWidth="xl"
    >
      <div className="space-y-8">
        <div className="text-center py-8 border-b border-gray-200">
          <h2 className="mb-4">Voice-to-Text Note Taking Made Simple</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capture your thoughts instantly. Speak naturally, and NoteSprout converts your words into organized, searchable notes with automatic hashtags.
          </p>
        </div>

        {!isSupported && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800">
              Voice recording is not supported in your browser. Please try Chrome, Edge, or Safari.
            </p>
          </div>
        )}

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center">
            <button
              onClick={isRecording ? (isPaused ? resumeRecording : pauseRecording) : startRecording}
              disabled={!isSupported}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording && !isPaused
                  ? 'bg-green-500 hover:bg-green-600 animate-pulse'
                  : 'bg-vexto-blue hover:bg-vexto-blue/90'
              } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording && !isPaused ? (
                <Mic size={40} className="text-white" />
              ) : (
                <MicOff size={40} className="text-white" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {!isRecording && (
              <Button onClick={startRecording} disabled={!isSupported} className="gap-2">
                <Mic size={20} />
                Start Recording
              </Button>
            )}

            {isRecording && !isPaused && (
              <Button onClick={pauseRecording} variant="secondary" className="gap-2">
                Pause
              </Button>
            )}

            {isPaused && (
              <Button onClick={resumeRecording} className="gap-2">
                Resume
              </Button>
            )}

            {isRecording && (
              <Button onClick={stopRecording} variant="secondary" className="gap-2">
                Stop
              </Button>
            )}
          </div>

          {isRecording && !isPaused && (
            <div className="text-sm text-green-600 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              Recording...
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth ${
                  viewMode === 'edit'
                    ? 'bg-vexto-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth ${
                  viewMode === 'preview'
                    ? 'bg-vexto-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Eye size={16} />
                Preview
              </button>
            </div>

            <div className="flex items-center gap-4">
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Save size={14} />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
              <Button
                onClick={downloadNote}
                variant="secondary"
                size="sm"
                disabled={!noteContent}
                className="gap-2"
              >
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>

          {viewMode === 'edit' ? (
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Start speaking or type your notes here..."
              className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vexto-blue resize-none"
            />
          ) : (
            <div className="min-h-[400px] p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div className="prose max-w-none">
                {noteContent || 'No content yet. Start recording or typing to create your note.'}
              </div>
            </div>
          )}

          {hashtags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Hashtags:</span>
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-vexto-blue/10 text-vexto-blue rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Privacy First</h3>
            <p className="text-sm text-gray-600">
              All notes stored locally in your browser. No server uploads.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mic size={24} className="text-vexto-blue" />
            </div>
            <h3 className="font-medium mb-2">Easy Voice Input</h3>
            <p className="text-sm text-gray-600">
              Natural speech recognition with real-time transcription.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Save size={24} className="text-purple-600" />
            </div>
            <h3 className="font-medium mb-2">Smart Features</h3>
            <p className="text-sm text-gray-600">
              Auto-save, hashtag extraction, and easy export options.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
