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
    $scope.title="出货";
    $scope.userName='王超';
    GoodsService.getGoods($scope.userName).then(function (res){
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

    $scope.scanBarcode=function(){
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        alert(imageData.text);
        $scope.number = imageData.text;
        alert($scope.number);
      }, function (error) {
      });
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
        $scope.state=res.data.state;
        if($scope.state==200){
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
  .controller("RegisterController",['$scope','RegisterService',function($scope,RegisterService){
    $scope.title="Register";
    $scope.register=function(){
      RegisterService.register($scope.User,$scope.rePassWd).then(function(res){
        $scope.bool=res.data.registerOk;
        console.log(res.data.registerOk);
        alert($scope.bool);
      });
    }
  }])
  .controller("MemberController",['$scope','MemberService','$ionicPopup',function($scope,MemberService,$ionicPopup){
    $scope.title="member";
    $scope.userName='王超';
    MemberService.getMembers($scope.userName).then(function(response){
      $scope.members=response.data.members;
      console.log($scope.members);})

    $scope.getDetail=function(member){
      MemberService.getDetail(member);
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
      $scope.member.userName='王超';
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
  }])
  .controller("MemberDetailController",['$scope','$location',function($scope,$location){
    $scope.member=$location.search().member
  }])
  .controller("SalesHistoryController",['$scope','SalesHistoryService',function($scope,SalesHistoryService){
    $scope.userName='王超';
    SalesHistoryService.getSalesHistory($scope.userName).then(function(response){
      $scope.histories=response.data.histories;
    })
  }])
  .controller("RejectionController",['$scope','RejectionService',function($scope,RejectionService){
    $scope.userName='王超';
    RejectionService.getRejection($scope.userName).then(function(response){
      $scope.goodsRejections=response.data.goodsRejections;
    })
  }])
  .controller("RejectionGoodsController",['$scope','$cordovaBarcodeScanner','RejectionGoodsService','$ionicPopup',function($scope,$cordovaBarcodeScanner,RejectionGoodsService,$ionicPopup){
    $scope.title='退货';
    $scope.getSum = function(){
      $scope.rejection.rejectionSum=$scope.rejection.goodsPrice * $scope.rejection.rejectionNumber;
    }


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




