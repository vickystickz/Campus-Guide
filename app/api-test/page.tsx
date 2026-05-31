"use client";

import React, { useState } from "react";
import {
  healthCheck,
  getUniversities,
  createUniversity,
} from "@/lib/api/services";

export default function APITestPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, status: "✅" | "❌", message: string) => {
    setResults((prev) => [
      ...prev,
      { test, status, message, time: new Date() },
    ]);
  };

  const clearResults = () => setResults([]);

  const testHealthCheck = async () => {
    setLoading(true);
    try {
      const response = await healthCheck();
      addResult(
        "Health Check",
        "✅",
        `API is online: ${JSON.stringify(response)}`,
      );
    } catch (error: any) {
      addResult("Health Check", "❌", error?.message || "Failed to connect");
    }
    setLoading(false);
  };

  const testGetUniversities = async () => {
    setLoading(true);
    try {
      const response = await getUniversities();
      addResult(
        "Get Universities",
        "✅",
        `Retrieved ${response?.length || 0} universities: ${JSON.stringify(response).substring(0, 100)}...`,
      );
    } catch (error: any) {
      addResult("Get Universities", "❌", error?.message || "Failed to fetch");
    }
    setLoading(false);
  };

  const testCreateUniversity = async () => {
    setLoading(true);
    try {
      const testData = {
        name: `Test University ${Date.now()}`,
        location: "Test Location",
        address: "123 Test Street",
        city: "Test City",
        country: "Nigeria",
        latitude: 6.5244,
        longitude: 3.3957,
      };

      const response = await createUniversity(testData);
      addResult(
        "Create University",
        "✅",
        `Created university: ${JSON.stringify(response).substring(0, 100)}...`,
      );
    } catch (error: any) {
      addResult(
        "Create University",
        "❌",
        error?.response?.data?.message || error?.message || "Failed to create",
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Campus Guide API Test
          </h1>
          <p className="text-gray-600">
            Test whether the backend API is working correctly
          </p>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Run Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testHealthCheck}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              🏥 Health Check
            </button>
            <button
              onClick={testGetUniversities}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              📚 Get Universities
            </button>
            <button
              onClick={testCreateUniversity}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              ➕ Create Test University
            </button>
            <button
              onClick={clearResults}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition col-span-full"
            >
              🗑️ Clear Results
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Results ({results.length})
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tests run yet. Click a button above to start testing!
            </p>
          ) : (
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`border-l-4 p-4 rounded ${
                    result.status === "✅"
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {result.status} {result.test}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 break-all">
                        {result.message}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 ml-2">
                      {result.time.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🔍 What Each Test Does
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Health Check:</strong> Verifies the API server is running
            </li>
            <li>
              <strong>Get Universities:</strong> Retrieves all universities from
              the database
            </li>
            <li>
              <strong>Create Test University:</strong> Attempts to create a new
              university entry
            </li>
          </ul>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>API Endpoint:</strong>{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_CAMPUS_GUIDE_API_URL}
            </code>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Mode:</strong>{" "}
            <span
              className={
                process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
                  ? "text-yellow-600 font-semibold"
                  : "text-green-600 font-semibold"
              }
            >
              {process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
                ? "🧪 Mock Mode (Using Local Responses)"
                : "🚀 Production Mode (Real Backend)"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
