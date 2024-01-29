function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/skills-member.html'
        , controller: 'skillsMemberCtrl'
        , controllerAs: 'skillsMember'
        , bindToController: true
        , scope: {
            member: '='
        }
    };
}
