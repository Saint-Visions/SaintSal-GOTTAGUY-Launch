import OpenAI from "openai";

let _openai: OpenAI | null = null;
let _azureOpenAI: OpenAI | null = null;
let _openaiAdmin: OpenAI | null = null;
let _openaiSearch: OpenAI | null = null;

// Standard OpenAI
export const getOpenAI = () => {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }
  return _openai;
};

// Azure OpenAI
export const getAzureOpenAI = () => {
  if (!_azureOpenAI) {
    _azureOpenAI = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY!,
      baseURL: process.env.AZURE_OPENAI_ENDPOINT!,
      defaultQuery: { "api-version": "2024-02-01" },
      defaultHeaders: {
        "api-key": process.env.AZURE_OPENAI_API_KEY!,
      },
    });
  }
  return _azureOpenAI;
};

// OpenAI Admin
export const getOpenAIAdmin = () => {
  if (!_openaiAdmin) {
    _openaiAdmin = new OpenAI({
      apiKey: process.env.OPENAI_ADMIN_KEY!,
    });
  }
  return _openaiAdmin;
};

// Search API
export const getOpenAISearch = () => {
  if (!_openaiSearch) {
    _openaiSearch = new OpenAI({
      apiKey: process.env.OPENAI_SEARCH_API_KEY!,
    });
  }
  return _openaiSearch;
};

// For backward compatibility
export const openai = getOpenAI;
export const azureOpenAI = getAzureOpenAI;
export const openaiAdmin = getOpenAIAdmin;
export const openaiSearch = getOpenAISearch;
