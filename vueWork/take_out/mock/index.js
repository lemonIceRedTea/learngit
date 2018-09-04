import Mockjs from 'mockjs'
import data from '../data.json'

Mockjs.mock('/sell/seller', {
    code: 0,
    codeMsg: 'success',
    data: data.seller
})
Mockjs.mock('/sell/goods', {
    code: 0,
    codeMsg: 'success',
    data: data.goods
})
Mockjs.mock('/sell/ratings', {
    code: 0,
    codeMsg: 'success',
    data: data.ratings
})
