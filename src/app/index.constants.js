/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('pmsJs')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('popusalTypes', [{id: 'SUBMITTED', name: '已审核'}, {id: 'PENDING', name: '在处理'}, {
      id: 'CANCEL',
      name: '取消'
    }, {id: 'EXECUTED', name: '已执行'}, {id: 'SUCCESS', name: '成功'}])
    .constant('actionType', [{id: 'DELETE_DEPOSIT_RECORD', name: '註銷'}, {id: 'MANUAL', name: '手动'}, {
      id: 'QUOTA_TRIAL',
      name: '測試額度'
    }, {id: 'INTEREST', name: '利息'}, {
      id: 'CHARGE_FEE',
      name: '月費/短信費'
    }, {id: 'RETURN_PAYFEE', name: '返回手续费'}, {id: 'PAYFEE_ADJUSTMENT', name: '付款手续费调整'}, {
      id: 'DATA_ADJUSTMENT',
      name: '丢失/数值调整'
    }, {id: 'IPS', name: 'IPS下发'}, {id: 'CASHIN', name: '收款'}, {id: 'UNCLAIMED', name: '提交未认领存款'}, {
      id: 'TRANSFER',
      name: '转账'
    }, {id: 'TRANSFERPAYFEE', name: '转账手续费'}, {id: 'PAYFEE', name: '付款手续费'}, {id: 'INQUIRE', name: '收款手续费'}, {
      id: 'PAYMENT',
      name: '付款'
    }, {id: 'BUSINESSPAY', name: '业务支出'}, {id: 'BUSINESSPAYPAYFEE', name: '业务支出手续费'}, {
      id: 'CANCEL UNCLAIMED',
      name: '取消未认领提案'
    }, {
      id: 'EXCUTEUNCLAIMED',
      name: '执行未认领存款提案'
    }])
    .constant('merchantStatus', [{
      id: 'ENABLED',
      name: '启用'
    }, {
      id: 'DISABLED',
      name: '禁用'
    }, {
      id: 'DEPRECATED',
      name: '不可用'
    }])
    .constant('merchantPurpose', [{
      id: 'CREATEACCOUNT',
      name: '开户存款'
    }, {
      id: 'NORMAL',
      name: '普通存款'
    }])
    .constant('paymentType', [{
      id: 'NETPAY',
      name: '网银商户'
    },
      {
        id: 'KUAIJIE',
        name: '快捷商户'
      }
      , {
        id: 'WECHATQR',
        name: '微信扫码商户'
      }, {
        id: 'WECHATAPP',
        name: '微信APP商户'
      }, {
        id: 'ALIPAYQR',
        name: '支付宝扫码商户'
      }, {
        id: 'ALIPAYAPP',
        name: '支付宝App商户'
      }])
    .constant('deviceType', [{
      id: 'WEB',
      name: '网页'
    }, {
      id: 'MOBILE',
      name: '手机'
    }, {
      id: 'BOTH',
      name: '两者'
    }])
    .constant('canPayState', [{id: "0", name: " 禁用"}, {id: "1", name: "正常"}])
    .constant('getBankType', [{id: "0", name: "中转卡"}, {id: "1", name: "卡商卡"}, {id: "2", name: "收款卡"}, {
      id: "3",
      name: "农信支付宝"
    }, {id: "4", name: "农信微信"}, {id: "5", name: "WD25专用"}, {id: "6", name: "云闪付收款卡"}, {id: "7", name: "WD12专属卡"}, {id: "8", name: "网银转账专属卡"}])
    .constant('bankTypeCardStatus', [
      {
        id: 'NORMAL',
        name: '正常'
      }, {
        id: 'WITHROWING',
        name: '提现'
      }, {
        id: 'ONLINEING',
        name: '上线'
      }, {
        id: 'DISABLED',
        name: '禁用'
      }, {
        id: 'LOCK',
        name: '冻结'
      }
      , {
        id: 'NOVISVIBLE',
        name: '不可见'
      }])
    .constant('bankCardStatus', [
      {
        id: "BEGINING",
        name: '待处理'
      },
      {
        id: 'EXECUTED',
        name: '已处理'
      },
      {
        id: 'CANCEL',
        name: '已取消'
      }]
    )
    .constant('payBanktypes', [
      {
        id: "1",
        name: '优质卡'
      },
      {
        id: '2',
        name: '中层卡'
      },
      {
        id: '3',
        name: '外层卡'
      }]
    )
    .constant('proposalState', [{"id": "NORMAL", "name": "正常"}, {
      "id": "EXECUTED",
      "name": "已执行"
    }, {
      "id": "OVERTIME",
      "name": "已超时"
    }])
    .constant('proposalType', [{"id": "1", "name": "支付宝"}, {
      "id": "2",
      "name": "微信"
    }, {
      "id": "3",
      "name": "云闪付"
    }, {
      "id": "4",
      "name": "网银转账"
    }])
    .constant('monthType', [{"id": "-1", "name": ""}, {"id": "0", "name": "当月"}, {"id": "1", "name": "上个月"}, {
      "id": "2",
      "name": "前2月"
    }])
    .constant('depositState', [{
      id: 'NOMATCHING',
      name: '未匹配'
    }, {
      id: 'PENDING',
      name: '待回调'
    }, {
      id: "EXECUTED",
      name: "已回调"
    }, {
      id: "OVERTIME",
      name: "已超时"
    }, {id: "DISABLED", name: "已删除"}])
    .constant('userrplistType', [{"id": "cominput", "name": "存款收入"}, {
      "id": "cominputfee",
      "name": "平台佣金"
    }, {"id": "comoutput", "name": "商户提现"}, {
      "id": "comoutputfee",
      "name": "提现佣金"
    }])
    // .constant('rplistType', [{"id": "cominput", "name": "收入"}, {
    //   "id": "cominputfee",
    //   "name": "收入手续费"
    // }, {"id": "input", "name": "转入"}, {"id": "comoutput", "name": "付款"}, {
    //   "id": "comoutputfee",
    //   "name": "付款手续费"
    // }, {"id": "output", "name": "转出"}, {
    //   "id": "outputfee",
    //   "name": "转出手续费"
    // }, {
    //   "id": "add",
    //   "name": "增加"
    // }, {"id": "less", "name": "减少"}])
    .constant('rplistType', [{"id": "cominput", "name": "收入"}
      , {"id": "alipayout", "name": "提现"}, {
        "id": "alipayoutfee",
        "name": "提现手续费"
      }, {"id": "input", "name": "转入"}, {"id": "output", "name": "转出"}, {
        "id": "outputfee",
        "name": "转出手续费"
      }, {"id": "comoutput", "name": "付款"}, {
        "id": "comoutputfee",
        "name": "付款手续费"
      }, {
        "id": "add",
        "name": "增加"
      }, {"id": "less", "name": "减少"}])
    .constant('merchantTotals', [{
      id: 'PENDING',
      name: '待执行'
    },
      {
        id: 'SUCCESS',
        name: '已成功'
      },
      {
        id: 'FAIL',
        name: '已失败'
      }])
    .constant('listStates', [{
      id: '0', name: '待审核'
    }, {
      id: '1', name: '审核中'
    }, {id: '2', name: '已审核'}, {
      id: '3', name: '处理中'
    }])
    .constant('listTypes', [{
      id: '0', name: '存款'
    }, {
      id: '1', name: '网页支付宝存款'
    }, {
      id: '2', name: '手机支付宝存款'
    }, {
      id: '3', name: '微信存款'
    }, {
      id: '4', name: '提款'
    }, {
      id: '5', name: '大额提款'
    }])
    .constant('bankTypeList', [
      {
        id: '1',
        name: '正常'
      }, {
        id: '0',
        name: '冻结'
      }, {
        id: '2',
        name: '禁用'
      }])
    .constant('cardTypeList', [{
      id: 'BACKUP',
      name: '平台备用金卡'
    }, {
      id: 'DEPOSIT',
      name: '收款卡'
    }, {
      id: 'PAYMENT',
      name: '付款卡'
    }, {
      id: 'DOWNPLAY',
      name: '下发卡'
    }, {
      id: 'BACKUPMONEY',
      name: '备用金卡'
    }, {
      id: 'FORMONEY',
      name: '待用金卡'
    }])
    .constant('tranState', [{
      id: '0',
      name: '待完成'
    }, {
      id: '1',
      name: '已完成'
    }])
    .constant('payTypes', [{
      id: '1',
      name: '动态'
    }, {
      id: '2',
      name: '固码'
    }, {
      id: '3',
      name: '多图'
    }, {
      id: '4',
      name: '固码支付'
    }])
    .constant('mobileTypes', [{"id": "0", "name": "电脑pc"}, {"id": "1", "name": "安卓"}, {"id": "2", "name": "苹果"},])
    .constant('originList', [{
      id: '1',
      name: '组1'
    }, {
      id: '2',
      name: '组2'
    }, {
      id: '3',
      name: '组3'
    }, {
      id: '4',
      name: '组4'
    }, {
      id: '5',
      name: '组5'
    }, {
      id: '6',
      name: '组6'
    }, {
      id: '7',
      name: '组7'
    }, {
      id: '8',
      name: '组8'
    }, {
      id: '9',
      name: '组9'
    }, {
      id: '10',
      name: '组10'
    }])
    .constant('bankList', [{
      id: '0',
      name: '银行卡'
    }, {
      id: '1',
      name: '支付宝'
    }
      , {
        id: '3',
        name: '虚拟卡'
      }, {
        id: '4',
        name: '云闪付'
      }
    ])
    .constant('payitemTypes', [{id: "0", name: "红包"}, {id: "1", name: "万用码"}, {id: "2", name: "宝转卡"}])
    .constant("platfromList", [{id: "0", name: "BAIBO"}, {id: "1", name: "KZING"}])
    .constant("googleEnable", [{id: "off", name: "关闭"}, {id: "on", name: "打开"}])
    .constant('payTypelist', [
      {name: "ATM", id: "ATM"}, {name: "网银转账", id: "网银转账"}, {
        name: "现金在柜台汇款",
        value: "CASHCOUNTER"
      }, {name: "电话转账", id: "PHONEPAYMENT"}, {name: "跨行转账", id: "CROSS"}, {
        name: "支付宝",
        id: "ALIPAYDIRECT"
      }, {name: "OTHERS", id: "OTHERS"}])
    .constant('cashoutType', [
      {name: "执行中", id: "PENDING"},
      {name: "自动审核", id: "SUBMITTED"},
      // {name: "取消", id: "CANCEL"},
      {name: "已审核", id: "AUDITED"},
      {name: "已执行", id: "EXECUTED"}
      // ,{name: "已完成", id: "SUCCESS"}
    ])
    .constant('depositstatus', [{id: "SUBMITTED", name: "已提交"}, {id: "EXECUTED", name: "已执行"}, {
      id: "CANCEL",
      name: "已取消"
    }, {id: "SUCCESS", name: "已成功"}])
    .constant('proposeList', [{name: "已提交", id: "SUBMITTED"}, {name: "执行中", id: "EXECUTED"}, {
      name: "已取消",
      id: "CANCEL"
    }])
    .constant('autopayState', [
      {name: "进行中", id: "0"},
      {name: "成功", id: "1"},
      {name: "失败", id: "2"},
      {name: "未知", id: "3"}
    ])
    .constant('flushState', [
      {"name": "是", id: "0"},
      {"name": "否", id: "1"}
    ])
    .constant('userole', [{
      //'id': "收款员",
      'name': "收款员",
      id: "#1,#1,1,#1,#1,1,1,#0,0,0,0,#1,1,#1,#1,1,1,1,1,1,"
    }, {
      'name': "付款员",
      id: "#1,#1,1,#1,#0,0,0,#1,1,1,1,#1,1,#1,#1,1,1,1,1,1,"
    }, {name: "查询者", id: "#1,#1,1,#1,#1,1,1,#1,1,1,1,#1,1,#1,#1,1,1,1,1,1,"}])
    .constant('loc_language_en', {
      '登录': 'Login',
      '用户': 'User',
      '银行卡': 'Bankcard',
      '银行卡卡号': 'Bankcard No.',
      '收款': 'Deposit',
      '付款': 'Payment',
      '匹配单号': 'Match',
      '登录成功': 'Login Success',
      '报表': 'Report',
      '系统管理': 'System',
      '管理': 'Manage',
      '设置': 'Setting',
      '登出': 'logout',
      '账号管理': 'List',
      '转账提醒': 'Reminder',
      '转账监控': 'Control',
      '所属银行': 'Bank',
      '所属类型': 'Type',
      '单页数量': 'Page Size',
      '转款卡信息': 'Transfer Card Information',
      '操作方式': 'Operating Method',
      '查询': 'Search',
      '更新': 'Update',
      '绑定电话': 'Phone No.',
      '今日交易': 'Today Out',
      '目前余额': 'Balance',
      '当前状态': 'Status',
      '创建': 'Create',
      '删除': 'Delete',
      '调整余额': 'Balance Adjustment',
      '余额限制': 'Balance Limit',
      '生成时间': 'Generate Time',
      '操作提示': 'Operations Tips',
      '生成转账': 'Generate Transfer',
      '收款卡信息': 'Deposit Card Information',
      '账号余额': 'Balance',
      '创建时间': 'Create Time',
      '转账卡信息': 'Transfer Card Info',
      '转账金额': 'Amount',
      '任务状态': 'Status',
      '查询余额': 'Balance Checking',
      '已完成': 'Finished',
      '名称': 'Name',
      '所属设备': 'equipment it belongs to',
      '领取任务': 'Obtain Task',
      '继续任务': 'Continuation of Task',
      '商户号': 'Merchant',
      '商户地址': 'Merchant URL',
      '商户类型': 'Merchant',
      '交易限额': 'Limit',
      '备注': 'Remark',
      '详细信息': 'Details',
      '银行卡账号': 'Account No.',
      '设备号': 'deviceNo',
      '存款方式': 'Manner',
      '名字': 'Name',
      '城市': 'City',
      '存款手续费': 'Payfee',
      '金额': 'Amount',
      '银行余额': 'balance',
      '提案ID': 'proposalId',
      '创建人': 'creator',
      'empCreator': 'empCreator',
      '设备列表': 'Device List',
      '选择卡号': 'Select Card No.',
      '输入余额': 'Input Balance',
      '签入': ' Log in',
      '签出': 'Log Out',
      '申请单号': 'Proposal',
      '会员等级': 'Level',
      '提款金额': 'Amount',
      '取消任务': 'Cancel Task',
      '输入金额': 'Input Amount',
      '(确认给用户汇款后，请在此输入付款卡余额，再点击完成任务)': '(After confirming the payment,input the balance of payment card, then click complete the task)',
      '完成': 'Finished',
      '当前订单总量': 'Current Order Amount',
      '订单数量': 'Order Amount',
      '预警订单': 'Priority Proposal',
      '处理设备': 'DeviceManagement',
      '设备名称': 'DeviceName',
      '操作员': 'Operator',
      '签入银行': 'Time In Bank',
      '提案单号': 'Proposal',
      '开户姓名': 'Name',
      '银行账号': 'No.',
      '所属平台': 'Platform',
      '手工收款': 'Manual',
      '自动收款监控': 'Auto Pay Control',
      '监控手工付款': 'Manual Payment Control',
      '转账任务': 'Task',
      '付款对账单': 'Payment Reconciliation',
      '手工付款': 'Manual',
      '收付款设置': 'Payment Setting',
      '设备管理': 'Device Management',
      '客户端管理': 'Client Management',
      '奖品管理': 'Gift Management',
      '银行LOGO': 'Bank Logo',
      '银行代码': 'Bank Code',
      '优先等级': 'Priority Level',
      '修改': 'Modify',
      '网关地址': 'Gateway',
      '日总限额': 'Daily Limit',
      '玩家单日限额': 'Daily Limit',
      '单笔限额': 'Single Limit',
      '收款明细': 'Details',
      '操作': 'Operate',
      '自动付款': 'Auto',
      '设定限额': 'Limit Setting',
      '创建日期': 'Create Date',
      '银行类型': 'Bank',
      '添加': 'Add',
      '客户ID': 'Client ID',
      '存款日期': 'Date',
      '存款时间': 'Time',
      '存款金额': 'Amount',
      '产品别': 'Products',
      '存款人姓名': 'Name',
      '存款人城市': 'City',
      '其他备注': 'Remarks',
      '确认客户ID': 'Client ID Confirmation',
      '冻结': 'Frozen',
      '正常': 'Normal',
      '禁用': 'Disable',
      '收款银行': 'Deposit Bank',
      '存款地址': 'Deposit Address',
      '存款卡': 'Deposit Card',
      '转账余额': 'Transfer Amount',
      '付款人': 'Payor',
      '状态': 'Status',
      '支付类型': 'Type',
      '手续费': 'Payfee',
      '操作账号': 'Account',
      '收款卡': 'Deposit Card',
      '开始时间': 'Start Time',
      '结束时间': 'End Time',
      '到': 'to',
      '该选项不能为空': 'Required Field',
      '两次输入不一致': 'Inputs Does Not Match',
      '该选项输入格式不正确': 'Wrong Format',
      '必须输入数字': 'Must Be In No.s',
      '该输入值已经存在，请重新输入': 'Input Value Existed, Please Try Again',
      '展开': 'Expand',
      '付款详情': 'Payment Details',
      '提款单号': 'Proposal',
      '申请额度': 'Transfer Amount',
      '付款所属银行': 'Payment Bank',
      '付款银行账号': 'No.',
      '付款开户姓名': 'Name',
      '用户名': 'Username',
      '创建者': 'Creator',
      '密码': 'Password',
      '真实姓名': 'Real Name',
      '功能': 'Functions',
      '修改权限': 'Modifying Authority Access',
      '昵称': 'Nick Name',
      '自动匹配': 'Auto Match',
      '提交单号': 'Order No.',
      '付款人姓名': 'Payor Name',
      '付款方式': 'Payment Method',
      '付款金额': 'Payment Amount',
      '提交存款单': 'Deposit',
      '收款金额': 'Deposit Amount',
      '手动匹配': 'Manual Match',
      '银行收款单': 'Bank Deposit No.',
      '匹配': 'Match',
      '付款银行': 'Payment Bank',
      '成功': 'Success',
      '失败': 'Failed',
      '工商银行': 'CIB',
      '兴业银行': 'industrial bank',
      '生成转账任务': 'Generate Transfer Proposal',
      '转账额度': 'Transfer Credits',
      '确定': 'Confirm',
      '取消': 'Cancel',
      '确认': 'Confirm',
      '请选择转账到指定账号': 'Please select which account to transfer',
      '创建商户号': 'Merchant Creation',
      '付款类型': 'Payment',
      '用途': 'Purpose',
      '使用平台': 'Platform',
      '商户': 'Merchant',
      '操作成功': 'Operation Successful',
      '无效支付服务网关': 'Invalid Payment Service Gateway',
      '没有足够的银行卡': 'Not Enough Bank Card',
      '平台不存在': 'Platform Does Not Exist',
      '平台已存在': 'Platform Already Exist',
      '无效参数': 'Invalid Parameter',
      '平台不可用': 'Platform Cannot Be Use',
      '电话号码验证错误': 'Phone No. Verification Error',
      '银行卡已经存在': 'Bank Card Already Exists',
      '已经被领取或者已完成': 'Already Claimed or Done',
      '该任务已完成': 'Task Completed',
      '该卡已经被签入,不能重复签入': 'Card already Time in, not allow to double time in',
      '付款单不存在出款单': 'Payment Proposal Does Not Exist',
      '付账卡异常状态或不存在': 'Payment Card Abnormal or Does Not Exist',
      '总额度必须等于付款额度': 'Total Credit Must Be Equal to Paid Amount',
      '移除部门失败': 'Failed Removing Department',
      '设备名称已经存在': 'Device Name Already Existed',
      '名称不能重复': 'Repetition of Name Are Not Allowed',
      '银行收款单已经是完成状态': 'The Selected Deposit Had Been Approved',
      '收款单号不存在': 'Deposit No. Does Not Exist',
      '手工匹配单已经是完成状态': 'The Selected Proposal Had Been Executed',
      '手工匹配单号不存在': 'The Selected Proposal Does Not Exist',
      '参数不能为空': 'Parameter Is A Required Field',
      '更新失败': 'Update Failed',
      '转账卡余额必须大于转账余额': 'Bank Card Balance Have To Be Greater Than Transfer Amount',
      '生成转账任务失败': 'Proposal Generation Failed',
      '任务状态没有初始化': 'Proposal Status Not Initialized',
      '任务已经被领取': 'Proposal Being Claimed',
      '取消失败，任务状态为异常或者失败状态': 'Cancel Fail, Proposal Status is Abnormal or Fail',
      '取消失败，任务状态为成功': 'Cancel Fail, Proposal Status is Successful',
      '取消失败，任务已经作废': 'Cancel Failed, Proposal Is Obsolete',
      '领取任务人和取掉任务人必须一致': 'Person Who Claimed and Cancelled the Task Must Be the Same Person',
      '账单任务还未被领取': 'Porposal Not Done',
      '领取任务人和完成任务人必须一致': 'Person Who Process The Task and The Person Who Completes The Task Must Be The Same Person',
      '该任务已不存在': 'Proposal Does Not Exist Anymore',
      '用户名已经存在': 'Username Already Exists',
      '用户在系统中不存在': 'User Does Not Exist In The System',
      '传入用户ID不能为空': 'User ID Cannot Be Empty',
      '用户名或者密码错误': 'Username or Password Error',
      '用户被锁定': 'User Being Locked',
      '权限密码错误': 'Password Authourization Incorrect',
      '请先选择银行卡': 'Please Select Bank Card',
      '输入的格式不正确': 'Incorrect Format',
      '麻烦留点': 'Balance not enough',
      '点击选择文件': 'Click to Select Files',
      '用户管理': 'User management',
      '请先选择单号': 'Select Proposal No.',
      '请选择银行卡流水': 'Please Select The Appropriate Deposit',
      '请选择银行卡': 'Select Bank Card',
      '创建商户类型': 'Create Merchant Type',
      '修改商户类型': 'Modifying Merchant Type',
      '创建网关地址': 'Gateway Address Creation',
      '网关名称': 'Gateway Name',
      '修改网关地址': 'Changing Gateway Address',
      '创建交易限额': 'Transactions Limit Creation',
      '代码': 'Code',
      '修改交易限额': 'Modifying Transaction Limit',
      '更改设备名称': 'Changing Equipment Name',
      '原设备名称': 'original equipment name',
      '权限密码': 'password authority',
      '加入处理设备': 'add to processing equipment',
      '创建银行卡账号': 'Bank Card Account Creation',
      '设置设备名称': 'configure equipment name',
      '修改商户号': 'Changing Merchant No.',
      '商户号详情': 'Merchant No. Details',
      '备用卡': 'Spare Card',
      '付款卡': 'Payment Card',
      '获取数据中': 'Data Obtaining',
      '角色': 'Role',
      '平台': 'Platform',
      '权限管理': 'Authority Management',
      '添加扣除': 'Plus Minus',
      '地址': 'address',
      '存款单号': 'deposit No.',
      '余额': 'Balance',
      '开户地址': 'count Address',
      '所在地': 'Location',
      '绑定商户号': 'Merchant',
      '证书到期日': 'Limit Date',
      '银行网点': 'Bank Branch',
      '项目': 'Project',
      '最后使用时间': 'Last Used Time',
      '在线支付补单': 'Repair',
      '支付补单': 'Payment Repair',
      '单号': 'Bill No.',
      '支付平台': 'Payment Platform',
      '新开户': 'New Account',
      '账号': 'Account No.',
      '姓名': 'Name',
      '来源IP': 'IP Origin',
      '加入时间': 'Joining Time',
      '返回处理时间': 'Processing Time',
      '补单': 'Repair',
      '所属用户': 'User',
      '用户没绑定有效的付款卡': 'User Did Not Bind Valid Bank Card',
      '用户没绑定有效的收款卡': 'User Did Not Bind Valid Bank Card',
      '创建部门': 'Department Creation',
      '修改用户': 'Modifying User',
      '创建角色': 'create role',
      '修改角色': 'Editing Role',
      '说明': 'Details',
      '有子集目录不允许删除': 'Record with Sub Directory Are Not Allowed to Delete',
      '用户登录': 'User Login',
      '部门': 'Department',
      '创建用户': 'User Creation',
      '格式不正确': 'Details Input Does Not Match',
      '输入不一致': 'input not match',
      '必须数字': 'Must Be No.s',
      '修改银行卡账号': 'Modifying Bank Card Account',
      '开始转账': 'Start Transfer',
      '手工匹配': 'Manual Match',
      '银行存款单': 'Bank Deposit Record',
      '更新收款明细': 'Update Deposit Info',
      '汇款人': 'Payment Person',
      '二维码': 'QR Code',
      '同步': 'Refresh',
      '创建银行类型': 'Bank Creation',
      '修改银行类型': 'Editing Bank',
      '跳转': 'Redirect',
      '普通存款': 'Normal Bank Deposit',
      '开户存款': 'Account Opening Deposit',
      '网银转账': 'Online Bank Transfer',
      '现金在柜台汇款': 'Over The Counter Remitance',
      '电话转账': 'Phone Money Transfer',
      '跨行转账': 'Cross Transfer',
      '支付宝': 'Alipay',
      '执行中': 'Executing',
      '自动审核': 'Submitted',
      '审计': 'Audited',
      '进行中': 'On Going',
      '未知': 'Unknown',
      '网页': 'Web',
      '手机': 'Mobile',
      '两者': 'Both',
      '网银': 'Netpay',
      '微信扫描': 'Wechat QR',
      '支付宝扫码': 'Alipay QR',
      '微信App': 'Wechat APP',
      '支付宝App': 'Alipay APP',
      '待完成': 'Pending',
      '启用': 'Enabled',
      '不可用': 'Unavailable',
      '上一页': 'Previous',
      '下一页': 'Next',
      '在线补单': 'Online Repair',
      '共': 'Total',
      '页': 'Page',
      '生产转账': 'Processing Transfer',
      '修改密码': ' Editing Password',
      '新密码': 'New Password',
      '旧密码': 'Old Password',
      '确认密码': 'Confirm Password',
      '推给acc': 'Transfer Task To ACC',
      '提案号': 'Proposal',
      '事件动作': 'Action',
      '时间段': 'Period',
      '金额变动': 'Balance Changing',
      '前余额': 'Balance Before Transfer',
      '后余额': 'Balance After Transfer',
      '金额段': 'Amount',
      '条': 'Number',
      '源卡信息': 'BankCard',
      '目标卡信息': 'Target Account Details',
      '公司承担手续费': 'Payfee Bear By The Company',
      '总计': '总计',
      '小计': '小计',
      '最近一次的录入记录': '	Last Cash-in',
      '最近一次的帐变记录': '	Last Transfer',
      '处理时间': '	Processing Time',
      '取款单号': '	Proposal no.',
      '实时信息': 'Message',
      '提案明细': 'Details',
      '图片过大': 'Upload file not more than 30KB',
      '开户行': 'Branch',
      '总收款明细': 'Deposit List(ALL)',
      '支出明细': 'Payment List',
      '提案列表': 'Proposal List',
      '付款提案': '付款提案',
      '提现提案': '提现提案',
      '游戏账号': 'User Account',
      '倒数时间': 'Countdown',
      '客户等级': 'User Role',
      '转账单号': 'Transfer no.',
      '总转账任务': 'Transfer List',
      '总支出明细': 'Payment List(ALL)',
      '创建操作员': '	Add Staff',
      '操作员列表': 'Staff List',
      '查看操作员': '	Staff Name',
      '操作员姓名': '	Staff Name',
      '最后修改时间': '	Last updated',
      '修改操作员': 'Modify',
      '先选择操作员': '	Choose staff first',
      '多窗口': '	+Tab',
      '请选择操作员': '	Choose staff first',
      '语言': 'language',
      '重置密码': 'defult password',
      '自动刷新': '自动刷新',
      '银行卡额度不一致': 'different balance with the bank',
      '账号已在其他地方登陆.': 'You have been Logged Out. Someone signed in using your account.',
      '银行卡没有符合条件的流水,请录入流水或者取消单号': '银行卡没有符合条件的流水,请录入流水或者取消单号',
      '流水号': '流水号',
      '商户统计': '商户统计',
      '第三方订单号退回': '第三方订单号退回',
      '电话呼出': '电话呼出',
      '商户支付类型': '商户支付',
      '手动补单': '手动补单',
      '第三方回调': '第三方回调',
      '过期时间': '过期时间',
      '补录流水': '补录流水',
      '报表统计': '报表统计',
      '付款链接': '付款链接',
      'app管理': 'app管理',
      '执行时间': '执行时间',
      '充值记录': '充值记录',
      '提现记录': '提现记录',
      '绑定银行卡': '绑定银行',
      '账户明细': '账户明细',
      '收款记录': '收款记录',
      '代理管理': '代理管理',
      '登录时间': '登录时间',
      '验证码': '验证码',
      '源卡类型': '源卡类型',
      '目标卡类型': '目标卡类型',
      '目标卡ip': '目标卡ip',
      "代理名": "代理名",
      "报表记录": "报表记录",
      "游戏方管理": "游戏方管理",
      "游戏放名称": "游戏放名称",
      "费率": "费率",
      "回调地址": "回调地址",
      "锁定金额": "锁定金额",
      "修改游戏方": "修改游戏方",
      "新增游戏方": "新增游戏方",
      "秘钥": "秘钥",
      "所属代理": "所属代理",
      "提现额度": "提现额度",
      "批量清空": "批量清空",
      "修改支付宝账号": "修改账号",
      "支付宝账号": "支付宝账号",
      "游戏方备注": "游戏方备注",
      "类别": "类别",
      "二维码跳转": "二维码跳转",
      "支付密码": "支付密码",
      "谷歌开关": "谷歌开关",
      "导出": "导出",
      "图片管理": "图片管理",
      "图片": "图片",
      "可用图片": "可用图片",
      "超时时间": "超时时间",
      "真实地址": "真实地址",
      "二维码地址": "二维码地址",
      "图片名称": "图片名称",
      "可用": "可用",
      "修改时间": "修改时间",
      "最低额度": "最低额度",
      "最高额度": "最高额度",
      "支付key": "支付key",
      "固码类型": "固码类型",
      "检测报表": "检测报表",
      "修正": "修正"
    })
    .constant('loc_language_cn', {
      '登录': '登录',
      '用户': '用户',
      '银行卡': '银行卡',
      '收款': '收款',
      '付款': '付款',
      '匹配单号': '匹配单号',
      '报表': '报表',
      '系统管理': '系统管理',
      '管理': '管理',
      '设置': '设置',
      '登录成功': '登录成功',
      '登出': '登出',
      '账号管理': '账号管理',
      '转账提醒': '转账提醒',
      '所属银行': '银行',
      '所属类型': '类型',
      '单页数量': '数量',
      '转款卡信息': '转款卡信息',
      '操作方式': '操作方式',
      '查询': '查询',
      '更新': '更新',
      '绑定电话': '绑定电话',
      '今日交易': '今日收入',
      '目前余额': '目前余额',
      '当前状态': '当前状态',
      '创建': '创建',
      '删除': '删除',
      '调整余额': '调整余额',
      '余额限制': '余额限制',
      '生成时间': '生成时间',
      '操作提示': '操作提示',
      '生成转账': '生成转账',
      '收款卡信息': '收款卡信息',
      '账号余额': '账号余额',
      '创建时间': '创建时间',
      '转账卡信息': '转账卡信息',
      '转账金额': '转账金额',
      '任务状态': '任务状态',
      '查询余额': '查询余额',
      '已完成': '已完成',
      '名称': '名称',
      '所属设备': '所属设备',
      '领取任务': '领取任务',
      '继续任务': '继续任务',
      '商户号': '商户号',
      '商户地址': '商户地址',
      '商户类型': '商户类型',
      '交易限额': '交易限额',
      '备注': '备注',
      '详细信息': '详细信息',
      '银行卡卡号': '银行卡号',
      '设备号': '设备号',
      '存款方式': '存款方式',
      '名字': '名字',
      '城市': '城市',
      '存款手续费': '存款手续费',
      '金额': '金额',
      '银行余额': '银行余额',
      'proposalId': 'proposalId',
      '创建人': '创建人',
      'empCreator': 'empCreator',
      '设备列表': '设备列表',
      '选择卡号': '选择卡号',
      '输入余额': '输入余额',
      '签入': '签入',
      '签出': '签出',
      '申请单号': '申请单号',
      '会员等级': '会员等级',
      '提款金额': '提款金额',
      '取消任务': '取消任务',
      '输入金额': '输入金额',
      '(确认给用户汇款后，请在此输入付款卡余额，再点击完成任务)': '(确认给用户汇款后，请在此输入付款卡余额，再点击完成任务)',
      '完成': '完成',
      '当前订单总量': '当前订单总量',
      '订单数量': '订单数量',
      '预警订单': '预警订单',
      '处理设备': '处理设备',
      '设备名称': '设备名称',
      '操作员': '操作员',
      '签入银行': '签入银行',
      '提案单号': '提案单号',
      '开户姓名': '姓名',
      '银行账号': '账号',
      '所属平台': '平台',
      '手工收款': '手工收款',
      '自动收款监控': '自动收款监控',
      '监控手工付款': '监控手工付款',
      '付款链接': '付款链接',
      '转账任务': '转账任务',
      '付款对账单': '付款对账单',
      '手工付款': '手工付款',
      '收付款设置': '收付款设置',
      '设备管理': '设备管理',
      '客户端管理': '客户端管理',
      '奖品管理': '奖品管理',
      '银行LOGO': '银行LOGO',
      '银行代码': '银行代码',
      '优先等级': '优先等级',
      '修改': '修改',
      '网关地址': '网关地址',
      '日总限额': '日总限额',
      '玩家单日限额': '单日限额',
      '单笔限额': '单笔限额',
      '收款明细': '收款明细',
      '操作': '操作',
      '自动付款': '自动付款',
      '设定限额': '设定限额',
      '创建日期': '创建日期',
      '银行类型': '银行类型',
      '添加': '添加',
      '客户ID': '客户ID',
      '存款日期': '存款日期',
      '存款时间': '存款时间',
      '存款金额': '存款金额',
      '产品别': '产品别',
      '存款人姓名': '存款人姓名',
      '存款人城市': '存款人城市',
      '其他备注': '备注',
      '确认客户ID': '确认客户ID',
      '冻结': '冻结',
      '正常': '正常',
      '禁用': '禁用',
      '收款银行': '收款银行',
      '存款地址': '存款地址',
      '存款卡': '存款卡',
      '转账余额': '提现额度',
      '付款人': '提现姓名',
      '状态': '状态',
      '支付类型': '支付类型',
      '手续费': '手续费',
      '操作账号': '操作账号',
      '收款卡': '收款卡',
      '开始时间': '开始时间',
      '结束时间': '结束时间',
      '到': '到',
      '该选项不能为空': '该选项不能为空',
      '必填': '必填',
      '格式不正确': '格式不正确',
      '输入不一致': '输入不一致',
      '必须数字': '必须数字',
      '两次输入不一致': '两次输入不一致',
      '该选项输入格式不正确': '该选项输入格式不正确',
      '必须输入数字': '必须输入数字',
      '该输入值已经存在，请重新输入': '该输入值已经存在，请重新输入',
      '展开': '展开',
      '付款详情': '付款详情',
      '提款单号': '提款单号',
      '申请额度': '申请额度',
      '付款所属银行': '银行',
      '付款银行账号': '银行卡号',
      '付款开户姓名': '开户姓名',
      '用户名': '用户名',
      '创建者': '创建者',
      '密码': '密码',
      '真实姓名': '真实姓名',
      '功能': '功能',
      '修改权限': '修改权限',
      '昵称': '昵称',
      '自动匹配': '自动匹配',
      '提交单号': '提案号',
      '付款人姓名': '姓名',
      '付款方式': '付款方式',
      '付款金额': '金额',
      '提交存款单': '提交存款单',
      '收款金额': '收款金额',
      '手动匹配': '手动匹配',
      '银行收款单': '银行收款单',
      '匹配': '匹配',
      '付款银行': '银行',
      '成功': '成功',
      '失败': '失败',
      '工商银行': '工商银行',
      '兴业银行': '兴业银行',
      '生成转账任务': '生成转账任务',
      '转账额度': '转账额度',
      '确定': '确定',
      '取消': '取消',
      '确认': '确认',
      '请选择转账到指定账号': '请选择转账到指定账号',
      '创建商户号': '创建商户号',
      '付款类型': '付款类型',
      '用途': '用途',
      '使用平台': '使用平台',
      '商户': '商户',
      '无效支付服务网关': '无效支付服务网关',
      '没有足够的银行卡': '没有足够的银行卡',
      '平台不存在': '平台不存在',
      '平台已存在': '平台已存在',
      '无效参数': '无效参数',
      '平台不可用': '平台不可用',
      '电话号码验证错误': '电话号码验证错误',
      '银行卡已经存在': '银行卡已经存在',
      '已经被领取或者已完成': '已经被领取或者已完成',
      '该任务已完成': '该任务已完成',
      '该卡已经被签入,不能重复签入': '该卡已经被签入,不能重复签入',
      '付款单不存在出款单': '付款单不存在出款单',
      '付账卡异常状态或不存在': '付账卡异常状态或不存在',
      '总额度必须等于付款额度': '总额度必须等于付款额度',
      '移除部门失败': '移除部门失败',
      '设备名称已经存在': '设备名称已经存在',
      '名称不能重复': '名称不能重复',
      '银行收款单已经是完成状态': '银行收款单已经是完成状态',
      '收款单号不存在': '收款单号不存在',
      '手工匹配单已经是完成状态': '手工匹配单已经是完成状态',
      '手工匹配单号不存在': '手工匹配单号不存在',
      '参数不能为空': '参数不能为空',
      '更新失败': '更新失败',
      '转账卡余额必须大于转账余额': '转账卡余额必须大于转账余额',
      '生成转账任务失败': '生成转账任务失败',
      '任务状态没有初始化': '任务状态没有初始化',
      '任务已经被领取': '任务已经被领取',
      '取消失败，任务状态为异常或者失败状态': '取消失败，任务状态为异常或者失败状态',
      '取消失败，任务状态为成功': '取消失败，任务状态为成功',
      '取消失败，任务已经作废': '取消失败，任务已经作废',
      '领取任务人和取掉任务人必须一致': '领取任务人和取掉任务人必须一致',
      '账单任务还未被领取': '账单任务还未被领取',
      '领取任务人和完成任务人必须一致': '领取任务人和完成任务人必须一致',
      '该任务已不存在': '该任务已不存在',
      '用户名已经存在': '用户名已经存在',
      '用户在系统中不存在': '用户在系统中不存在',
      '传入用户ID不能为空': '传入用户ID不能为空',
      '用户名或者密码错误': '用户名或者密码错误',
      '用户被锁定': '用户被锁定',
      '操作成功': '操作成功',
      '权限密码错误': '权限密码错误',
      '请先选择银行卡': '请先选择银行卡',
      '输入的格式不正确': '输入的格式不正确',
      '麻烦留点': '麻烦留点',
      '点击选择文件': '点击选择文件',
      '用户管理': '用户管理',
      '请先选择单号': '请先选择单号',
      '请选择银行卡流水': '请选择银行卡流水',
      '请选择银行卡': '请选择银行卡',
      '创建商户类型': '创建商户类型',
      '修改商户类型': '修改商户类型',
      '创建网关地址': '创建网关地址',
      '网关名称': '网关名称',
      '修改网关地址': '修改网关地址',
      '创建交易限额': '创建交易限额',
      '代码': '代码',
      '修改交易限额': '修改交易限额',
      '更改设备名称': '更改设备名称',
      '原设备名称': '原设备名称',
      '权限密码': '权限密码',
      '加入处理设备': '加入处理设备',
      '创建银行卡账号': '创建银行卡账号',
      '设置设备名称': '设置设备名称',
      '修改商户号': '修改商户号',
      '商户号详情': '商户号详情',
      '备用卡': '备用卡',
      '付款卡': '付款卡',
      '获取数据中': '获取数据中',
      '角色': '角色',
      '平台': '平台',
      '权限管理': '权限管理',
      '添加扣除': '添加扣除',
      '地址': '地址',
      '存款单号': '存款单号',
      '余额': '余额',
      '开户地址': '开户地址',
      '所在地': '所在地',
      '绑定商户号': '商户号',
      '证书到期日': '证书到期',
      '银行网点': '银行网点',
      '项目': '项目',
      '最后使用时间': '最后使用时间',
      '在线支付补单': '支付补单',
      '支付补单': '支付补单',
      '单号': '单号',
      '支付平台': '支付平台',
      '新开户': '新开户',
      '账号': '账号',
      '姓名': '姓名',
      '来源IP': '来源IP',
      '加入时间': '加入时间',
      '返回处理时间': '返回处理时间',
      '补单': '补单',
      '所属用户': '所属用户',
      '用户没绑定有效的付款卡': '用户没绑定有效的付款卡',
      '用户没绑定有效的收款卡': '用户没绑定有效的收款卡',
      '创建部门': '创建部门',
      '修改用户': '修改用户',
      '创建角色': '创建角色',
      '修改角色': '修改角色',
      '说明': '说明',
      '有子集目录不允许删除': '有子集目录不允许删除',
      '用户登录': '用户登录',
      '跳转': '跳转',
      '部门': '部门',
      '创建用户': '创建用户',
      '修改银行卡账号': '修改银行卡账号',
      '开始转账': '开始转账',
      '手工匹配': '手工匹配',
      '银行存款单': '银行存款单',
      '更新收款明细': '更新收款明细',
      '汇款人': '汇款人',
      '二维码': '二维码',
      '同步': '刷新',
      '创建银行类型': '创建银行类型',
      '修改银行类型': '修改银行类型',
      '普通存款': '普通存款',
      '开户存款': '开户存款',
      '网银转账': '网银转账',
      '现金在柜台汇款': '现金在柜台汇款',
      '电话转账': '电话转账',
      '跨行转账': '跨行转账',
      '支付宝': '支付宝',
      '执行中': '执行中',
      '自动审核': '自动审核',
      '审计': '审计',
      '进行中': '进行中',
      '未知': '未知',
      '网页': '网页',
      '手机': '手机',
      '两者': '两者',
      '网银': '网银',
      '微信扫描': '微信扫描',
      '支付宝扫码': '支付宝扫码',
      '微信App': '微信App',
      '支付宝App': '支付宝App',
      '待完成': '待完成',
      '启用': '启用',
      '不可用': '不可用',
      '上一页': '上一页',
      '下一页': '下一页',
      '在线补单': '在线补单',
      '共': '共',
      '页': '页',
      '生产转账': '生产转账',
      '修改密码': '修改密码',
      '新密码': '新密码',
      '旧密码': '旧密码',
      '确认密码': '确认密码',
      '推给acc': '推给acc',
      '提案号': '提案号',
      '事件动作': '事件动作',
      '时间段': '时间段',
      '金额变动': '金额变动',
      '前余额': '前余额',
      '后余额': '后余额',
      '金额段': '金额段',
      '条': '条',
      '源卡信息': '源卡卡号',
      '目标卡信息': '提现卡号',
      '公司承担手续费': '公司承担手续费',
      '总计': '总计',
      '小计': '小计',
      '最近一次的录入记录': '最近一次的录入记录',
      '最近一次的帐变记录': '最近一次的帐变记录',
      '处理时间': '处理时间',
      '开户行': '开户行',
      '取款单号': '取款单号',
      '总收款明细': '总收款明细',
      '支出明细': '支出明细',
      '提案列表': '提案列表',
      '付款提案': '付款提案',
      '提现提案': '提现提案',
      '游戏账号': '游戏账号',
      '倒数时间': '倒数时间',
      '客户等级': '客户等级',
      '实时信息': '实时信息',
      '提案明细': '提案明细',
      '转账单号': '转账单号',
      '图片过大': '图片过大',
      '总转账任务': '总转账任务',
      '总支出明细': '总支出明细',
      '创建操作员': '创建操作员',
      '操作员列表': '操作员列表',
      '查看操作员': '查看操作员',
      '操作员姓名': '操作员姓名',
      '最后修改时间': '最后修改时间',
      '修改操作员': '修改操作员',
      '先选择操作员': '先选择操作员',
      '多窗口': '多窗口',
      '请选择操作员': '请选择操作员',
      '语言': '语言',
      '重置密码': '重置密码',
      '自动刷新': '自动刷新',
      '银行卡额度不一致': '银行卡额度不一致',
      '账号已在其他地方登陆.': '退出时，需提示 您已退出，有人使用您的帐户登入。',
      '银行卡没有符合条件的流水,请录入流水或者取消单号': '银行卡没有符合条件的流水,请录入流水或者取消单号',
      '流水号': '流水号',
      '商户统计': '商户统计',
      '第三方订单号退回': '第三方订单号退回',
      '电话呼出': '电话呼出',
      '商户支付类型': '商户支付',
      '手动补单': '手动补单',
      '第三方回调': '第三方回调',
      '过期时间': '过期时间',
      '补录流水': '补录流水',
      '报表统计': '报表统计',
      'app管理': 'app管理',
      '所属ip': '序列号',
      '执行时间': '执行时间',
      '充值记录': '充值记录',
      '提现记录': '提现记录',
      '绑定银行卡': '绑定银行',
      '账户明细': '账户明细',
      '收款记录': '收款记录',
      '代理管理': '代理管理',
      '登录时间': '登录时间',
      '验证码': '验证码',
      '源卡类型': '源卡类型',
      '目标卡类型': '目标卡类型',
      '目标卡ip': '目标卡ip',
      "代理名": "代理名",
      "报表记录": "报表记录",
      "游戏方管理": "游戏方管理",
      "游戏放名称": "游戏放名称",
      "费率": "费率",
      "回调地址": "回调地址",
      "锁定金额": "锁定金额",
      "修改游戏方": "修改游戏方",
      "新增游戏方": "新增游戏方",
      "秘钥": "秘钥",
      "所属代理": "所属代理",
      "提现额度": "提现额度",
      "组别": "组别",
      "批量清空": "批量清空",
      "修改支付宝账号": "修改账号",
      "支付宝账号": "支付宝账号",
      "游戏方备注": "游戏方备注",
      "类别": "类别",
      "二维码跳转": "二维码跳转",
      "支付密码": "支付密码",
      "谷歌开关": "谷歌开关",
      "导出": "导出",
      "图片管理": "图片管理",
      "图片": "图片",
      "可用图片": "可用图片",
      "超时时间": "超时时间",
      "真实地址": "真实地址",
      "二维码地址": "二维码地址",
      "图片名称": "图片名称",
      "可用": "可用",
      "修改时间": "修改时间",
      "支付key": "支付key",
      "最低额度": "最低额度",
      "最高额度": "最高额度",
      "固码类型": "固码类型",
      "检测报表": "检测报表",
      "修正": "修正"
    });
  //.constant('devicelist',{})
  //.constant('depositlist',{})
  //.constant('platformlist',{});


})();
