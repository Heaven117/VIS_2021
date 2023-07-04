import {get} from "@/request/http";

export const getSixYear = p => get('/getSixYear',p);

export const getProvinceByYear = p => get('/getProvinceByYear',p);

export const getIAQI = p => get('/getIAQI',p);

export const getPredictAQI = p => get('/getPredictAQI',p);

export const getCanlendarData = p => get('/province/getCanlendarData',p);

export const getTwoParamsRelationship = p => get('/getTwoParamsRelationship',p);

export const getProvinceEveryMonth = p => get('/getProvinceEveryMonth',p);

export const getEveryCityAQIByYear = p => get('/getEveryCityAQIByYear',p);

export const getProvincePredictDetail = p => get('/getProvincePredictDetail',p);

export const getSQLayer = p => get('/L7/getSQ2',p);

export const getPredictAQIData = p => get('/getPredictAQIData',p);