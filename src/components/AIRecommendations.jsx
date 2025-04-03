import { useState } from 'react';
import axios from 'axios';

const AIRecommendations = () => {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    if (!preferences.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: `Recommend 3 movies based on these preferences: ${preferences}. 
                      For each movie, provide the title, year, a brief description, 
                      and why it matches the preferences. Format the response with 
                      clear headings for each movie.`
          }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      
      setRecommendations(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section matching Movie Finder */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">AI RECOMMENDATIONS</h1>
        <p className="text-blue-200 mb-1">2023 | Powered by OpenAI GPT</p>
        <p className="text-white italic">
          Get personalized movie suggestions based on your unique preferences.
        </p>
        <p className="text-white mt-2">
          Tell us what you like and our AI will find perfect matches for you!
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Tell Us Your Preferences</h2>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Example: 'I like sci-fi movies with strong female leads from the 2010s' or 'Recommend dark comedy films similar to The Big Lebowski'"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
        />
        <button 
          onClick={getRecommendations} 
          disabled={isLoading}
          className={`mt-4 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Generating Recommendations...' : 'Get AI Recommendations'}
        </button>
      </div>

      {/* Recommendations Display */}
      {recommendations && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Your Personalized Recommendations</h2>
          <div className="prose max-w-none">
            {recommendations.split('\n').map((line, i) => (
              <p key={i} className="mb-3">{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Sample Recommendations Section (static) */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase">POPULAR SEARCHES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Mind-bending sci-fi movies like Inception",
            "Oscar-winning dramas from the 2000s",
            "Underrated comedy films with female leads"
          ].map((search, index) => (
            <div 
              key={index} 
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg cursor-pointer transition-colors"
              onClick={() => setPreferences(search)}
            >
              <p className="font-medium">"{search}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;