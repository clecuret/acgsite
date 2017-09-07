var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});




app.controller('Ctrl', function($scope,$window,$filter) {

  var data = {index: {
    mainnews: 'Reprise des cours adulte le mercredi 6 septembre 2017 à 20h15.',
    subnews: 'Réunion d\'information au Forum des Associations de Genlis le samedi 2 septembre 2017 de 13H30 à 18H00.'
  },jeunes:{
    mainnews: 'Reprise des cours enfant le mercredi 6 septembre 2017 à 18h00.',
    subnews: ''
  },timeslots:[
    {id: 1, name: '',  day:'Mercredi',start: '18:00', end: '19:00',page:'jeunes'},
    {id: 2, name: 'Cours adolescents', day:'Mercredi',start: '19:15', end: '20:15',page:'index'},
    {id: 3, name: 'Cours adultes',  day:'Mercredi',start: '19:15', end: '21:45',page:'index'},
    {id: 4, name: 'Cours tous niveaux',  day:'Vendredi',start: '20:30', end: '21:45',page:'index'}
  ],prices:[
    {id: 1, name: 'Jeune',  price:75,licence: 25, minage: 7,maxage:13,cond:''},
    {id: 2, name: 'Adolescent',  price:105,licence: 35, minage: 14,maxage:16,cond:''},
    {id: 3, name: 'Etudiant, Lycéen',  price:115,licence: 35, minage: 17,maxage:'',cond:'S\'applique à la 2 ième personne d\'une famille'},
    {id: 4, name: 'Adulte',  price:135,licence: 35, minage: '',maxage:'',cond:''}
  ]};


  $scope.data = data;


 

  $scope.publish = function() {
    $window.open("mailto:info@aikiclub-genlis.fr?subject=Demande%20de%20modification%20du%20site%20AikiClub%20Genlis&body="+JSON.stringify($scope.data, null, 2),"_self");
  }; 



  $scope.days = [
    {id: 'Lundi', text: 'Lundi'},
    {id: 'Mardi', text: 'Mardi'},
    {id: 'Mercredi', text: 'Mercredi'},
    {id: 'Jeudi', text: 'Jeudi'},
    {id: 'Vendredi', text: 'Vendredi'},
    {id: 'Samedi', text: 'Samedi'},
    {id: 'Dimanche', text: 'Dimanche'}
  ]; 

  $scope.pages = [
    {id: 'index', text: 'index'},
    {id: 'jeunes', text: 'jeunes'}
  ]; 

  $scope.showDay = function(timeslot) {
    if(timeslot.day && $scope.days.length) {
      var selected = $filter('filter')($scope.days, {id: timeslot.day});
      return selected.length ? selected[0].text : 'Lundi';
    } else {
      return timeslot.day || 'Lundi';
    }
  };

  $scope.showPage = function(timeslot) {
    if(timeslot.page && $scope.pages.length) {
      var selected = $filter('filter')($scope.pages, {id: timeslot.page});
      return selected.length ? selected[0].text : 'index';
    } else {
      return timeslot.page || 'index';
    }
  };

  $scope.saveTimeslot = function(data, id) {
    angular.extend(data, {id: id});
    return true;
  };

  $scope.removeTimeslot = function(index) {
    $scope.data.timeslots.splice(index, 1);
  };

  $scope.addTimeslot = function() {
    $scope.inserted = {
      id: $scope.data.timeslots.length+1,
      name: '',
      day: 'Mercredi',
      start: '19:00',
      end:'20:00' 
    };
    $scope.data.timeslots.push($scope.inserted);
  };





 
  $scope.savePrice = function(data, id) {
    angular.extend(data, {id: id});
    return true;
  };

  $scope.removePrice = function(index) {
    $scope.data.prices.splice(index, 1);
  };

  $scope.addPrice = function() {
    $scope.insertedprice = {
      id: $scope.data.prices.length+1,
      name: 'Tout le monde',
      price: 100,
      licence: 35,
      minage:7,
      maxage:77,
      cond:'' 
    };
    $scope.data.prices.push($scope.insertedprice);
  };

});
