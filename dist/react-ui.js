!function(t,e){"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?module.exports=e(require("react")):t.ReactUI=e(t.React)}(this,function(t){"use strict";var e=({}.hasOwnProperty,t.DOM),i=t.createClass({render:function(){var t={className:"react-ui-button",disabled:this.props.disabled||!1,title:this.props.title,onClick:this.onClick||void 0};return e.button(t,this.props.children)},onClick:function(t){t.preventDefault(),"function"==typeof this.props.onClick&&this.props.onClick(t)}}),c=t.createClass({getInitialState:function(){return{checked:this.props.checked||!1}},render:function(){var t={className:"react-ui-checkbox",disabled:this.props.disabled||!1,title:this.props.title,onClick:this.onClick||void 0};return this.state.checked===!0&&(t.className+=" is-checked"),e.button(t)},onClick:function(t){t.preventDefault(),this.setState({checked:!this.state.checked}),this.state.checked===!1&&"function"==typeof this.props.onCheck&&this.props.onCheck(t),this.state.checked===!0&&"function"==typeof this.props.onUncheck&&this.props.onUncheck(t)}});return{Button:i,Checkbox:c}});