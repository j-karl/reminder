var reminder = angular.module('reminder',[]);
reminder.controller('mainCtrl',['$scope',function($scope){
    $scope.themes = [
        'red','blue','purple','yellow','green','brown','orange'
    ];
    if(localStorage._reminder){
        $scope.list = JSON.parse(localStorage._reminder);
    }else{
        $scope.list = [];
    }
    $scope.currentlist = $scope.list[0];
    $scope.add = function(){
        var l = $scope.list.length;
        var id;
        var max = -Infinity;
        if($scope.list.length === 0){
            id=0;
        }else{
            for(var i=0;i<$scope.list.length;i++){
                if($scope.list[i].id > max){
                    max = $scope.list[i].id;
                }
            }
            id = max+1;
        }
        $scope.list.push({
            id:id,title:'列表'+(l+1),theme:$scope.themes[l%7],todos:[]
        });
        console.log($scope.list);
        $scope.save();
        // save();
    };
    $scope.select = function(index){
        $scope.currentlist = $scope.list[index];
    };
    $scope.shouqi = function(){
        $('.jiantou').closest('.content-main').find('ul').toggleClass('show');
    };
    $scope.addList = function(){
        $scope.currentlist.todos.push({name:'',isDone:false});
        $scope.save();
    };
    $scope.optionshow = function(){
        $('.option').closest('.bao-title').toggleClass('show');
    };
    $scope.delete = function(id){
        var newarr = [];
        for(var i=0; i<$scope.list.length;i++){
            if($scope.list[i].id != id){
                newarr.push($scope.list[i]);
            }
        }
        console.log(newarr);
        $scope.list = newarr;
        var index;
        for(var j=0;j<$scope.list.length;j++){
            if($scope.list[j].id === (id+1) ){
                index = j;
            }
        }
        $scope.currentlist = $scope.list[index];
        $scope.save();
    };
    $scope.cancel = function(){
        $('.option').closest('.bao-title').toggleClass('show');

    };
    $scope.showDetail1 = function(){
        $('.content-main ul li').toggleClass('show');
    };
    $scope.showDetail2 = function(){
        $('.undoneList li').toggleClass('show');
    };
    $scope.save = function(){
        localStorage._reminder = JSON.stringify($scope.list);
    };
    $scope.pop = function(e){
        e.stopPropagation();
    };
}]);
