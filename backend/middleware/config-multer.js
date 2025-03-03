const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// 📁 Dossier de destination des images et musiques
const coverImagesDir = path.join(__dirname, '../coverImages');
const musicFilesDir = path.join(__dirname, '../musicFile');

// Vérifier si les dossiers existent, sinon les créer
if (!fs.existsSync(coverImagesDir)) fs.mkdirSync(coverImagesDir, { recursive: true });
if (!fs.existsSync(musicFilesDir)) fs.mkdirSync(musicFilesDir, { recursive: true });

// 🔹 Configuration du stockage avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, coverImagesDir); // Images dans coverImages
    } else if (file.mimetype.startsWith('audio')) {
      cb(null, musicFilesDir); // Musiques dans musicFile
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// 🔹 Filtrer les fichiers acceptés (images et musiques uniquement)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', // Pour les images
    'audio/mpeg', 'audio/mp3', 'audio/wav' // Pour les musiques
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non autorisé'), false);
  }
};

// 🔹 Initialisation de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limite à 100 Mo
});

// 🔹 Middleware pour optimiser les images avec Sharp après upload
const optimizeImage = async (req, res, next) => {
  if (!req.files || !req.files.coverImage) {
    return next(); // Si aucune image, continuer
  }

  try {
    const fileArray = req.files.coverImage;

    for (const originalFile of fileArray) {
      const filePath = path.join(coverImagesDir, originalFile.filename);
      const outputFilePath = path.join(coverImagesDir, `optimized-${originalFile.filename}`);

      // Traitement Sharp
      await sharp(filePath)
        .resize(800, 600, { fit: 'inside' })
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(outputFilePath);

      // Supprime l'original et remplace le chemin
      fs.unlinkSync(filePath);
      originalFile.filename = `optimized-${originalFile.filename}`;
    }

    next();
  } catch (error) {
    console.error('Erreur lors de l’optimisation de l’image:', error);
    next(error);
  }
};

module.exports = { upload, optimizeImage };
