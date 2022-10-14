// // import XLSX from 'xlsx'
// import XLSXS from 'xlsx-style'
// import { downloadFile } from './common/download'

// export const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length)
//     const view = new Uint8Array(buf)
//     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
//     return buf
// }

// type ExportXLSXType = <T>(
//     listData: Array<T>,
//     fileName: string,
//     colsInfo: { [key: string]: string }
// ) => void

// export const exportToXLSX: ExportXLSXType = (listData, fileName = '数据导出', colsInfo) => {
//     if (listData.length === 0) {
//         throw new Error('暂无数据，无法导出')
//     }
//     const headInfo = Object.keys(colsInfo).map((x) => colsInfo[x]) // ?? Object.values(colsInfo)

//     const workbook = {
//         SheetNames: ['Sheet1'],
//         Sheets: {
//             Sheet1: {
//                 '!cols': [{ wpx: 200 }],
//             },
//         },
//     }

//     for (let i = 0; i < headInfo.length; i++) {
//         const cell = String.fromCharCode(65 + i)
//         workbook.Sheets.Sheet1[cell + '1'] = {
//             v: headInfo[i],
//             t: 's',
//             s: {
//                 font: {
//                     name: '微软雅黑', //字体
//                     sz: 10, //字体大小
//                 },
//             },
//         }

//         if (i === 0) {
//             workbook.Sheets.Sheet1['!ref'] = 'A1:'
//         }

//         if (i === headInfo.length - 1) {
//             workbook.Sheets.Sheet1['!ref'] += `${cell}1`
//         }

//         workbook.Sheets.Sheet1['!cols'][i] ? null : (workbook.Sheets.Sheet1['!cols'][i] = { wpx: 150 })
//     }

//     /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
//     const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }

//     const wbout = XLSXS.write(workbook, wopts)

//     /* the saveAs call downloads a file on the local machine */
//     downloadFile(new Blob([s2ab(wbout)], { type: '' }), fileName, 'xlsx')
// }
