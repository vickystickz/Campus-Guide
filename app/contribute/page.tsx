"use client";

import React, { useState } from "react";
import ContributeForm, {
  ContributeFormData,
} from "@/component/Navigation/sections/ContributeForm";
import ContributeSuccess from "@/component/Navigation/sections/contribute/ContributeSuccess";
import { submitCampusContribution } from "@/lib/api/services";

export default function ContributePage() {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [submittedFormData, setSubmittedFormData] =
    useState<ContributeFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Toggle between real API and mock mode (change to false when backend is fully ready)
  const USE_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

  const handleContributeSubmit = async (formData: ContributeFormData) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("🚀 Submitting contribution...", formData);

      // Call the API
      const response = await submitCampusContribution(formData, USE_MOCK_MODE);

      console.log("✅ Submission successful:", response);

      // Set the data for success page
      setSubmittedFormData(formData);
      setShowSuccessPage(true);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit contribution. Please try again.";
      console.error("❌ Submission failed:", err);
      setError(errorMessage);

      // Show error but keep form visible for retry
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccessPage && submittedFormData) {
    return (
      <ContributeSuccess
        userName={submittedFormData.contributorName || "youthmapperX"}
        userEmail={submittedFormData.email || "youthmapperX@gmail.com"}
      />
    );
  }

  return (
    <>
      <ContributeForm
        onClose={() => (window.location.href = "/")}
        onSubmit={handleContributeSubmit}
        isLoading={isLoading}
        error={error}
      />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">
              Submitting your contribution...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {USE_MOCK_MODE ? "🧪 (Mock Mode)" : "Sending to API..."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
