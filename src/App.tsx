import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <header className="p-6 bg-blue-600 text-white shadow-md dark:bg-blue-800">
              <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-3xl font-bold">E-commerce Product Catalog</h1>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-300 rounded-lg dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </header>

            {/* Main Content */}
            <main className="p-4 container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="p-4 bg-gray-800 text-white text-center dark:bg-gray-700">
              <p>&copy; 2024 E-commerce. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;