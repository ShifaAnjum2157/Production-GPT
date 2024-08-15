import express from 'express';
import { chatbotController, generateParagraphController, generateTextController, jsConverterController, scifiImageController, summarizeTextController } from '../controllers/openaiController.js'
const router = express.Router();
router.post('/generate-text', generateTextController);
router.post('/summarize-text', summarizeTextController);
router.post('/generate-paragraph', generateParagraphController);
router.post('/chat', chatbotController);
router.post('/convert-js', jsConverterController);
router.post('/generate-scifi-image', scifiImageController);

export default router