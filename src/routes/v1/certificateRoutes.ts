import express from "express";
import { protect } from "../../middleware/auth";
import getCertificates from "../../controllers/certificate/getCertificates";
import createCertificate from "../../controllers/certificate/createCertificate";
import getCertificate from "../../controllers/certificate/getCertificate";
import updateCertificate from "../../controllers/certificate/updateCertificate";
import deleteCertificate from "../../controllers/certificate/deleteCertificate";
const router = express.Router();

// Import all of our routes
router.route("/").get(getCertificates);

router.use(protect()); // protect all routes below this line
router.route("/").post(createCertificate);
router.route("/:id").get(getCertificate).put(updateCertificate).delete(deleteCertificate);

export default router;
