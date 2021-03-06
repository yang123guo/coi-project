/**
 * Created by zhengguo.chen on 2015/11/17.
 */
var CONST = require('../constant');
var $ = require('jquery');

module.exports = myApp =>
  myApp.factory('apiService', ['$http', '$rootScope', '$timeout',
    ($http, $rootScope, $timeout) => {
      const makeService = request => (data={}, notLoading=false, notAlert=false) => {
        !notLoading && $rootScope.loading(true);
        var promise = $http({
          method: request.method,
          url: CONF.baseUrl + request.url,
          cache: false,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          //GET防止缓存
          params: request.method == 'GET' ? (data ? $.extend({'_':new Date().getTime()}, data): null): null,
          data:  request.method == 'POST' ? (data ? $.param(data): null) : null
        }).success(res => {
          $rootScope.loading(false);
          if(res.success == CONST.API_ERROR) {
            !notAlert && res.ErrMsg && $rootScope.showTips({
              type: 'error',
              msg: res.ErrMsg
            });
          }
        }).error(res => {
          $rootScope.loading(false);
          //passport session out
          //if(res === 'InvalidSession') {
          //  top.location.reload();
          //} else {
          //  !notLoading && $rootScope.loading(false);
          //  $rootScope.showTips({
          //    type: 'error'
          //  });
          //}
        });

        return promise;
      }

      var services = {};

      //======初始化各个服务接口======

      //登录------
      services.login = makeService({method: 'POST', url: '/util/Login.action'});
      services.getSessionInfo = makeService({method: 'POST', url: '/util/GetSessionInfo.action'});

      //数据包------
      services.getAllUnSubMission = makeService({method: 'POST', url: '/mission/GetAllUnSubMission.action'});
      services.getAllUnCheMission = makeService({method: 'POST', url: '/mission/GetAllUnCheMission.action'});
      services.createNewMission = makeService({method: 'POST', url: '/mission/CreateNewMission.action'});
      services.getRefDataByMission = makeService({method: 'POST', url: '/mission/GetRefDataByMission.action'});
      services.checkMission = makeService({method: 'POST', url: '/mission/CheckMission.action'});
      services.checkMissionOnce = makeService({method: 'POST', url: '/mission/CheckMissionOnce.action'});
      services.checkDataOption = makeService({method: 'POST', url: '/mission/CheckDataOption.action'});
      services.submitMission = makeService({method: 'POST', url: '/mission/SubmitMission.action'});

      //数据------
      services.getDataDetail = makeService({method: 'POST', url: '/data/GetDataDetail.action'});
      services.addData = makeService({method: 'POST', url: '/data/AddData.action'});
      services.addData.url = CONF.baseUrl + '/data/AddData.action';
      services.updateData = makeService({method: 'POST', url: '/data/UpdateData.action'});
      services.updateData.url = CONF.baseUrl + '/data/UpdateData.action';

      //获取所有的工程信息数据
      services.getAllProjectInfo = makeService({method: 'POST', url: '/data/GetAllProjectInfo.action'});

      //查询非工程样地
      services.queryFpjByCondition = makeService({method: 'POST', url: '/data/QueryFpjByCondition.action'});

      //获取非工程草本样方列表，w是草本
      services.queryFwqudByCondition = makeService({method: 'POST', url: '/data/QueryFwqudByCondition.action'});

      //获取非工程样方关联
      services.queryFqudBySmpId = makeService({method: 'POST', url: '/data/QueryFqudBySmpId.action'});

      //获取非工程灌木样方列表，b是灌木
      services.queryFbqudByCondition = makeService({method: 'POST', url: '/data/QueryFbqudByCondition.action'});

      //查询工程样地
      services.QueryPjByCondition = makeService({method: 'POST', url: '/data/QueryPjByCondition.action'});

      //查询工程草本样方列表，w是草本
      services.QueryPwqudByCondition = makeService({method: 'POST', url: '/data/QueryPwqudByCondition.action'});

      //获取非工程灌木样方列表，b是灌木
      services.QueryPbqudByCondition = makeService({method: 'POST', url: '/data/QueryPbqudByCondition.action'});

      //获取工程样方关联
      services.QueryPqudBySmpId = makeService({method: 'POST', url: '/data/QueryPqudBySmpId.action'});

      //获取分县牧户补饲调查数据
      services.QuerySupfeedCouByCondition = makeService({method: 'POST', url: '/data/QuerySupfeedCouByCondition.action'});

      //获取分户牧户补饲调查数据
      services.QuerySupfeedPerByCondition = makeService({method: 'POST', url: '/data/QuerySupfeedPerByCondition.action'});

      //获取生态环境调查数据
      services.QueryEnvsurvByCondition = makeService({method: 'POST', url: '/data/QueryEnvsurvByCondition.action'});

      //获取返青春样地
      services.QueryGreenSampleByCondition = makeService({method: 'POST', url: '/data/QueryGreenSampleByCondition.action'});

      //根据返青春样地获取返青春样方
      services.QueryGreenqudBySmpId = makeService({method: 'POST', url: '/data/QueryGreenqudBySmpId.action'});

      //获取行政区------
      services.regionAutoComp = makeService({method: 'POST', url: '/util/RegionAutoComp.action'});

      //通用
      services.getGrassBType = makeService({method: 'POST', url: '/util/GetGrassBType.action'});
      services.getGrassSType = makeService({method: 'POST', url: '/util/GetGrassSType.action'});

      //获取下级用户列表
      services.getSubUserList = makeService({method: 'POST', url: '/util/GetSubUsers.action'});
      services.changePwd = makeService({method: 'POST', url: '/util/ChangePwd.action'});
      services.changePwdByUser = makeService({method: 'POST', url: '/util/ChangePwdByUser.action'});


      return services;
    }
  ]);
