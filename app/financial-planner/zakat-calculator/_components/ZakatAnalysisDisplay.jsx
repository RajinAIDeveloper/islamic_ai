import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const getDetailedZakatAnalysis = async (assets, totalAssets, nisabThreshold, currency) => {
  try {
    // Filter out zero-value assets and format for the prompt
    const filteredAssets = Object.entries(assets).reduce((acc, [key, value]) => {
      if (value > 0) acc[key] = value;
      return acc;
    }, {});

    // Handle case when no assets are provided
    if (Object.keys(filteredAssets).length === 0) {
      return {
        generalAdvice: {
          mainAdvice: "Please provide your asset details to calculate Zakat.",
          specialConsiderations: []
        },
        calculations: { assetBreakdown: {} },
        islamicReferences: { primaryHadith: "", scholarlyOpinions: [] }
      };
    }

    const prompt = {
      "model": "google/gemini-2.0-flash-thinking-exp:free",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `Analyze these zakat assets according to Islamic principles:\n` +
                `Assets: ${JSON.stringify(filteredAssets)}\n` +
                `Total Assets Value: ${totalAssets}\n` +
                `Nisab Threshold: ${nisabThreshold}\n` +
                `Currency: ${currency.code}\n\n` +
                `Provide response in this JSON format:\n` +
                `{
                  "general_advice": string,
                  "special_considerations": string[],
                  "calculations": {
                    "assetBreakdown": {
                      [asset: string]: {
                        "explanation": string,
                        "amount": number,
                        "rate": number,
                        "zakatDue": number
                      }
                    }
                  },
                  "islamic_references": {
                    "primary_hadith": string,
                    "scholarly_opinions": string[]
                  }
                }`
            }
          ]
        }
      ]
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prompt)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.status}`);
    }

    const data = await response.json();
    return parseGeminiResponse(data);
  } catch (error) {
    console.error('Error in Zakat analysis:', error);
    return {
      generalAdvice: {
        mainAdvice: "Error processing analysis. Please check your input and try again.",
        specialConsiderations: []
      },
      calculations: { assetBreakdown: {} },
      islamicReferences: { primaryHadith: "", scholarlyOpinions: [] }
    };
  }
};

const parseGeminiResponse = (response) => {
  try {
    const firstChoice = response.choices?.[0];
    if (!firstChoice) throw new Error('No choices in response');
    
    const content = firstChoice.message?.content;
    if (!content) throw new Error('Empty response content');

    let jsonString = content;
    if (content.startsWith('```json')) {
      jsonString = content.match(/```json([\s\S]*?)```/)?.[1] || content;
    }

    const parsedData = JSON.parse(jsonString);
    
    // Validate and normalize response structure
    return {
      generalAdvice: {
        mainAdvice: parsedData.general_advice || "Standard zakat guidelines apply",
        specialConsiderations: Array.isArray(parsedData.special_considerations) 
          ? parsedData.special_considerations 
          : []
      },
      calculations: {
        assetBreakdown: parsedData.calculations?.assetBreakdown || {}
      },
      islamicReferences: {
        primaryHadith: parsedData.islamic_references?.primary_hadith || "",
        scholarlyOpinions: Array.isArray(parsedData.islamic_references?.scholarly_opinions)
          ? parsedData.islamic_references.scholarly_opinions
          : []
      }
    };
  } catch (error) {
    console.error('Error parsing API response:', error);
    return {
      generalAdvice: {
        mainAdvice: "Error processing analysis. Please check your input and try again.",
        specialConsiderations: []
      },
      calculations: { assetBreakdown: {} },
      islamicReferences: { primaryHadith: "", scholarlyOpinions: [] }
    };
  }
};

const ZakatAnalysisDisplay = ({ analysis, currency }) => {
  if (!analysis) return null;

  const hasCalculations = Object.keys(analysis.calculations.assetBreakdown).length > 0;
  const hasReferences = analysis.islamicReferences.primaryHadith || 
                      analysis.islamicReferences.scholarlyOpinions.length > 0;

  return (
    <div className="space-y-6">
      {/* General Advice Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">General Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{analysis.generalAdvice.mainAdvice}</p>
          {analysis.generalAdvice.specialConsiderations.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Special Considerations:</h4>
              <ul className="list-disc pl-6 mt-2">
                {analysis.generalAdvice.specialConsiderations.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calculations Section */}
      {hasCalculations && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Calculation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analysis.calculations.assetBreakdown).map(([asset, calc]) => (
                calc.amount > 0 && (
                  <div key={asset} className="border-b pb-4">
                    <h4 className="font-medium capitalize">{asset}</h4>
                    <p className="text-gray-600 mt-1">{calc.explanation}</p>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>{currency.symbol}{calc.amount?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Zakat Rate:</span>
                        <span>{calc.rate}%</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Zakat Due:</span>
                        <span>{currency.symbol}{calc.zakatDue?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Islamic References Section */}
      {hasReferences && (
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            <div className="mt-2">
              {analysis.islamicReferences.primaryHadith && (
                <>
                  <p className="font-medium">Primary Reference:</p>
                  <p className="italic mt-1">{analysis.islamicReferences.primaryHadith}</p>
                </>
              )}
              {analysis.islamicReferences.scholarlyOpinions.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium">Scholarly Opinions:</p>
                  <ul className="list-disc pl-6 mt-2">
                    {analysis.islamicReferences.scholarlyOpinions.map((opinion, index) => (
                      <li key={index} className="text-gray-600">{opinion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ZakatAnalysisDisplay;