((root, factory) ->
  if typeof define is 'function' and define.amd
    define ['react'], factory
  else if typeof exports is 'object'
    module.exports = factory require('react')
  else
    root.Bootstrap = factory root.React
  return
) this, (React) ->

  'use strict'

  {button, div, form, input, label, li, p, span} = React.DOM

  ###
  # Utility functions
  ###

  assign = (target, sources...) ->

    if target is 'undefined' or target is null
      throw new TypeError 'Cannot convert argument to object'

    dest = Object target

    for source in sources when typeof source isnt 'undefined' and source isnt null
      for key, val of source
        if source.hasOwnProperty key
          dest[key] = val

    dest

  isArray = (obj) -> typeof obj is 'object' and obj.constructor is Array

  isFunction = (obj) -> typeof obj is 'function'

  isRegExp = (obj) -> typeof obj is 'object' and obj.constructor is RegExp

  ###
  # Helpers
  ###

  buildHelpBlock = (text) ->
    return null unless text
    (p {className: 'help-block'}, text)


  class ClassName

    constructor: (@words = []) ->
      @words = @words.split(' ') unless isArray @words

    add: (word) =>
      return unless word
      @words = @words.concat word.split(' ')
      return

    has: (criteria) =>
      exists = false

      return exists unless criteria

      # if the criteria is a regular expression
      if isRegExp criteria
        exists = true for word in @words when criteria.test word

      # if the criteria is a string (word)
      else exists = @words.indexOf(criteria) > -1

      exists

    remove: (word) =>
      return unless word
      @words.splice(@words.indexOf word) if @words.indexOf(word) > -1
      return

    toString: => @words.join(' ').trim()

  buildHelpBlock = (text) ->
    return null unless text
    (p { className: 'help-block' }, text)

  Button = React.createClass

    render: ->
      props = assign {}, @props, {type: 'button'}

      className = new ClassName [@props.className, 'btn']

      # default to `btn-default` if no style is set
      unless className.has /btn-(danger|default|info|link|primary|success|warning)/
        className.add 'btn-default'

      props.className = className.toString()

      (button props)

  Checkbox = React.createClass

    getInitialState: -> checked: @props.checked or false

    render: ->
      # NOTE: We remove `label` and `children` properties
      #       since those are not for the root element
      props = assign {}, @props, {children: null, label: null, type: 'checkbox'}

      className = new ClassName props.className

      # if inline-checkbox
      if className.has "#{props.type}-inline"

        # remove inline class from the input properties
        className.remove "#{props.type}-inline"

        (label {className: "#{props.type}-inline"}, [
          (input props)
          (@props.label or @props.children or '')
        ])

      # unless inline-checkbox
      else

        (div {className: props.type}, [
          (label null, [
            (input props)
            (@props.label or @props.children or '')
          ])
        ])

  Form = React.createClass

    render: -> (form {id: @props.id, className: @props.className, role: 'form'}, @props.children)

  Select = React.createClass

    getInitialState: ->
      collapsed: true
      value: @props.value or undefined

    render: ->
      className = new ClassName [
        @props.className
        'react-ui'
        'react-ui-select'
      ]

      className.add('react-ui-is-collapsed') if @state.collapsed

      (div {className: className.toString()}, [
        (div {onClick: @onClick}, [
          (label null, @getLabel())
          (span())
          (Input {type: 'text', onKeyPress: @onKeyPress})
        ])
        (ul null, @renderOptions())
      ])

    ###
    # Get's the selected option text
    ###
    getLabel: ->
      return '' unless @state.value

      i      = 0
      label  = undefined
      len    = @props.options.length
      option = undefined

      while i < len
        option = @props.options[i]
        if option.value is @state.value
          label = option.label
          break
        i++
      label or ''

    onClick: (event) -> @setState collapsed: not @state.collapsed

    onKeyPress: (event) -> event.preventDefault()

    onOptionClick: (value) ->
      @setState value: value
      setTimeout => @props.onChange(@state.value) if @props.onChange

    renderOptions: ->
      @props.options.map (option, i) =>

        className = if option.value is @state.value then 'react-ui-is-selected' else ''

        onClick = =>
          @onOptionClick option.value
          return

        (li { key: i, className: className, onClick: onClick }, option.text)


  RadioButton = React.createClass

    getInitialState: -> checked: @props.checked or false

    render: ->
      # NOTE: We remove `label` and `children` properties
      #       since those are not for the root element
      props = assign {}, @props, {children: null, label: null, type: 'radio'}

      className = new ClassName props.className

      # inline style
      if className.has "#{props.type}-inline"

        # remove inline class from the input properties
        className.remove "#{props.type}-inline"

        (label className: "#{props.type}-inline", [
          (Input props)
          (@props.label or @props.children or '')
        ])

      # non inline style
      else

        (div {className: props.type}, [
          (label null, [
            (input props)
            (@props.label or @props.children or '')
          ])
          (buildHelpBlock props.help)
        ])

  Input = React.createClass

    render: ->
      props = assign {type: 'text'}, @props

      # add `form-control` class for the following input types:
      inputTypes = [
        'text'
        'email'
        'password'
      ]
      className = new ClassName props.className
      className.add('form-control') if inputTypes.indexOf(props.type) > -1

      props.className = className.toString()

      (input props)

  TextInput = React.createClass

    getInitialState: ->
      id: @props.id or "text-input-#{Date.now()}"
      value: @props.value

    render: ->

      props = assign {ref: 'input'}, @props

      # save the reference for change event since
      # it may be overriden in the properties
      @_inputRef = props.ref

      className = new ClassName @props.className
      className.remove 'form-group'

      if @props.validate
        className.add (if error = @validate() then 'has-error' else 'has-success')

      props.className = className.toString()

      (div {className: 'form-group'}, [
        (@renderLabel())
        (Input props)
        (@renderHelp())
      ])

    onChange: (event) ->
      @setState value: @refs[@_inputRef].value
      if isFunction @props.onChange
        setTimeout -> @props.onChange event
      return

    renderLabel: ->
      return null unless @props.label
      (label {htmlFor: @state.id}, @props.label)

    renderHelp: ->
      return null unless @props.helpBlock
      (span {className: 'help-block'}, @props.helpBlock)

    validate: ->
      @props.validate @state.value if isFunction @props.validate

  Button      : Button
  Checkbox    : Checkbox
  Form        : Form
  Input       : Input
  RadioButton : RadioButton
  Select      : Select
  TextInput   : TextInput

