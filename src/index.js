import * as angular from 'angular'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { HomeReactComponent } from './HomeReactComponent'

const app = angular
  .module('play-react-with-angular', [])
  .directive('react', () => {
    return {
      restrict: 'E',
      scope: {
        props: '<',
        component: '<'
      },
      link($scope, $element, $attrs) {
        console.info('react directive on the way')

        $scope.$watch('props', (props) => {
          if ($scope.component && $scope.props) {
            ReactDOM.render(
              React.createElement($scope.component, props),
              $element[0]
            )
          }
        }, true)
      }
    }
  })
  .component('homePartial', {
    bindings: {},
    template: `
      <h2>wait 5s to interval render, and dup react compoent should be working fine with angular.</h2>
      <react
        component="$ctrl.HomeReact.component"
        props="$ctrl.HomeReact.props"></react>
      <react
        component="$ctrl.HomeReact.component"
        props="$ctrl.HomeReact.props"></react>
    `,
    controller: [
      '$scope',
      '$interval',
      '$http',
      function controller($scope, $interval, $http) {
        this.$onInit = () => {
          console.info('homePartial initialized, first time plz wait 5s')

          let targetIndex = 1

          const intervalTime = $interval(() => {
            $http.get(`https://jsonplaceholder.typicode.com/posts/${targetIndex}`)
              .then(response => {
                this.HomeReact = {
                  component: HomeReactComponent,
                  props: {
                    ...response.data,
                    onCommentChange: (newComment) => {
                      $scope.$apply(() => {
                        this.HomeReact.props.comment = newComment
                      })
                    }
                  }
                }
                targetIndex++
              },
              () => {
                $interval.cancel(intervalTime)
                console.warn('STOP DEMO')
              })
          }, 5000)
        }
      }
    ]
  })

angular.bootstrap(document, [app.name])
