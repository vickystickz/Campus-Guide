import { DRIVING, WALKING, CYCLING } from "./urls";
import {
  mapboxDirectionInstance,
  photonInstance,
  campusGuideInstance,
} from "./axios-instance";

export const getRoute = async (
  start: { lat: number; lon: number },
  end: { lat: number; lon: number },
  routeProfile: "driving" | "walking" | "cycling",
) => {
  const ROUTE_PROFILE =
    routeProfile === "driving"
      ? DRIVING
      : routeProfile === "walking"
        ? WALKING
        : CYCLING;

  try {
    const response = await mapboxDirectionInstance.get(
      `${ROUTE_PROFILE}${start.lon},${start.lat};${end.lon},${end.lat}?geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
    );
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    console.log(error);
  }
};

export const getPlace = async (query: string, limit = 5, viewbox?: string) => {
  try {
    const response = await photonInstance.get(
      `?q=${query}&limit=${limit}${viewbox ? `&bbox=${viewbox}` : ""}&lang=en`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Campus Guide API Services

// Health Check
export const healthCheck = async () => {
  try {
    const response = await campusGuideInstance.get("/health");
    return response.data;
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
};

// Universities
export const createUniversity = async (data: {
  name: string;
  location: string;
  [key: string]: any;
}) => {
  try {
    const response = await campusGuideInstance.post("/university", data);
    return response.data;
  } catch (error) {
    console.error("Create university error:", error);
    throw error;
  }
};

export const getUniversities = async () => {
  try {
    const response = await campusGuideInstance.get("/university");
    return response.data;
  } catch (error) {
    console.error("Get universities error:", error);
    throw error;
  }
};

export const getUniversityById = async (id: string) => {
  try {
    const response = await campusGuideInstance.get(`/university/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get university error:", error);
    throw error;
  }
};

export const updateUniversity = async (id: string, data: any) => {
  try {
    const response = await campusGuideInstance.put(`/university/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update university error:", error);
    throw error;
  }
};

export const deleteUniversity = async (id: string) => {
  try {
    const response = await campusGuideInstance.delete(`/university/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete university error:", error);
    throw error;
  }
};

// Submissions
export const createSubmission = async (data: {
  universityId: string;
  [key: string]: any;
}) => {
  try {
    const response = await campusGuideInstance.post("/submission", data);
    return response.data;
  } catch (error) {
    console.error("Create submission error:", error);
    throw error;
  }
};

export const getSubmissions = async () => {
  try {
    const response = await campusGuideInstance.get("/submission");
    return response.data;
  } catch (error) {
    console.error("Get submissions error:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  try {
    const response = await campusGuideInstance.get(`/submission/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get submission error:", error);
    throw error;
  }
};

export const updateSubmission = async (id: string, data: any) => {
  try {
    const response = await campusGuideInstance.put(`/submission/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update submission error:", error);
    throw error;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const response = await campusGuideInstance.delete(`/submission/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete submission error:", error);
    throw error;
  }
};

export const parseBoundary = async (boundary: any) => {
  try {
    const response = await campusGuideInstance.post(
      "/submission/parse-boundary",
      boundary,
    );
    return response.data;
  } catch (error) {
    console.error("Parse boundary error:", error);
    throw error;
  }
};

// Development mode helper - Mock submission for testing without backend
export const createSubmissionMock = async (data: {
  institution: string;
  country: string;
  address: string;
  chapterName: string;
  mappingPercentage: number;
  contributorName?: string;
  email?: string;
  phoneNumber?: string;
  roleInChapter?: string;
  campusBoundary?: File | null;
  campusPicture?: File | null;
  [key: string]: any;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    institution: data.institution,
    country: data.country,
    address: data.address,
    chapterName: data.chapterName,
    mappingPercentage: data.mappingPercentage,
    contributorName: data.contributorName,
    email: data.email,
    status: "pending_review",
    createdAt: new Date().toISOString(),
    message: "Submission saved successfully (Mock Mode)",
  };
};

// Wrapper function that chooses between real API and mock
export const submitCampusContribution = async (
  data: {
    institution: string;
    country: string;
    address: string;
    chapterName: string;
    mappingPercentage: number;
    contributorName?: string;
    email?: string;
    phoneNumber?: string;
    roleInChapter?: string;
    campusBoundary?: File | null;
    campusPicture?: File | null;
  },
  useMockMode: boolean = false,
) => {
  try {
    if (useMockMode) {
      console.log("📝 [DEV MODE] Simulating submission:", data);
      return await createSubmissionMock(data);
    }

    // Real API submission with FormData for file uploads
    const formData = new FormData();
    formData.append("institution", data.institution);
    formData.append("country", data.country);
    formData.append("address", data.address);
    formData.append("chapterName", data.chapterName);
    formData.append("mappingPercentage", data.mappingPercentage.toString());
    formData.append("contributorName", data.contributorName || "");
    formData.append("email", data.email || "");
    formData.append("phoneNumber", data.phoneNumber || "");
    formData.append("roleInChapter", data.roleInChapter || "");

    if (data.campusBoundary) {
      formData.append("campusBoundary", data.campusBoundary);
    }
    if (data.campusPicture) {
      formData.append("campusPicture", data.campusPicture);
    }

    const response = await campusGuideInstance.post("/submission", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Submission saved to API:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Submission error:", error);
    throw error;
  }
};

/**
 * SECURITY NOTE FOR BACKEND IMPLEMENTATION:
 *
 * ⚠️ REQUIRED SERVER-SIDE VALIDATIONS (DO NOT RELY ON CLIENT-SIDE ONLY):
 *
 * 1. FILE SIZE VALIDATION:
 *    - KML/GeoJSON: Max 10MB
 *    - Images: Max 5MB
 *    - Reject any file exceeding limits
 *
 * 2. FILE TYPE VALIDATION:
 *    - Check ACTUAL file content (magic bytes), NOT just MIME type
 *    - KML: Must be valid XML, start with <?xml or <kml>
 *    - GeoJSON: Must be valid JSON with proper GeoJSON structure
 *    - Images: Use library like `jimp` or `sharp` to validate
 *
 * 3. FILENAME SANITIZATION:
 *    - Remove/reject path traversal attempts (../, ..\\)
 *    - Store files with UUID names, not user-provided names
 *    - Example: rename "my boundary (1).kml" to "550e8400-e29b-41d4-a716-446655440000.kml"
 *
 * 4. VIRUS/MALWARE SCANNING:
 *    - Consider integrating ClamAV or VirusTotal API
 *    - Scan all uploaded files before storage
 *
 * 5. RATE LIMITING:
 *    - Limit submissions per IP/email: max 5 per hour
 *    - Prevent spam attacks
 *
 * 6. STORAGE SECURITY:
 *    - Store uploads in isolated directory outside web root
 *    - Use HTTPS only
 *    - Set proper file permissions (read-only for app)
 *    - Consider encrypting sensitive files
 *
 * 7. KML-SPECIFIC VALIDATION:
 *    - Parse KML and validate structure
 *    - Check for XXE (XML External Entity) attacks
 *    - Use XML parsing library with XXE protection disabled
 *    - Validate coordinates are within valid ranges
 *
 * 8. IMAGE-SPECIFIC VALIDATION:
 *    - Strip EXIF data (location, camera info)
 *    - Reject animated images if not needed
 *    - Validate image dimensions (min 100x100, max 5000x5000)
 *
 * 9. DATABASE VALIDATION:
 *    - Use parameterized queries (prepared statements)
 *    - Validate all string inputs against XSS
 *    - Sanitize HTML if user content is displayed
 *
 * 10. LOGGING:
 *    - Log all file uploads with timestamp, user, file name
 *    - Log failed validations for security auditing
 *    - Monitor for suspicious patterns
 */
