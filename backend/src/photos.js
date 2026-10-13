const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const AVATARS_DIR = path.join(UPLOADS_DIR, 'avatars');
const PHOTO_MAX_BYTES = 2.5 * 1024 * 1024;
const PHOTO_PATTERN = /^data:image\/(jpeg|jpg|png|webp|gif);base64,([A-Za-z0-9+/=\r\n]+)$/;

class PhotoValidationError extends Error {}

function ensureUploadsDir() { fs.mkdirSync(AVATARS_DIR, { recursive: true }); }

function safeUserKey(userId) {
  const key = String(userId || '');
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(key)) throw new PhotoValidationError('Invalid account reference');
  return key;
}

function logCleanupWarning(error) { console.warn('Photo cleanup skipped:', error.message); }

function writeProfilePhoto(userId, dataUrl) {
  const key = safeUserKey(userId);
  const match = PHOTO_PATTERN.exec(String(dataUrl || ''));
  if (!match) throw new PhotoValidationError('Photo must be a JPEG, PNG, WEBP, or GIF image');
  const buffer = Buffer.from(match[2], 'base64');
  if (!buffer.length) throw new PhotoValidationError('Photo is empty');
  if (buffer.length > PHOTO_MAX_BYTES) throw new PhotoValidationError('Photo must be smaller than 2.5MB');
  const extension = match[1] === 'jpg' ? 'jpg' : match[1];
  const digest = createHash('sha1').update(buffer).digest('hex').slice(0, 10);
  const fileName = `${key}-${digest}.${extension}`;
  ensureUploadsDir();
  fs.writeFileSync(path.join(AVATARS_DIR, fileName), buffer);
  return { fileName, url: `/uploads/avatars/${fileName}` };
}

function discardProfilePhoto(fileName) {
  try { if (fileName) fs.rmSync(path.join(AVATARS_DIR, fileName), { force: true }); }
  catch (error) { logCleanupWarning(error); }
}

function pruneProfilePhotos(userId, keepFileName) {
  try {
    const key = safeUserKey(userId);
    const prefixes = [`${key}.`, `${key}-`];
    for (const file of fs.readdirSync(AVATARS_DIR)) {
      if (file === keepFileName) continue;
      if (prefixes.some((prefix) => file.startsWith(prefix))) fs.rmSync(path.join(AVATARS_DIR, file), { force: true });
    }
  } catch (error) { logCleanupWarning(error); }
}

function removeProfilePhoto(userId) {
  try {
    const key = safeUserKey(userId);
    const prefixes = [`${key}.`, `${key}-`];
    for (const file of fs.readdirSync(AVATARS_DIR)) {
      if (prefixes.some((prefix) => file.startsWith(prefix))) fs.rmSync(path.join(AVATARS_DIR, file), { force: true });
    }
  } catch (error) { logCleanupWarning(error); }
  return null;
}

module.exports = { UPLOADS_DIR, AVATARS_DIR, PhotoValidationError, ensureUploadsDir, writeProfilePhoto, discardProfilePhoto, pruneProfilePhotos, removeProfilePhoto };
