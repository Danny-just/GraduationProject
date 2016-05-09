// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','Company.Controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider
      .state("templates",{
        url:"/templates",
        abstract:true,
        templateUrl: "templates/templates.html"
    })
      .state("index",{
        url:"/index",
        cache:'false',
        templateUrl: "index.html",
      })
      .state("templates.compIn",{
        url:"/compIn",
        views:{
          "templates-compIn":{templateUrl: "templates/compIn.html",
            controller:'InController'
          }
        }
      })
      .state("templates.goods",{
        url:"/goods",
        views:{
          "templates-goods":{templateUrl: "templates/goods.html",
            controller:'GoodsController'
          }
        }
      })
      .state("templates.goodsDetail",{
        url:"/goodsDetail",
        cache:false,
        views:{
          "templates-goods":{templateUrl: "templates/goodsDetail.html",
            controller:'GoodsDetailController'
          }
        }
      })
      .state("template.goodsInsert",{
        url:"/goodsInsert",
        cache:false,
        views:{
        "templates-goods":{templateUrl: "templates/goodsInsert.html",
          controller:'GoodsDetailController'
        }
      }
    })
      .state("templates.compMe",{
        url:"/compMe",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/compMe.html",
            controller:'MeController'
          }

        }
      })
      .state("templates.compLogin",{
        url:"/compLogin",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/compLogin.html",
            controller:'LoginController',
            service:'LoginFactory'
          }
        }
      })
      .state("compRegister",{
        url:"/compRegister",
        cache:'false',

          templateUrl: "templates/register.html",
            controller:'RegisterController',
            service:'RegisterFactory'

      })
      .state("templates.member",{
        url:"/member",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/member.html",
            controller:'MemberController',
            service:'MemberFactory'
          }
        }
      })
      .state("templates.memberPost",{
        url:"/memberPost",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/memberPost.html",
            controller:'MemberPostController',
            service:'MemberPostFactory'
          }
        }
      })
      .state("templates.memberDetail",{
        url:"/memberDetail",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/memberDetail.html",
            controller:'MemberDetailController',
          }
        }
      })
      .state("templates.salesHistory",{
        url:"/salesHistory",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/salesHistory.html",
            controller:'SalesHistoryController',
          }
        }
      })
      .state("templates.rejection",{
        url:"/rejection",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/rejection.html",
            controller:'RejectionController',
          }
        }
      })
      .state("templates.rejectionGoods",{
        url:"/rejectionGoods",
        cache:'false',
        views:{
          "templates-compMe":{templateUrl: "templates/rejectionGoods.html",
            controller:'RejectionGoodsController',
          }
        }
      })
    $urlRouterProvider.otherwise('/index');
  });

