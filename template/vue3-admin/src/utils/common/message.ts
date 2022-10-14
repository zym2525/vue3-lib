import { ElMessage, ElMessageBox } from 'element-plus'

// 消息
const Message = (message: string): any => {
    return ElMessage({
        showClose: true,
        message,
    })
}

// 成功
const successMessage = (message: string): any => {
    return ElMessage({
        showClose: true,
        message,
        type: 'success',
    })
}

// 警告
const warnMessage = (message: string): any => {
    return ElMessage({
        showClose: true,
        message,
        type: 'warning',
    })
}

// 失败
const errorMessage = (message: string): any => {
    return ElMessage({
        showClose: true,
        message,
        type: 'error',
    })
}

const deleteMessage = () => {
    return new Promise((resolve) => {
        ElMessageBox.confirm('确认要删除该条数据吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                resolve(1)
            })
            .catch(() => {
                resolve(0)
            })
    })
}

const tipMessage = (msg) => {
    return new Promise((resolve) => {
        ElMessageBox.confirm(msg, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                resolve(1)
            })
            .catch(() => {
                resolve(0)
            })
    })
}

export { Message, successMessage, warnMessage, errorMessage, deleteMessage, tipMessage }
