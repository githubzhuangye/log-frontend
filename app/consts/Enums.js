/**
 * 存放本项目用到的enum映射
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}}
 */
//返回时长等级与字符串的转换
export const LevelToStr = {
    0: '<0',
    1: '0-200',
    2: '200-400',
    3: '400-600',
    4: '600-800',
    5: '800-1000',
    6: '1000-1300',
    7: '1300-1500',
    8: '1500-2000',
    9: '2000-4000',
    10: '4000-6000',
    11: '>6000',
}

//身份证的产品
export const IdCardProductToStr = {
    '0.0': '默认产品',
    '1.0': '身份证返照片',
    '2.0': '身份证不返照片'
};

//银行卡的产品
export const BankCardProductToStr = {
    '0.0': '默认产品',
}

/**  规则预警部分  */

//时间段,单位:小时
export const TimeSlotEnum = [
    {
        name: '1小时',
        value: 1
    },
    {
        name: '2小时',
        value: 2
    },
    {
        name: '4小时',
        value: 4
    },
    {
        name: '8小时',
        value: 8
    },
    {
        name: '12小时',
        value: 12
    },
    {
        name: '24小时',
        value: 24
    },
    {
        name: '48小时',
        value: 48
    },
    {
        name: '72小时',
        value: 72
    },
]

//触发间隔时间,单位:分钟
export const TriggerIntervalEnum = [
    {
        name: '1分钟',
        value: 1
    },
    {
        name: '5分钟',
        value: 5
    },
    {
        name: '10分钟',
        value: 10
    },
    {
        name: '30分钟',
        value: 30
    },
    {
        name: '1小时',
        value: 60
    },
    {
        name: '2小时',
        value: 120
    },
    {
        name: '4小时',
        value: 240
    },
]

//触发休眠时间,单位:分钟
export const TriggerSleepEnum = [
    {
        name: '1分钟',
        value: 1
    },
    {
        name: '5分钟',
        value: 5
    },
    {
        name: '10分钟',
        value: 10
    },
    {
        name: '30分钟',
        value: 30
    },
    {
        name: '1小时',
        value: 60
    },
    {
        name: '3小时',
        value: 180
    },
    {
        name: '6小时',
        value: 360
    },
    {
        name: '12小时',
        value: 720
    },
    {
        name: '24小时',
        value: 1440
    },

]

//预警名单
export const NoticeMembersEnum = [

    {
        name: '冯莹',
        value: '0023',
    },
    {
        name: '叶国剑',
        value: '0081',
    },
    {
        name: '涂泽',
        value: '0021',
    },
]

//服务器
export const ServerNameEnum = [
    {
        name: '渠道',
        value: 'channel',
    },
    {
        name: '商户认证',
        value: 'member',
    },
    {
        name: '银行卡认证',
        value: 'bankcard',
    },
    {
        name: '身份证认证',
        value: 'idcard',
    },
]

//通道
export const ChannelArray = [
    'NCIIC', '通道2'
]

//柜台名
export const CounterArray = [
    '华夏银行',
    '华征大数据--个人户籍信息核查',
    '华征大数据--车辆违章记录查询',
    '单笔交易验证',
    '商户多笔交易验证',
    '银行卡多笔交易验证',
    'Card-捷银',
    'Card-15173',
    'Card-19pay',
    'card-盛付通（一卡通）',
    'card-盛付通（盛大卡）',
    'Card-51pay',
    'Card-天天付',
    'Card-新宽联',
    'Card-欧飞科技',
    'Card-70卡世界',
    'Card-卡拉支付',
    'Card-翼腾网络',
    'card-源付',
    '鼎信易销卡',
    '银联网银1',
    '财付通',
    '银联在线-无卡支付',
    '银联在线-网银通道',
    '银联在线-网银通道2',
    '银联在线-移动支付',
    '银联在线-无卡支付2',
    '银联在线-移动支付2',
    '银联在线-网银通道-借',
    '银联在线-wap',
    '银联在线-wap-借',
    '银联在线-wap-贷',
    '银联在线-移动支付-借',
    '银联在线-订购',
    '银联在线-B2B',
    '银联在线（机构）-无卡支付',
    '银联在线（机构）-wap',
    '银联在线（迅信）-wap',
    '银联B2B-中行收单',
    '国付宝',
    '国付宝2',
    '国付宝3',
    '联动优势-联动网关',
    '联动优势-移动支付',
    '联动优势2-网银通道',
    '联动优势B2C(新）1',
    '联动优势B2C(新）2',
    '沃支付',
    '沃支付2-网银通道',
    '连连银通-借',
    '翼支付-运营商三要素认证-电信',
    '翼支付-短信通道',
    '翼支付-运营商二要素认证-电信',
    '翼支付-手机号返时长+状态-电信',
    '翼支付-家庭固话核验',
    '翼支付-企业固话核验',
    '翼支付-企业固话查询',
    '翼支付-电信黑名单',
    '翼支付-运营商三要素认证-联通',
    '翼支付-运营商三要素认证-移动',
    '翼支付-高危黑名单A',
    '易宝-B2C-借',
    '易宝-B2C-混',
    '首信易B2C-借',
    '首信易B2C-混',
    '首信易（迅信）1-B2C',
    '首信易（迅信）2-B2C',
    '首信易（迅信）3-B2C',
    '首信易（迅信）4-B2C',
    '首信易（迅信）5-B2C',
    '首信易(迅信)-代扣',
    '银盛B2C',
    '银盛（统掌）-B2C',
    '银盛（非银联）-代扣',
    '银盛（银联）-代扣',
    '银盛（广驭）-B2C',
    '银盛（广驭）银联-代扣',
    '银盛（广驭）非银联-代扣',
    '银盛（众玩）-代扣',
    '银盛（众玩）-B2C',
    'CP代扣',
    '金运通-代扣',
    '金运通-代扣-2',
    '证通-服务认证',
    '证通（同步）-服务认证',
    '证通（征信）-银行卡认证',
    '深圳结算中心-代扣',
    '深圳结算中心-认证/代扣',
    '深结算-代扣（水费）',
    '深结算-代扣（电费）',
    '深结算-代扣（移动电商费）',
    '深结算-支付宝',
    '深结算-批量代扣（保险）',
    '深结算-批量代扣（移动电商费）',
    '深结算-批量代扣（水费）',
    '深结算-批量代扣（电费）',
    '深结算-代扣（消金）',
    '深结算-批量代扣（消金）',
    '深结算-代扣（东吴人寿）',
    '深结算-批量代扣（东吴人寿）',
    '云码通-认证',
    '聚禾富-微信支付',
    '聚禾富-B2C',
    '聚禾富-微信支付2',
    '畅捷-服务认证',
    '畅捷-服务认证/代扣',
    '创蓝科技-短信通道',
    '大汉三通-短信通道',
    '建周科技-短信通道',
    '云信科技-短信通道',
    'CFCA-认证',
    '远鉴科技-多维认证',
    '远鉴科技-高清照比对',
    '远鉴-身份证认证',
    '远鉴-不良信息查询',
    '远鉴-车辆违章信息查询',
    '远鉴-身份证认证（新）',
    '远鉴-身份证认证-返照（新）',
    '广银联-批量代扣/认证',
    '广银联-二要素验卡',
    '广银联-单笔实时代扣',
    'NCIIC-身份证认证',
    'NCIIC-身份认证公网',
    '小视征信-银行卡认证',
    '小视征信-运营商认证',
    '安徽征信-银行卡认证',
    '安徽征信-运营商认证',
    '浩数科技-运营商认证',
    '亮子云图-银行卡认证',
    '合肥子尚-运营商3要素认证-联通',
    '合肥子尚-运营商2要素认证-联通',
    '合肥子尚-运营商3要素认证（时长+状态）-联通',
    '合肥子尚-手机号返入网时长-联通',
    '合肥子尚-手机号返入网状态-联通',
    '合肥子尚-手机号返入网时长+状态-联通',
    '合肥子尚-身份证认证（不返照片）',
    '合肥子尚-银行卡认证',
    '翰迪-高清照比对',
    '集奥-三要素认证-移动',
    '集奥-两要素认证-移动',
    '集奥-入网状态-移动',
    '同程-三要素认证-移动',
    '同程-入网状态-移动',
    '和实信-两要素认证-移动',
    '中金支付-认证',
    '新颜征信-服务认证',
    '新颜征信-验卡',
    '企业综合信息查询',
    '企业法人四要素核查',
    '企业变更信息监控',
    '晟盾科技-银行卡认证',
    '天津银联-验卡',
    '熔数-三要素认证-移动',
    '熔数-在网时长查询-联通',
    '熔数-在网状态-联通',
    '熔数-号码状态-移动',
    '熔数-三要素比对-移动',
    '熔数-在网时长-移动',
    '敬众-乘机人统计报告',
    '敬众-机票信息查询',
    '国政通-个人不良信息查询',
    '贵州银联-验卡',
    '爰金龙团-个人不良信息核查-简版',
    '吉信-验卡',
    '厦门银联-二维码',
    '北京银联鉴权',
    '北京银联-代扣',
    '位坤-身份认证（简项）',
    '微网通联-短信通道',
    '拍拍信-网贷黑名单',
    '拍拍信-运营商三要素',
    '拍拍信-运营商在网时长',
    '拍拍信-运营商在网状态',
    '拍拍信-学历信息核验',
    '拍拍信-学籍信息核验',
    '拍拍信-户籍信息认证',
    '魔蝎爬虫',
    '魔蝎爬虫私有化',
    '新颜爬虫',
    '证通（新颜）-银行卡认证',
    '捷安-状态-移动',
    '捷安-三要素-移动',
    '捷安-时长-移动',
    '捷安-三要素-移动',
    '捷安-时长-移动',
    '捷安-状态-移动',
    '捷汇通-银行卡认证',
    '招商银行-混合',
    '招商银行-借',
    '招商银行(张江)-混合',
    '招商银行(张江)-他行',
    '招商银行(张江)-借',
    '招商银行-wap',
    '招商银行（张江）-大额',
    '招商银行（深圳）-B2B',
    '招商银行（张江）-混合2',
    '招商银行（深圳）-B2C',
    '招商银行（深圳）-WAP',
    '直连-招商银行（深圳）-代扣',
    '招商银行(线下)-B2B',
    '直连-招商银行（深圳）-代扣（信用卡还款）',
    '工商银行-混合',
    '工商银行-借',
    '工商银行-贷',
    '工商银行-B2B',
    '工商银行-网银-混/借',
    '工商银行（深圳）-B2C',
    '直连-工商银行（深圳）-B2B',
    '直连-工商银行（深圳）-宝付（e支付）-B2C',
    '直连-工商银行（深圳）-宝付（无e支付）-B2C',
    '直连-工商银行（深圳）-WAP',
    '直连-工商银行（深圳）-WAP（e支付）',
    '直连－工商银行（深圳）－扣款（保险）',
    '直连-工商银行（总行）-快捷',
    '工商银行（线下）-B2B',
    '建设银行-混合',
    '建设银行-借',
    '建设银行-贷',
    '建设银行-B2B',
    '建设银行（大额）',
    '建设银行-wap',
    '建设银行-借-网银/账户',
    '建设银行-混-网银/账户',
    '建设银行-快捷',
    '建设银行-代扣',
    '直连-建设银行（U盾）-B2C-借',
    '直连-建设银行（大额）-B2C-借',
    '直连-建设银行-代扣（保险）',
    '浦东发展银行-混合',
    '浦东发展银行-快捷-借',
    '浦东发展银行-快捷-贷',
    '浦发银行-借',
    '浦发银行-贷',
    '浦发银行-wap-借',
    '浦发银行-wap-贷',
    '浦发银行-wap',
    '浦发银行-跨行代扣',
    '浦发银行-大额跨行代扣',
    '直连-浦发银行-代扣',
    '直连-浦发银行-大额代扣',
    '农业银行-借',
    '农业银行-贷',
    '农行-虚拟（借）',
    '农行-虚拟（贷）',
    '农业银行（大额）',
    '农业银行-B2B',
    '直连-农业银行-大额（新）',
    '直连-农业银行（新）',
    '民生银行-混合',
    '民生银行-借',
    '民生银行-贷',
    '民生-B2B',
    '民生银行（线下）-B2B',
    '直连-民生他行(厦门)-B2C',
    '直连-民生银行-民生付',
    '民生他行(厦门)-i快捷',
    '民生银行（厦门）-B2B',
    '民生银行（厦门）-支付宝',
    '民生银行（厦门）-微信支付',
    '民生银行(厦门)-身份证认证',
    '民生银行(厦门)-身份证认证(返照片）',
    '民生银行（成都）-代扣',
    '民生银行（成都）-支付宝',
    '民生银行（厦门）-跨行对公代扣',
    '民生银行（厦门）-本行对公代扣',
    '民生银行（厦门）-本行代收',
    '民生银行（厦门）-跨行代收（消金）',
    '交通银行-混合',
    '交通银行-借',
    '交通银行-B2B',
    '交通银行-wap-混',
    '交通银行-wap-借',
    '交通银行-快捷-贷',
    '光大银行-混合',
    '光大银行-借',
    '光大银行-贷',
    '光大银行（北京）-混-大额',
    '光大银行-wap',
    '光大银行-wap-借',
    '光大银行-wap-贷',
    '光大银行-水电煤',
    '光大银行（北京）-贷-大额',
    '光大银行（北京）-B2B',
    '光大银行（北京）新-贷',
    '光大银行（北京）-快捷-借',
    '光大银行-快捷-借',
    '光大银行-快捷-贷',
    '光大银行（北京）-快捷-贷',
    '光大银行（北京）-代扣',
    '中国银行-混合',
    '中国银行-借',
    '中国银行-贷',
    '中国银行（积分）-贷',
    '中国银行积分2-贷',
    '中国银行积分3-贷',
    '中国银行-快捷-贷',
    '中国银行-wap',
    '中国银行-快捷-借',
    '中国银行-B2B',
    '中国银行B2C-类快捷-混合',
    '中国银行(线下)-B2B',
    '中国银行（跨境）-结汇',
    '上海银行-混合',
    '上海银行-B2B',
    '直连-上海银行-代扣',
    '直连-上海银行-快捷-借',
    '直连-上海银行-快捷-贷',
    '中信银行-混合',
    '中信银行-B2B',
    '中信银行（上海）-微信支付',
    '中信银行（深圳）-支付宝',
    '中信银行（上海）-支付宝',
    '中信银行（深圳）-微信支付',
    '中信银行（长沙）-跨行代收',
    '北京银行-混合',
    '北京银行（线下）-B2B',
    '兴业银行-混合',
    '兴业银行-借',
    '兴业银行-贷',
    '兴业银行-B2B',
    '兴业银行直通车（长沙）-快捷（大额理财）',
    '兴业银行直通车（长沙）-B2C',
    '兴业银行直通车（长沙）-服务认证',
    '兴业银行直通车（长沙）-快捷（消费）',
    '兴业银行（长沙威富通）-微信支付',
    '直连-兴业银行-快捷',
    '兴业银行（长沙）-微信支付-商户专用',
    '兴业银行（长沙）-微信支付-APP&公众号',
    '兴业银行（长沙点芯）-微信支付',
    '直连-兴业银行（长沙）-B2C',
    '兴业银行（长沙威富通）-支付宝',
    '兴业银行（长沙威富通）-微信APP&公众号支付（APPID）',
    '兴业银行（长沙威富通）-微信公众号支付',
    '邮政银行-借',
    '邮政银行-贷',
    '南粤银行-跨行代收',
    '南粤银行-跨行代收（基金）',
    '广发银行-混合',
    '广发银行-借',
    '广发银行-B2B',
    '广发银行-WAP-借',
    '广发银行-WAP-贷',
    '直连-广发银行-代扣',
    '广发银行（线下）-B2B',
    '直连-广发银行-快捷',
    '平安银行-混合',
    '平安银行-借/贷',
    '平安银行-B2B',
    '平安银行（借/贷）-混-借',
    '平安银行-快捷-借',
    '平安银行（线下）-B2B',
    '平安银行（厦门）-微信支付',
    '直连-平安银行（厦门）-代扣',
    '直连-平安银行（上海）-代扣',
    '平安银行-代扣（橙e收款）',
    '工商银行（易真）-混合',
    '招商银行（易真）-混合',
    '光大银行（易真）-混合',
    '华夏银行-混合',
    '华夏银行（线下）-B2B',
    '平安付',
    '宁波银行-混合',
    '浙商银行-B2C',
    '浙商银行-跨行B2C',
    '合一道-服务认证',
    '合一道-身份证认证',
    '合一道（征信）-验卡',
    '上海农商银行-B2C',
    '上海农商银行-B2B',
    '徽商银行-资金存管',
    '徽商银行-资金存管-入金',
    '恒丰银行-代扣',
    '恒丰银行(天天基金)-代扣',
    '恒丰银行(专线)-代扣',
    '恒丰银行-代扣(新)',
    '2号楼-借',
    '光大银行（北京）-混合',
    '光大银行（北京）-借',
    '光大银行（北京）-贷',
    '中行-上海素光',
    '中行-上海玄霆',
    '韩国银行-外贸服装1',
    '韩国银行-外贸服装2',
    '韩国银行-商旅类',
    '韩国银行-富溢1',
    '韩国银行-富溢2',
    '韩国银行-富溢3',
    '韩国银行-富溢4',
    '韩国银行-富溢5',
    '韩国Alliex-易真1',
    '韩国Alliex-易真2',
    '韩国Alliex-易真3',
    '韩国Alliex-易真4',
    '韩国Alliex-易真5',
    '韩国Alliex-易真6',
    '韩国Alliex-易真7',
    '韩国Alliex-易真8',
    '韩国Alliex-易真9',
    '鹏元科技-身份信息-两要素',
    '云码通认证-test1',
    '海关',
    '北京银联鉴权',
]


//产品名
export const ProductArray = [
    '生物识别',
    '运营商三要素认证',
    '数据爬虫',
    '征信-身份证认证-两要素',
    '征信-银行卡认证-三要素',
    '征信-银行卡认证-四要素',
    '征信-身份证认证（返照片）-两要素',
    '征信-银行卡认证-二要素',
    '征信-银行卡认证(发短信)-四要素',
    '征信-高清照比对',
    '运营商两要素认证',
    '运营商三要素认证-在网时长+状态',
    '运营商-入网时长',
    '运营商-入网状态',
    '征信-银行卡认证-四要素-升级版',
    '运营商三要素认证-入网时长',
    '征信-银行卡认证--三要素-升级版',
    '运营商三要素认证-入网状态',
    '运营商-入网时长+状态',
    '征信-银行卡认证-四要素-尊享版',
    '征信-银行卡认证-三要素-尊享版',
    '征信-个人不良信息核查-标准版',
    '征信-车辆违章信息查询',
    '打款认证核查',
    '征信-个人不良信息核查-详版',
    '征信-个人不良信息核查-简版',
    '家庭固话核查-基本信息核验',
    '家庭固话核查-户名核验',
    '家庭固话核查-地址核验',
    '运营商黑名单查询',
    '征信-个人不良综合核查A',
    '征信-企业变更信息监控',
    '征信-个人借贷不良信息核查A',
    '学霸评估',
    '个人家庭画像',
    '单笔交易验证',
    '商户多笔交易验证',
    '银行卡多笔交易验证',
    '企业固话核查-基本信息核验',
    '企业固话核查-企业名核验',
    '企业固话查询-固话查询',
    '企业固话查询-户名查询',
    '企业综合信息查询',
    '企业法人四要素核查',
    '航旅报告',
    '申请雷达（A-Radar)',
    '行为雷达（B-Radar）',
    '信用现状（C-Radar）',
    '信用监测-异常贷款',
    '信用监测-借新还旧',
    '信用监测-信用恶化',
    '征信-银行卡认证-六要素',
]


//部门
export const departMentArray = [
    '技术部',
    '支持部',
    '营销部',
    '市场部',
    '领导',
    '其他部门'
]

//角色
export const RoleEnum = [
    {
        name: '普通人员',
        value: '普通人员'
    },
    {
        name: '管理员',
        value: '管理员'
    },
    {
        name: '超级管理员',
        value: '超级管理员'
    },
]


/**
 * 从enum中获取指定value的name
 * @param enums
 * @param value
 * @returns {string}
 */
export const getNameFromEnumByValue = (enums, value) => {

    if (enums && enums.findIndex(e => e.value == value) != -1) {
        return enums.find(e => e.value == value).name;
    }
    return '';

}