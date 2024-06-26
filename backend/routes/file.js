const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { MetaTransferService, DataTransferService } = require("../services/filetransferservice");
const { DownloadService } = require("../services/downloadservice");
const { PatientService } = require("../services/patientservice");
const { FileService } = require("../services/fileservice");
const { ServiceAttrService } = require("../services/serviceattrservice");
const { Literals } = require("../literal/literals");
const logger = require("../config/logger");
const authenticateToken = require("../middleware/authenticateToken");

// Multer 객체 생성 및 파일 업로드 미들웨어 설정 (TEST 용도입니다)
const upload = MetaTransferService.initMulter();
const uploadMiddleware = upload.single("filekey"); // filekey는 클라이언트에서 전송한 파일의 키 값, single()은 하나의 파일만 업로드할 때 사용 (array()는 여러 파일 업로드)

// test 용도의 업로드 API
router.post("/upload", async (req, res) => {
    try {
        const delay = Math.floor(Math.random() * (4000 - 2000 + 1) + 2000);
        setTimeout(() => {
            // Send a 200 OK response with success message after the delay
            res.status(200).send("success");
        }, delay);
    } catch (error) {
        // logger.error(Literals.SERVICE.ADD_PATIENT_FAILED, {
        //     username: req.user.data.username,
        //     ip: req.ip,
        //     role: req.user.data.role,
        //     requestUrl: req.originalUrl,
        //     f_name: null,
        //     error: error.message
        // });
        console.error('Error processing upload:', error);
        res.status(400).send('Internal Server Error');
    }
});


// Zip 파일 생성 API, download에서의 파일과 대응되는 zipId와 해당 zip파일의 Size 정보를 클라이언트에게 전달
router.post("/zip", (req, res) => {
    DownloadService.createZip(req, res)
        .then((sendInfo) => {
            logger.info(Literals.ZIP.ZIP_SUCCESS, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: "Zip Id : " + sendInfo.zipId +" Zip Size : " + sendInfo.fileSize,
            });
            res.status(200).send(sendInfo);
        })
        .catch((error) => {
            logger.error(Literals.ZIP.ZIP_FAILED, {
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: null,
                error: error.message
            });
            res.status(500).send(error.message);
        });
});

// zipId에 해당하는 파일을 클라이언트에게 전송, range가 설정되어 있다면 해당 부분만, 미설정 시 전체 파일을 전송함
router.get("/download/:zipId", (req, res) => {
    DownloadService.downloadZip(req, res)
        .catch((error) => {
            logger.error(Literals.ZIP.ZIP_SEND_FAILED, {
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: null,
                error: error.message
            });
            res.status(500).send(error.message);
        });
});

// 중복 필터 검색 용 API(기본형, 병원 추가예정)
router.post("/search", async (req, res) => {
    // FileService.getNthPageByQuery(serviceAttrs, query, page, limit) 사용 시 페이징 처리
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // 기본으로 출력하는 개수
    await FileService.getAllMetaDataByQuery(await ServiceAttrService.getServiceByName(req.body.name), req.body.attributes)
        .then((result) => {
            if (result.length === 0) {
                logger.error(Literals.FILE.NO_FILE_ERROR, {
                    //username: req.user.data.username,
                    ip: req.ip,
                    //role: req.user.data.role,
                    requestUrl: req.originalUrl,
                    f_name: req.body.name + " " + req.body.attributes.f_name,
                    error: Literals.FILE.NO_FILE_ERROR
                });
                res.status(400).send(Literals.FILE.NO_FILE_ERROR);
            }
            else {
                logger.info(Literals.FILE.FILE_FETCH_SUCCESS, { 
                    //username: req.user.data.username,
                    ip: req.ip,
                    //role: req.user.data.role,
                    requestUrl: req.originalUrl,
                    f_name: req.body.name + " " + req.body.attributes.f_name
                });
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            logger.error(Literals.FILE.FILE_FETCH_FAILED, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: req.body.name + " " + req.body.attributes.f_name,
                error: error.message
            });
            res.status(500).send(error.message);
        });
});

// 환자 메타데이터 추가 API
router.post("/patients", async (req, res) => {
    await PatientService.addPatients(req.body)
        .then(() => {
            logger.info(Literals.FILE.ADD_PATIENT_SUCCESS, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                fname: null
            });
            res.status(200).send(Literals.FILE.ADD_PATIENT_SUCCESS);
        })
        .catch((error) => {
            logger.error(Literals.FILE.ADD_PATIENT_FAILED, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                fname: null,
                error: error.message
            });
            res.status(500).send(error.message);
        });
});

// 파일 메타데이터 추가 API
router.post("/", async (req, res) => {
    await FileService.addFiles(req.body)
        .then(() => {
            logger.info(Literals.FILE.ADD_FILE_SUCCESS, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: req.body.serviceName + " " + req.body.f_name + " " + req.body.f_extension + " patientNo: " + req.body.patientNo
            });
            res.status(200).send(Literals.FILE.ADD_FILE_SUCCESS);
        })
        .catch((error) => {
            logger.error(Literals.FILE.ADD_FILE_FAILED, { 
                //username: req.user.data.username,
                ip: req.ip,
                //role: req.user.data.role,
                requestUrl: req.originalUrl,
                f_name: req.body.serviceName + " " + req.body.f_name + " " + req.body.f_extension + " patientNo: " + req.body.patientNo,
                error: error.message
            });
            res.status(500).send(error.message);
        });
});

module.exports = router;