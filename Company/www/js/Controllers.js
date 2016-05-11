/**
 * Created by danny on 2015/12/5.
 */
angular.module('Company.Controllers',['Company.Services'])
  .controller("InController",['$scope','$cordovaBarcodeScanner','InService','$ionicPopup',function($scope,$cordovaBarcodeScanner,InService,$ionicPopup){

    $scope.submitForm = function(isValid) {
      if (!isValid) {
        alert('验证失败');
      }
    };
    $scope.title='销售';
    $scope.getSum = function(){
      $scope.sales.sum=$scope.sales.goodsPrice * $scope.sales.salesNumber * $scope.sales.discount;
    }

    $scope.salesGoods=function(){
      $ionicPopup.confirm({
        title: "确认销售？",
        /*template: "确认创建",*/
        Text: "OK"
      }).then(function(res){
        if(res == true){
          console.log($scope.sales);
          InService.salesGoods($scope.sales).then(function (res){
            if(res.data.returnState=="200"){
              alert("销售成功!");
              $scope.sales=null;
            }else{
              alert("销售失败!");
            }
          },function(rej){});
        }else{

        }
      });

    }


    $scope.scanBarcode=function(){
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        alert(imageData.text);
        $scope.number=imageData.text;
        alert($scope.number);
      }, function (error) {
      });
    }

  }])
  .controller("GoodsController",['$scope','GoodsService','$cordovaBarcodeScanner','$ionicPopup','$location',function($scope,GoodsService,$cordovaBarcodeScanner,$ionicPopup,$location){
    $scope.title="销售";
    GoodsService.getGoods().then(function (res){
      console.log(res.data.goods);
      $scope.Goods=res.data.goods;
    },function(rej){});

    $scope.getDetail= function(goods){
      //console.log($scope.goods);
      $location.search('goods',goods);
      $location.path("/templates/goodsDetail");
      /*$location.search('member',member);
      $location.path("/templates/memberDetail");*/
    }
    $scope.deleteGoods=function(id) {
      $ionicPopup.confirm({
        title: "确认删除？",
        /*template: "确认创建",*/
        Text: "OK"
      }).then(function (res) {
          if (res == true) {
            GoodsService.deleteGoods(id).then(function (response) {
              if(response.data.returnState==200){
                alert('删除成功！');
                GoodsService.getGoods($scope.userName).then(function(response){
                  $scope.Goods = response.data.goods;
                })
              }
            }, function (rej) {
            })
          }else{
          }
        });
    }
    $scope.postGoods = function () {
      console.log("ss");
      $location.path("/templates/goodsInsert");
      var curUrl = $location.absUrl();
      console.log(curUrl);
    }
  }])
  .controller("MeController",['$scope','$window','$ionicPopup','$location',function($scope,$window,$ionicPopup,$location){
    $scope.title="我";
    /*if($window.localStorage.getItem('name')!=undefined){
      $scope.mod.User=$window.localStorage.getItem('name');
    }*/
    $scope.User=$window.localStorage.getItem('name');
    $scope.exitUser=function () {
      $ionicPopup.confirm({
        title: "确认推出当前用户？",
        /*template: "确认创建",*/
        Text:"OK"
      }).then(function(res){
        console.log(res);
        if(res==true){
          $window.localStorage.clear();
          console.log('1'+$window.localStorage.getItem('name'));
          $location.path("index");
        }else{

        }
      });
    }
    $scope.getMember=function () {
      $location.path("/templates/member");
    }
    $scope.getHistory=function () {
      $location.path("/templates/salesHistory");
    }
    $scope.getRejected= function () {
      $location.path("/templates/rejection");
    }
    $scope.rejectedGoods = function () {
      $location.path("/templates/rejectionGoods");
    }
  }])
  .controller("LoginController",['$scope','LoginService','$window','$state',function($scope,LoginService,$window,$state){
    $scope.title="Login";
    if($window.localStorage.getItem("state")==200){

      console.log("state");
      $state.go("templates.compIn");
    }
    $scope.login=function(){
      LoginService.login($scope.mod).then(function (res){
        console.log(res.data);
        $scope.token=res.data.token;
        $window.localStorage.setItem('token',$scope.token);
        $scope.state=200;
        if($scope.token!=null){
          if($scope.mod.saveUser){
            $window.localStorage.setItem('state','200');
          }

          $state.go("templates.compIn")
          //$location.path("/templates/compIn");
        }
        console.log($scope.state);
      });
    }
    $scope.toRegister=function () {
      $state.go("compRegister")

    }

  }])
  .controller("RegisterController",['$scope','RegisterService','$location',function($scope,RegisterService,$location){
    $scope.title="Register";
    $scope.register=function(){
      RegisterService.register($scope.User,$scope.rePassWd).then(function(res){
        $scope.bool=res.data.registerOk;
        console.log(res.data.registerOk);
        if($scope.bool){
          $location.path('/index');
        }
        alert($scope.bool);
      });
    }
  }])
  .controller("MemberController",['$scope','MemberService','$ionicPopup','$location',function($scope,MemberService,$ionicPopup,$location){
    $scope.title="member";

    MemberService.getMembers().then(function(response){
      $scope.members=response.data.members;
      console.log($scope.members);})
    $scope.getDetail=function(member){
      $location.search('member',member);
      $location.path("/templates/memberDetail");
    }
    $scope.confirmDelete = function(id) {
      $scope.id=id;
      console.log($scope.id+"jjj");
      $ionicPopup.confirm({
        title: "确认删除？",
        /*template: "确认创建",*/
        Text:"OK"
      }).then(function(res){
            console.log(res);
        if(res==true){
          MemberService.deleteMember($scope.id).then(function (response) {
            $scope.returnState = response.data.returnState;
            if ($scope.returnState == 200) {
              alert("删除成功!");
              MemberService.getMembers($scope.userName).then(function (response) {
                $scope.members = response.data.members;
                console.log($scope.members);
              });
            }
          })
        }else{

        }
      });
    };

  }])
  .controller("MemberPostController",['$scope','MemberPostService',function($scope,MemberPostService){
    $scope.title="添加会员";
    console.log("hhh");
    $scope.postMember=function(){
      MemberPostService.postMember($scope.member).then(function (response) {
        $scope.returnState = response.data.returnState;
        if ($scope.returnState == 200) {
          alert("添加成功");
          MemberPostService.changeMemberURL();
        }
      })
    }
  }])
  .controller("GoodsDetailController",['$scope','$location',function($scope,$location){
    $scope.goods=$location.search().goods;
    console.log($scope.goods);
    $scope.scanBarcode=function(){
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        alert(imageData.text);
        $scope.goods.number = imageData.text;
        alert($scope.goods.number);
      }, function (error) {
      });
    }
  }])
  .controller("GoodsInsertController",['$scope','$location','GoodsInsertService',function ($scope,$location,GoodsInsertService) {
    $scope.insertGoods = function () {
      alert($scope.goods);
      console.log($scope.goods);
      GoodsInsertService.goodsInsert($scope.goods).then(function (response) {
        $scope.data = response.data;
        console.log($scope.data);
        $location.path("/goods");
      })

    }
  }])
  .controller("MemberDetailController",['$scope','$location',function($scope,$location){
    $scope.member=$location.search().member
  }])
  .controller("SalesHistoryController",['$scope','SalesHistoryService',function($scope,SalesHistoryService){
    SalesHistoryService.getSalesHistory().then(function(response){
      $scope.histories=response.data.histories;
    })
  }])
  .controller("RejectionController",['$scope','RejectionService',function($scope,RejectionService){
    RejectionService.getRejection().then(function(response){
      $scope.goodsRejections=response.data.goodsRejections;
    })
  }])
  .controller("RejectionGoodsController",['$scope','$cordovaBarcodeScanner','RejectionGoodsService','$ionicPopup',function($scope,$cordovaBarcodeScanner,RejectionGoodsService,$ionicPopup){
    $scope.title='退货';

    $scope.rejectionGoods=function(){
      $ionicPopup.confirm({
        title: "确认退货？",
        /*template: "确认创建",*/
        Text: "OK"
      }).then(function(res){
        if(res == true){
          RejectionGoodsService.rejectionGoods($scope.rejection).then(function (res){
            if(res.data.returnState=="200"){
              alert("退货成功!");
            }else{
              alert("退货失败!");
            }
          },function(rej){});
        }else{

        }
      });

    }


    $scope.scanBarcode=function(){
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        alert(imageData.text);
        $scope.number=imageData.text;
        alert($scope.number);
      }, function (error) {
      });
    }

  }])




