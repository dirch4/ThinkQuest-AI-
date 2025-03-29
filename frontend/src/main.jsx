import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { backend } from 'declarations/backend';
import '/index.css';

const App = () => {
  const [topic, setTopic] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleGenerateQuestion = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const response = await backend.generateQuestion(topic);
      setGeneratedQuestion(response);
      setEvaluationResult('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!inputAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const response = await backend.evaluateAnswer(inputAnswer);
      setEvaluationResult(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 p-6">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">AI Quiz Generator</h1>

        <div className="mb-6">
          <label className="block text-white text-lg mb-2">Enter a topic:</label>
          <input 
            type="text" 
            className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-white placeholder-white/50"
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            placeholder="Example: Blockchain History"
            disabled={isGenerating}
          />
          <button 
            className="w-full mt-3 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:bg-blue-300"
            onClick={handleGenerateQuestion} 
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Question'}
          </button>
        </div>

        {generatedQuestion && (
          <div className="mb-6 p-4 bg-white/20 text-white rounded-lg border border-white/30">
            <strong>Question:</strong>
            <p>{generatedQuestion}</p>
          </div>
        )}
        
        {generatedQuestion && (
          <div className="mb-6">
            <label className="block text-white text-lg mb-2">Your Answer:</label>
            <input 
              type="text" 
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-white placeholder-white/50"
              value={inputAnswer} 
              onChange={(e) => setInputAnswer(e.target.value)} 
              placeholder="Type your answer here"
              disabled={isEvaluating}
            />
            <button 
              className="w-full mt-3 py-3 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:bg-green-300"
              onClick={handleEvaluateAnswer} 
              disabled={isEvaluating}
            >
              {isEvaluating ? 'Evaluating...' : 'Evaluate Answer'}
            </button>
          </div>
        )}
        
        {evaluationResult && (
          <div className="p-4 bg-white/20 text-white rounded-lg border border-white/30 text-center">
            <strong>Evaluation Result:</strong>
            <p>{evaluationResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
