# Adonai NGO Website - Deployment Manifest

**Generated**: 2026-05-11T15:59:44.499Z  
**Application**: Adonai NGO Website  
**Version**: 0.0.1  
**Destination**: public_html/adonai-ngo-app

---

## Verification Status

**Integrity Check**: ✅ PASSED

---

## Mandatory Files Checklist

| # | File Path | Size | SHA-256 Checksum |
|---|-----------|------|------------------|
| 1 | `server.js` | 38.09 KB | `3ac50ccb241f77f206f08092503739dc...` |
| 2 | `package.json` | 3.29 KB | `a024964eeabcc759d304e87c19ead2f7...` |
| 3 | `.env` | 0.84 KB | `bfd7e285a344eadb6ed07fa3d6758c7a...` |
| 4 | `.env.example` | 0.57 KB | `c8a9dccffa10a38405f1551d1d0527f7...` |
| 5 | `migrate.js` | 2.22 KB | `6798f55cb20d219a87d0cba6da499734...` |
| 6 | `seed-admin.js` | 3.13 KB | `dfeb5b264446f6a4b4150c7f5e4ab3ba...` |
| 7 | `package-lock.json` | 300.75 KB | `22602da2253f81e40e56eda9bf0a84a0...` |
| 8 | `db/config.js` | 1.7 KB | `fba546245545f0f0d7c523ad9724f2e2...` |
| 9 | `db/db.test.js` | 1.68 KB | `ba16bec7d4290c1850eacb5fa03b32c3...` |
| 10 | `db/index.js` | 1.75 KB | `b1e9e835a2aa522dbecaf37b5f9cf8aa...` |
| 11 | `db/repositories/UserRepository.js` | 1.56 KB | `eee5c8c076e89095adc1e627ec97bae2...` |
| 12 | `dist/assets/index-BMg9TpBU.js` | 984.49 KB | `6746a29a209d94e570e276f3907889a2...` |
| 13 | `dist/assets/index-C7Thbfpo.css` | 158.67 KB | `aac98d13e2366b669db35b81f67a7a84...` |
| 14 | `dist/index.html` | 0.51 KB | `ab8f61fb635a0faf80600e0b74b0e917...` |

---

## cPanel Permission Requirements

| Type | Permissions | Notes |
|------|-------------|-------|
| Directories | 755 | Read/Write/Execute for owner, Read/Execute for group/world |
| Files | 644 | Read/Write for owner, Read for group/world |
| .env | 600 | Read/Write only for owner (sensitive) |
| Ownership | user:nobody | cPanel standard |

---

## Environment Variables Required

Create a `.env` file in the deployment folder with:

```env
# Database Connection
DATABASE_URL=postgresql://adonaian_adonaian:-n&lJP]@.9S)1TD_@localhost:5432/adonaian_adonaian

# Server Configuration
PORT=3000
NODE_ENV=production

# JWT Secret
JWT_SECRET=your-secure-random-secret-key-here

# API URL
VITE_API_URL=https://yourdomain.com
```

---

## Upload Instructions

1. Upload **all files** from `cpanel-deployment-package/` to `public_html/adonai-ngo-app/`
2. Set permissions as specified above
3. Register in cPanel Application Manager with startup file `server.js`
4. Run `npm install` via Application Manager
5. Restart application

---

## File Details (Complete Checksums)

### `server.js`
- **Size**: 39005 bytes (38.09 KB)
- **SHA-256**: `3ac50ccb241f77f206f08092503739dc2655c9f8569adde092d386a3db79dcf9`
- **Last Modified**: 2026-05-05T13:59:37.743Z

### `package.json`
- **Size**: 3366 bytes (3.29 KB)
- **SHA-256**: `a024964eeabcc759d304e87c19ead2f7f6c3c9cd0d06d7226c77102a58a9554c`
- **Last Modified**: 2026-05-05T12:50:58.152Z

### `.env`
- **Size**: 860 bytes (0.84 KB)
- **SHA-256**: `bfd7e285a344eadb6ed07fa3d6758c7a61f3547bddb683acb962951783db2971`
- **Last Modified**: 2026-05-08T10:01:49.115Z

### `.env.example`
- **Size**: 583 bytes (0.57 KB)
- **SHA-256**: `c8a9dccffa10a38405f1551d1d0527f79e4087d0b3770bd0cdf730ce37284d19`
- **Last Modified**: 2026-05-04T19:01:08.854Z

### `migrate.js`
- **Size**: 2270 bytes (2.22 KB)
- **SHA-256**: `6798f55cb20d219a87d0cba6da4997345bb8b0a02b56f0e9529129d4230cc215`
- **Last Modified**: 2026-05-05T12:40:30.490Z

### `seed-admin.js`
- **Size**: 3206 bytes (3.13 KB)
- **SHA-256**: `dfeb5b264446f6a4b4150c7f5e4ab3ba1d9979c359a653522c0b25c45c06cbe3`
- **Last Modified**: 2026-05-05T09:40:56.501Z

### `package-lock.json`
- **Size**: 307968 bytes (300.75 KB)
- **SHA-256**: `22602da2253f81e40e56eda9bf0a84a01933ea53efc9528e0862d3fa104bd0bf`
- **Last Modified**: 2026-05-05T12:50:59.639Z

### `db/config.js`
- **Size**: 1745 bytes (1.7 KB)
- **SHA-256**: `fba546245545f0f0d7c523ad9724f2e2c965234281dc1f14b5329a4adf670d82`
- **Last Modified**: 2026-05-05T12:37:13.304Z

### `db/db.test.js`
- **Size**: 1717 bytes (1.68 KB)
- **SHA-256**: `ba16bec7d4290c1850eacb5fa03b32c314af164c13e330f5fe1237f6c7d80944`
- **Last Modified**: 2026-05-05T12:40:12.101Z

### `db/index.js`
- **Size**: 1791 bytes (1.75 KB)
- **SHA-256**: `b1e9e835a2aa522dbecaf37b5f9cf8aa32dfd44371ab1bdf664b37016ed4bce9`
- **Last Modified**: 2026-05-05T12:37:21.219Z

### `db/repositories/UserRepository.js`
- **Size**: 1602 bytes (1.56 KB)
- **SHA-256**: `eee5c8c076e89095adc1e627ec97bae263175ad422bc18d2f39290a1aceb5e27`
- **Last Modified**: 2026-05-05T12:37:43.338Z

### `dist/assets/index-BMg9TpBU.js`
- **Size**: 1008122 bytes (984.49 KB)
- **SHA-256**: `6746a29a209d94e570e276f3907889a2443c64dc326bde29a59e35fed2454683`
- **Last Modified**: 2026-05-05T13:47:31.543Z

### `dist/assets/index-C7Thbfpo.css`
- **Size**: 162477 bytes (158.67 KB)
- **SHA-256**: `aac98d13e2366b669db35b81f67a7a8480c47a69890de07ecf99e9374bfc658c`
- **Last Modified**: 2026-05-05T13:47:31.536Z

### `dist/index.html`
- **Size**: 519 bytes (0.51 KB)
- **SHA-256**: `ab8f61fb635a0faf80600e0b74b0e91700785c7ddb7b2c0f78260fc92a59ee96`
- **Last Modified**: 2026-05-05T13:47:31.542Z

