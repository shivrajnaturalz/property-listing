# Shivraj Propertiz — Application Architecture

## Purpose

Shivraj Propertiz is a scheme and plot-listing platform for land developers. Owners create a scheme once, maintain plot-level inventory, and publish a shareable public listing. Buyers browse the verified layout and send enquiries.

## Existing repository

The repository currently contains separate React applications for:
- `admin/`: owner/admin interface (Create React App, React 18, React Router, Axios, Redux, Material UI)
- `client/`: public buyer website (Create React App, React 18, React Router, Axios, Redux, Material UI)
- `mobile/`: React Native/Expo app scaffold

The repository currently has no confirmed production backend or database. Do not treat the UI prototypes or demo data as persisted/live data.

## Recommended architecture

- **Admin web:** keep the existing React app and visual direction (forest green, lime and orange).
- **Public web:** keep the existing React app and approved compact listing/map layout.
- **API:** Node.js + Express REST API, versioned under `/api/v1`.
- **Database:** MongoDB with Mongoose schemas and indexes.
- **Authentication:** short-lived access token plus secure refresh/session strategy; password hashes only; role-based authorization on every protected API.
- **Media:** object storage for site photos, videos, and documents; store URLs and metadata in MongoDB, not file bytes.
- **Maps:** store verified coordinates and location labels; map provider integration is a separate configuration.
- **Mobile:** reuse the same API; do not maintain separate business rules in the mobile client.

## Data model

### User
- `_id`
- `name`
- `phone` (normalized; unique where appropriate)
- `email` (optional)
- `passwordHash` (never store plaintext passwords)
- `role`: `admin | owner | agent`
- `ownerId` (for users belonging to an owner account, if applicable)
- `isActive`
- timestamps

### Scheme
- `_id`, `slug` (unique public URL identifier)
- `ownerId` (User reference; required)
- `name`, `developerNames[]`, `description`
- `location`: `village`, `taluka`, `district`, `state`, `postalCode`
- `map`: `latitude`, `longitude`, `mapUrl`, `locationVerifiedAt`
- `connectivity[]`: `label`, `roadName`, `distanceKm`, `roadType`, `verifiedAt`
- `roads`: `internalRoadWidthM`, `approachRoadWidthM`, `widthUnit`, `notes`
- `media[]`: `kind`, `url`, `caption`, `sortOrder`
- `documents[]`: `kind`, `url`, `displayName`, `verifiedAt`
- `status`: `draft | review | published | archived`
- `publishedAt`, timestamps

### Plot
- `_id`, `schemeId` (Scheme reference; required)
- `plotNumber`, `sizeGuntha`, `areaSqM` (if verified)
- `frontageM`, `depthM` (optional; only when sourced from the site plan)
- `priceInr` (integer rupees; optional until confirmed)
- `status`: `available | hold | sold`
- `shape` / `layoutCoordinates` (optional geometry from the actual plan; do not infer from a decorative grid)
- `notes`, timestamps
- Unique index on `schemeId + plotNumber`

### Enquiry
- `_id`, `schemeId`, `plotId` (optional)
- `buyerName`, `phone`, `message`
- `source`: `public_page | whatsapp | phone | other`
- `status`: `new | contacted | qualified | closed`
- `assignedTo` (optional User reference), timestamps

### AuditLog
- `_id`, `actorId`, `schemeId`, `entityType`, `entityId`
- `action`, `before`, `after`, timestamp
- Record changes to plot status, pricing, publishing, and document verification.

## API outline

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/owner/schemes`
- `POST /api/v1/owner/schemes`
- `GET /api/v1/owner/schemes/:schemeId`
- `PATCH /api/v1/owner/schemes/:schemeId`
- `POST /api/v1/owner/schemes/:schemeId/publish`
- `GET /api/v1/owner/schemes/:schemeId/plots`
- `POST /api/v1/owner/schemes/:schemeId/plots`
- `PATCH /api/v1/owner/plots/:plotId`
- `GET /api/v1/public/schemes/:slug`
- `GET /api/v1/public/schemes/:slug/plots`
- `POST /api/v1/public/schemes/:slug/enquiries`
- `GET /api/v1/owner/enquiries`
- `PATCH /api/v1/owner/enquiries/:enquiryId`

All owner endpoints must check authorization and ownership server-side. Public endpoints must return only published schemes and safe public fields. Add validation, rate limiting, pagination, and audit logging.

## Implementation order

1. Inspect and stabilize existing admin/public React screens.
2. Add the Express API and environment configuration.
3. Add Mongoose models, validation, indexes, and seed data marked as demo.
4. Implement authentication and owner-scoped authorization.
5. Connect Create Scheme and Plot Layout screens to the API.
6. Build secure media uploads and verified map/road fields.
7. Connect public scheme pages and buyer enquiry capture.
8. Add tests, deployment configuration, backups, and security review.

## Data integrity and property-information safeguards

- Treat all sample project names, developer names, prices, distances, road widths, plot counts, and availability as unverified demo data until confirmed by the owner.
- Never describe a scheme as approved or legally verified unless the relevant documents and verification status support that claim.
- A conceptual plot grid is not a survey drawing and must not be used to establish legal plot boundaries.
- Keep document verification state separate from a file being uploaded.
- Do not expose owner-only documents or buyer phone numbers through public endpoints.
- Never commit database credentials, API keys, or production secrets to Git.
