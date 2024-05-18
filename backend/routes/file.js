const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { MetaTransferService, DataTransferService } = require("../services/filetransferservice");
const { PatientService } = require("../services/patientservice");
const { FileService } = require("../services/fileservice");
const { ServiceAttrService } = require("../services/serviceattrservice");
const { Literals } = require("../literal/literals");

// Multer 객체 생성 및 파일 업로드 미들웨어 설정 (TEST 용도입니다)
const upload = MetaTransferService.initMulter();
const uploadMiddleware = upload.single("filekey"); // filekey는 클라이언트에서 전송한 파일의 키 값, single()은 하나의 파일만 업로드할 때 사용 (array()는 여러 파일 업로드)

router.post("/upload/data", uploadMiddleware, (req, res) => {
    console.log(req.file);
    res.json({ header: req.file });
});

// SSE 엔드포인트 연결 설정, 다운로드 진행도(%) 확인
router.get("/getDownloadProgress", (req, res) => {
    try {
        DataTransferService.getDownloadProgress(req, res)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// ZIP 파일 생성 및 다운로드, 
router.post("/download", async (req, res) => {
    try {
        await DataTransferService.downloadZip(req.body)
        res.status(200).send(Literals.FTP.ZIP_SUCCESS);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 중복 필터 검색 용 API(기본형, 병원 추가예정)
router.post("/search", async (req, res) => {
    try {
        const result = await FileService.getAllMetaDataByQuery(await ServiceAttrService.getServiceByName(req.body.name), req.body.attributes);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 임시 DB 채우기 용 API(추후 삭제예정)
router.post("/addPatients", async (req, res) => {
    try {
        await PatientService.addPatients(req.body);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/addFiles", async (req, res) => {
    try {
        await FileService.addFiles(req.body);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;