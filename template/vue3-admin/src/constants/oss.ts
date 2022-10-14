import { loadEnv } from '@build/index'

const { VITE_OSS_URL } = loadEnv()

export const OSSBaseURL = VITE_OSS_URL

const _basicPath = 'NBHRXH/'

export const OssHRSIE = _basicPath + 'HRSIE/'

export const OssNews = _basicPath + 'News/'

export const OssReview = _basicPath + 'Review/'
