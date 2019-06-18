import request from '@/plugin/axios'

export function FinisUpload(data) {
    return request({
        url: 'file/finish',
        method: 'post',
        data
    })
}
