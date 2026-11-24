import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SyncManager } from './components/SyncManager';
import { BigEssayPage } from './pages/BigEssay';
import { DrillsPage } from './pages/Drills';
import { ExamPage } from './pages/Exam';
import { FormulaHandbookPage } from './pages/FormulaHandbook';
import { FormulaMistakesPage } from './pages/FormulaMistakes';
import { FormulaPracticePage } from './pages/FormulaPractice';
import { FormulaStatsPage } from './pages/FormulaStats';
import { FormulaTodayPage } from './pages/FormulaToday';
import { LearnPage } from './pages/Learn';
import { LibraryPage } from './pages/Library';
import { MistakesPage } from './pages/Mistakes';
import { PoliticsDrillsPage } from './pages/PoliticsDrills';
import { PoliticsHandbookPage } from './pages/PoliticsHandbook';
import { PoliticsMistakesPage } from './pages/PoliticsMistakes';
import { PoliticsPracticePage } from './pages/PoliticsPractice';
import { PoliticsTodayPage } from './pages/PoliticsToday';
import { ReviewPage } from './pages/Review';
import { SettingsPage } from './pages/Settings';
import { StatsPage } from './pages/Stats';
import { TodayPage } from './pages/Today';

export function App() {
  return (
    <HashRouter>
      <SyncManager />
      <Routes>
        <Route path="/" element={<Navigate to="/today" replace />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/big" element={<BigEssayPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/drills" element={<DrillsPage />} />
        <Route path="/mistakes" element={<MistakesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/formula" element={<Navigate to="/formula/today" replace />} />
        <Route path="/formula/today" element={<FormulaTodayPage />} />
        <Route path="/formula/practice" element={<FormulaPracticePage />} />
        <Route path="/formula/handbook" element={<FormulaHandbookPage />} />
        <Route path="/formula/mistakes" element={<FormulaMistakesPage />} />
        <Route path="/formula/stats" element={<FormulaStatsPage />} />

        <Route path="/politics" element={<Navigate to="/politics/today" replace />} />
        <Route path="/politics/today" element={<PoliticsTodayPage />} />
        <Route path="/politics/practice" element={<PoliticsPracticePage />} />
        <Route path="/politics/drills" element={<PoliticsDrillsPage />} />
        <Route path="/politics/handbook" element={<PoliticsHandbookPage />} />
        <Route path="/politics/mistakes" element={<PoliticsMistakesPage />} />

        <Route path="*" element={<Navigate to="/today" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
