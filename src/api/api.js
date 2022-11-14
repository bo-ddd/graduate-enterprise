import axios from 'axios';

import { postConfig,getConfig } from './config'


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么,一般配置一些请求头的公共信息；
    config.headers.token = sessionStorage.getItem('token');
    return config;
})

// 添加响应拦截器  概念：每次调用接口之后都会走到此方法中，服务端返回数据后优先走到此方法，之后才会走到 // // // //axiox.get()/axios.post() 的then方法中；
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么，一般可以把登录失效后的逻辑添加到此处，所有需要登录接口的判断都可以写到此处，这样就不用每个接口都判断用户是否登录，如果没有登录就跳转到登录页面去的逻辑；抽离业务逻辑的好地方；
    if (response.data.status == 401) {
        // window.location.href = '/login'
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    console.log('get error:', error)
    return {
        code: -1,
        msg: '网络异常'
    }
});

//接口定义的方式；  //这个项目中，在这个地方声明接口；
export default {
    //登录
    login: (params) => {
        return axios.post('/company/login', params, postConfig)
    },


    getEducation:(params)=>{
        return axios.post('/drop/getEducation',params,postConfig)
    },

    /**
     * 获取学历下拉框
     */
    getEducationList:(params)=>{
        return axios.post('/drop/getEducation',params,postConfig);
    },

    /**
     * 获取企业详细信息
     */
    getEnterpriseInfo: (params) => {
        return axios.post('/company/getCompanyCommon', params, postConfig);
    },
    
    /**
     * 修改企业详细信息
     */
    setModifyEnterpriseInfo:(params)=>{
        return axios.post('/company/modifyCompanyCommon',params,postConfig);
    },

    /**
     * 获取所属行业下拉框
     */
    getIndustryList: (params) => {
        return axios.post('/drop/getCompanyIndustry', params, postConfig);
    },

    /**
     * 获取企业性质下拉框
     */
    getEnterpriseNatureList: (params) => {
        return axios.post('/drop/getCompanyNature', params, postConfig);
    },
    
    /**
     * 获取企业规模下拉框
     */
    getEnterpriseSizeList: (params) => {
        return axios.post('/drop/getCompanySize', params, postConfig);
    },
    
    /**
     * 获取企业标签下拉框
     */
    getEnterpriseTagList: (params) => {
        return axios.post('/drop/getCompanyTag', params, postConfig);
    },
    
    /**
     * 获取学校下拉框
     */
    getSchoolList: (params) => {
        return axios.post('/drop/getSchool', params, postConfig);
    },


    /**
     * 获取专业下拉框
     */
    getMajorList:(params)=>{
        return axios.post('/drop/getProfessional',params,postConfig);
    },

    /**
     * 获取期望薪资
     */
    getWishMoney:(params)=>{
        return axios.post('/drop/getWishMoney',params,postConfig);
    },

    /** 
     * 获取性别列表
     * */ 
    getSexList:(params={})=>{
        return axios.post('/drop/getSex',params,postConfig);
    },

    /**
     * 获取企业职位列表
     */
     getPositionDrop:(params)=>{
        return axios.post('/drop/getPositionDrop',params,postConfig);
    },

    /**
     * 获取人才列表
     */
    getTalentList:(params)=>{
        return axios.post('/company/getTalent',params,postConfig);
    },
    getResume:(params)=>{
        return axios.post('/company/getResume',params,postConfig);
    },

    /**
     * 获取实习月数和天数下拉框
     */
    getMonthDay:(params)=>{
        return axios.post('/drop/drop/getMonthDay',params,postConfig);
    },

    /**
     * 获取职位类别下拉框
     */
    getCompanyIndustry:(params)=>{
        return axios.post('/drop/getCompanyIndustry',params,postConfig);
    },
        
    /**
     * 获取企业职位列表
     */
     getPositionData:(params)=>{
        return axios.post('/company/getPosition',params,postConfig);
    },
        
    /**
     * 获取实习薪资下拉列表
     */
     getInternshipMoney:(params)=>{
        return axios.post('/drop/getInternshipMoney',params,postConfig);
    },
    /**
     * 发布职业
     */
     releasePosition:(params)=>{
        return axios.post('/company/releasePosition',params,postConfig);
    },

    /**
     * 应聘阶段下拉框
     */
    getStage:(params)=>{
        return axios.post('/drop/getStage',params,postConfig);
    },

    /**
     * 修改简历状态
     */
     modifyResume:(params)=>{
        return axios.post('/company/modifyResume',params,postConfig);
     },

     /**
      * 邀请人才列表
      */
      getInvite:(params)=>{
        return axios.post('/company/getInvite',params,postConfig);
      },

      /**
       * 邀请人才
       */
      inviteTalent:(params)=>{
        return axios.post('/company/inviteTalent',params,postConfig)
      },
      /**
       * 删除职位
       */
      deletePosition:(params)=>{
        return axios.post('/company/delPosition',params,postConfig)
      },
      /**
       * 修改职位信息
       */
       modifyPosition:(params)=>{
        return axios.post('/company/modifyPosition',params,postConfig)
      },
      /**
       * 获取VIP下拉框
       */
       getVip:(params)=>{
        return axios.post('/drop/getVip',params,postConfig)
      },

      /**
       * 获取职位类别下拉框
       */
      getPosition:(params)=>{
        return axios.post('/drop/getPosition',params,postConfig);
      },

      /**
       *批量修改状态
       */
     modifyResumeStatus:(params)=>{
        return axios.post('/company/modifyResumeStatus',params,postConfig)
     },
     /**
       *支付宝支付
       */
     payment:(params)=>{
        let towParams = '?';
         for (let key in params) {
            towParams += `${key}=${params[key]}&`
        };
        return axios.get(`/pay${towParams}`,getConfig)
     },
     /**
       * 修改职位状态
       */
      modifyPositionStatus:(params)=>{
        return axios.post('/company/modifyPositionStatus',params,postConfig)
      },
      /**
        * 获取职位信息
        */
       getPositionDetail:(params)=>{
         return axios.post('/company/getPositionById',params,postConfig)
       },
      /**
        * 刷新职位
        */
       refreshPosition:(params)=>{
         return axios.post('/company/refreshPosition',params,postConfig)
       },
      /**
        * @describe 修改企业意向学校
        * @param 
        */
       setEnterpriseSchoolOfIntention:(params)=>{
         return axios.post('/company/modifyCompanyWishSchool',params,postConfig)
       },
}