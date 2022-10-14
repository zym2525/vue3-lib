export enum NewsType {
  NewsCenter = 10,
}

export const NewsTypeText = {
  [NewsType.NewsCenter]: '新闻中心',
}

export enum PositionType {
  PC = 10,
  Mobile = 20,
}

export const PositionTypeText = {
  [PositionType.PC]: 'PC端首页轮播',
  [PositionType.Mobile]: '手机端首页轮播',
}

export enum TurnType {
  None = 10,
  URL = 20,
  Site = 30,
  Mini = 40,
  Content = 50,
}

export const TurnTypeText = {
  [TurnType.None]: '不跳转',
  [TurnType.URL]: '页面跳转',
  [TurnType.Site]: '内部跳转',
  [TurnType.Mini]: '小程序跳转',
  [TurnType.Content]: '内容跳转',
}

export const ZJCityList = [
  {
    areaName: '杭州市',
    areaCode: 330100,
  },
  {
    areaName: '宁波市',

    areaCode: 330200,
  },
  {
    areaName: '温州市',
    areaCode: 330300,
  },
  {
    areaName: '嘉兴市',
    areaCode: 330400,
  },
  {
    areaName: '湖州市',
    areaCode: 330500,
  },
  {
    areaName: '绍兴市',
    areaCode: 330600,
  },
  {
    areaName: '金华市',
    areaCode: 330700,
  },
  {
    areaName: '衢州市',
    areaCode: 330800,
  },
  {
    areaName: '舟山市',
    areaCode: 330900,
  },
  {
    areaName: '台州市',
    areaCode: 331000,
  },
  {
    areaName: '丽水市',
    areaCode: 331100,
  },
]

export enum FileType {
  Image = 1,
  Video = 2,
  Other = 3,
}

export const FileTypeText = {
  [FileType.Image]: '图片',
  [FileType.Video]: '视频',
  [FileType.Other]: '其他文件',
}

export const DefaulAvatarImg =
  'https://waterdroptest2.oss-cn-hangzhou.aliyuncs.com/SDYunPlatform/Avatar/20220113/avatar_20220113161032272.jpg'
