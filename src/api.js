import axios from 'axios'
const KEY1 = 'AIzaSyB1AfuvYOnTr-3b6BtZzxJsEv6UiOR3oXo'
const KEY2 = 'AIzaSyBeR38eTC5QoobJTg4Zzh6LOVh-0l-xPSw'
const KEY3 = 'AIzaSyCcaK_mPA6x4CGmWFNJY2r_zqrAZF_YAiw'
const KEY = 'AIzaSyAXrDIh5qqIoqgwrnikmNxvD-sayMCT1zU'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        key: KEY
    }
})

export const video = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'statistics',
        key: KEY
    }
})