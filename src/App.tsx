import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from './core/hooks/useTheme';
import Layout from './ui/layout/Layout';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import ListView from './pages/ListView';
import NotFound from './pages/NotFound';

function App() {
  const { theme } = useTheme();

  // Apply theme class to html element
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="board" element={<KanbanBoard />} />
        <Route path="list" element={<ListView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;