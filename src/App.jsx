import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, About } from './pages';

const App = () => {
  //////////////////////////////////////////////////////////////
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
