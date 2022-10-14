export class BoleRegExp {

    static RegIDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

    static RegEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    static RegPhoneNumber = /^1\d{10}$/;

    static RegTelNumber = /^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$/

    static RegSocietyCreditCode = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g

    static RegNumber = /^\d+$/

    static RegFileName = /(.*\/)*([^.]+).*/gi

    static RegCanPreview = /png|jpg|jpeg|doc|docx|txt|ppsx|xlsx|xls|pdf/gi

    static RegDecimalNumber = /^\d+(\.\d{0,2}){0,1}$/

    static RegBankCard = /^\d{13,19}$/

}