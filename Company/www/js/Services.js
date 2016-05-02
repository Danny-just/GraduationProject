/**
 * Created by danny on 2015/12/5.
 */
angular.module('Company.Services',[])
  .service('InService',['$http','$q',function($http,$q){
    this.data={};
    this.salesGoods=function(sales){
      var deferred = $q.defer();
      var userName=encodeURI(encodeURI('王超'));
      var goodsName=encodeURI(encodeURI(sales.goodsName));
      var memberName=encodeURI(encodeURI(sales.memberName));
      return $http.jsonp("http://127.0.0.1:8080/Huang/SalesHistory/PostHistory?userName=" +
        userName +"&goodsName="+goodsName+"&salesNumber="+sales.salesNumber+"&memberName="+memberName+
        "&discount="+sales.discount+"&goodsPrice="+sales.goodsPrice+"&sum="+sales.sum+"&goodsNumber="+sales.goodsNumber+
        "&memberId="+sales.memberId+"&callback=JSON_CALLBACK")
        .success(function (data, status, header, config) {
          this.data = data;
          console.log(this.data);
          return $q.when(data);
        }).error(function () {
          alert("error");
        });
    }
  }])
  .service('GoodsService',['$http','$q',"$location",function($http,$q,$location){
    this.data={};
    this.getGoods=function(userName) {
      userName = encodeURI(encodeURI(userName));
      var deferred = $q.defer();
      return $http.jsonp("http://127.0.0.1:8080/Huang/Goods/GetGoods?userName=" +
        userName + "&callback=JSON_CALLBACK")
        .success(function (data, status, header, config) {
          this.data = data;
          console.log(this.data);
          return $q.when(data);
        }).error(function () {
          alert("error");
        });
    }
    this.deleteGoods=function(id){
      var deferred = $q.defer();
      return $http.jsonp("http://127.0.0.1:8080/Huang/Goods/DeleteGoods?id=" +
        id + "&callback=JSON_CALLBACK")
        .success(function (data,status,header,config){
          this.data = data;
          console.log(this.data);
          return $q.when(data);
      }).error(function(){
        alert("error");
      })
    }
    this.getDetail=function(goods){
      console.log(goods);
      $location.search('goods',goods);
      $location.path("/templates/goodsDetail");
      var curUrl = $location.absUrl();
      console.log(curUrl);
    }
  }])
  .service('RegisterService',['$http','$q',function($http,$q){
    this.data={};
    this.register=function(User,rePassWd) {
      if(User.passWord == rePassWd){
        alert("passWd is right");

        return this.registerTo(User);
      }else{
        alert("please require passWd is right");
        return false;
      }
    }
    this.registerTo=function(User){
      var deferred = $q.defer();
      var userName=encodeURI(encodeURI(User.userName));
      var passWord=encodeURI(encodeURI(User.passWord));
      var ema=encodeURI(encodeURI(User.ema));
      console.log(User);
      return $http.jsonp("http://192.168.0.5:8080/Huang/User/registerToAction?userName="+userName+"&passWord="+
        passWord+"&tel="+User.tel+"&myEmail"+ema+"&callback=JSON_CALLBACK")
        .success(function (data,status,header,config ){
          console.log(data);
          this.data=data;
          return $q.when(data);
        }).error(function() {
          alert("error");
        });
    }
  }])
  .service('LoginService',['$http','$q',function($http,$q){
    this.data={};
    this.login=function(mod){
      var deferred = $q.defer();
      var userName;
      var passWord;
      userName=encodeURI(encodeURI(mod.userName));
      passWord=encodeURI(encodeURI(mod.passWord));
      return $http.jsonp("http://192.168.0.5:8080/Huang/User/loginToAction?userName="+userName+"&passWord="+passWord
        +"&callback=JSON_CALLBACK")
        .success(function (data,status,header,config ){
          this.data=data;
          return $q.when(data);
        }).error(function() {
          alert("error");
        });
    }
  }])
  .service('MemberService',['$http','$q','$location',function($http,$q,$location){
    this.data={};
    console.log("sss");
    this.getMembers=function(userName){
      var deferred = $q.defer();
      userName=encodeURI(encodeURI(userName));
      return $http.jsonp("http://127.0.0.1:8080/Huang/Member/getMember?userName="+userName
        +"&callback=JSON_CALLBACK")
        .success(function (data,status,header,config ){
          this.data=data;
          return $q.when(data);
        }).error(function() {
          alert("error");
        });
    }
    this.deleteMember=function(id){
      console.log(id);
      var deferred = $q.defer();
      id=encodeURI(encodeURI(id));
      return $http.jsonp("http://127.0.0.1:8080/Huang/Member/deleteMember?id="+id
        +"&callback=JSON_CALLBACK")
        .success(function (data,status,header,config){
          this.data=data;
          return $q.when(data);
        }).error(function() {
          alert("error");
        });
    }
    this.getDetail=function(member){
      console.log(member);
      $location.search('member',member);
      $location.path("/templates/memberDetail");
      var curUrl = $location.absUrl();
      console.log(curUrl);
    }
  }])
  .service('MemberPostService',['$http','$q',"$location",function($http,$q,$location){
    this.data={};
    console.log("jjj");
    this.postMember=function(member){
      var deferred = $q.defer();
      var userName;
      var memberName;
      userName=encodeURI(encodeURI(member.userName));
      memberName=encodeURI(encodeURI(member.memberName));
      return $http.jsonp("http://127.0.0.1:8080/Huang/Member/postMember?userName="+userName+"&memberName="+memberName
        +"&memberNumber="+member.memberNumber+"&memberTel="+member.tel+"&callback=JSON_CALLBACK")
        .success(function (data,status,header,config ){
          this.data=data;
          return $q.when(data);
        }).error(function() {
          alert("error");
        });
    }
    this.changeMemberURL=function(){
        $location.path("/templates/member");
        var curUrl = $location.absUrl();
        console.log(curUrl);
    }
  }])
  .service('SalesHistoryService',['$http','$q',function($http,$q){
    this.data={};
    this.getSalesHistory = function(userName){
      userName = encodeURI(encodeURI(userName));
      var defer = $q.defer();
      return $http.jsonp("http://127.0.0.1:8080/Huang/SalesHistory/GetHistory?userName=" +
        userName + "&callback=JSON_CALLBACK").success(function (data, status, header, config){
        this.data = data;
        console.log(data);
        return $q.when(data);
      }).error(function(res){
        alert("error");
      })

    }
  }])
  .service('RejectionService',['$http','$q',function($http,$q){
    this.data = {};
    this.getRejection = function(userName){
      userName = encodeURI(encodeURI(userName));
      var defer = $q.defer();
      return $http.jsonp("http://127.0.0.1:8080/Huang/Rejection/GetRejection?userName=" +
        userName + "&callback=JSON_CALLBACK").success(function(data){
        console.log(data);
        this.data = data;
        return $q.when(data);
      }).error(function(){
        alert("error");
      })
    }
  }])
  .service('RejectionGoodsService',['$http','$q',function($http,$q){
    this.data={};
    this.rejectionGoods=function(rejection){
      var deferred = $q.defer();
      var userName=encodeURI(encodeURI('王超'));
      var goodsName=encodeURI(encodeURI(rejection.goodsName));
      var memberName=encodeURI(encodeURI(rejection.memberName));
      return $http.jsonp("http://127.0.0.1:8080/Huang/Rejection/PostRejection?userName=" +
        userName +"&goodsName="+goodsName+"&rejectedNumber="+rejection.rejectionNumber+"&memberName="+memberName+
        "&goodsPrice="+rejection.goodsPrice+"&rejectedSum="+rejection.rejectionSum+"&goodsNumber="+rejection.goodsNumber+
        "&memberId="+rejection.memberId+"&callback=JSON_CALLBACK")
        .success(function (data, status, header, config) {
          this.data = data;
          console.log(this.data);
          return $q.when(data);
        }).error(function () {
          alert("error");
        });
    }
  }])
