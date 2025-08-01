import { useEffect, useState } from 'react';
import api from '../services/axio.interceptor';

type Project = { id: string; name: string };
type Header = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function HeaderEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [headers, setHeaders] = useState<Header[]>([]);
  const [selectedHeaderId, setSelectedHeaderId] = useState('');
  const [headerContent, setHeaderContent] = useState('');
  const [isNewHeader, setIsNewHeader] = useState(false);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data));
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      api.get(`/projects/${selectedProjectId}/headers`).then((res) => setHeaders(res.data));
      setSelectedHeaderId('');
      setHeaderContent('');
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedHeaderId) {
      api.get(`/headers/${selectedHeaderId}`).then((res) => {
        setHeaderContent(res.data.content);
        setIsNewHeader(false);
      });
    }
  }, [selectedHeaderId]);

  const handleSave = async () => {
    if (isNewHeader) {
      await api.post(`/projects/${selectedProjectId}/headers`, {
        content: headerContent,
      });
    } else {
    console.log("entra qui");
      await api.put(`/headers/${selectedHeaderId}`, {
        content: headerContent,
      });
    }

    const res = await api.get(`/projects/${selectedProjectId}/headers`);
    setHeaders(res.data);
    setIsNewHeader(false);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={selectedHeaderId}
          onChange={(e) => setSelectedHeaderId(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select header</option>
          {headers.map((h) => (
            <option key={h.id} value={h.id}>
              {h.id}
            </option>
          ))}
        </select>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => {
            setSelectedHeaderId('');
            setHeaderContent('');
            setIsNewHeader(true);
          }}
        >
          New Header
        </button>
      </div>

      <textarea
        className="w-full min-h-[300px] border p-4 font-mono rounded resize-y"
        placeholder="Escribe el contenido del header..."
        value={headerContent}
        onChange={(e) => setHeaderContent(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </div>
  );
}
