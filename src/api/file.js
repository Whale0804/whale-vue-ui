import request from '@/plugin/axios'

export function FinisUpload(data) {
    return request({
        url: 'file/finish',
        method: 'post',
        data
    })
}

export function CheckFileMd5 (data) {
    return request({
        url: 'file/check',
        method: 'post',
        data
    })
}