# Backend Architecture & Authentication – Summary

## 1. Unified Role-Based Endpoint

Replaced multiple role-specific endpoints with a single `/my-courses` endpoint.  
The backend determines the response based on the authenticated user’s role.  

**Impact:** Improves API consistency and maintainability.

---

## 2. Secure Token Management

Implemented a hybrid token strategy:

- **Access Token:** Stored in LocalStorage for frontend usage (e.g., decoding user info)
- **Refresh Token:** Stored in HttpOnly cookies for security (protected from XSS)

**Impact:** Ensures both usability and security.

---

## 3. CORS and Cookie Configuration (NestJS)

- Enabled `credentials: true` in CORS  
- Allowed specific frontend origin  
- Used `@Res({ passthrough: true })` to set cookies without breaking NestJS response flow  

**Impact:** Ensures proper cookie handling across domains.

---

## 4. Axios Interceptors with Silent Refresh

- Implemented automatic token refresh on `401` errors  
- Used `isRefreshing` flag to prevent duplicate refresh calls  
- Built a failed request queue to retry pending requests after token refresh  

**Impact:** Prevents user logout and ensures seamless API execution.

---

## 5. Public vs Private API Separation

- Created `publicApi` (no interceptors) for login/register  
- Created `apiClient` (with interceptors) for protected routes  

**Impact:** Avoids unnecessary refresh logic and keeps code clean.

---

## 6. Standardized API Responses

Implemented a global response format:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "...",
  "data": {}
}
