/* ========================================================================
 * Bootstrap-Airview: airview.js v1.0.0
 * http://deviprsd21.github.io/Airview/
 * ========================================================================
 * This Plugin is inspired by Tooltip.js by Jacob Thornton
 * Copyright 2014 Devi Prasad
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AIRVIEW PUBLIC CLASS DEFINITION
  // ===============================

  var Airview = function (element, options) {
    this.init('airview', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Airview requires tooltip.js')

  Airview.VERSION  = '1.0.0'

  Airview.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'auto',
    trigger: 'hover focus',
    url: false,
    content: '',
    width: 'auto',
    error: 'Image Not Found',
    template: '<div class="airview" role="tooltip"><div class="airview-arrow"></div><div class="airview-inner"><div class="airview-loader">' + 
	          '</div><img /></div></div>'
  })


  // NOTE: AIRVIEW EXTENDS tooltip.js
  // ================================

  Airview.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Airview.prototype.constructor = Airview

  Airview.prototype.getDefaults = function () {
    return Airview.DEFAULTS
  }

  Airview.prototype.setContent = function () {
    var $e          = this.$element
    var $tip        = this.tip()
    var title       = this.getTitle()
    var imgalt      = title.substr(title.lastIndexOf('/') + 1)
    var content     = this.getContent()
    var dimension   = {width : this.options.width == 'auto' ? 500 : this.options.width, height: this.options.width == 'auto' ? 
	                  this.getHeight(500) : this.getHeight(this.options.width)}
	
    if(!title && !content) {
      title = this.options.content ? this.options.url ? this.options.url + this.options.content : this.options.content : ''
    } else {
      if(title) title = this.options.url ? this.options.url + title : title
      else title = content ? this.options.url ? this.options.url + content : content : title
    }
	
    $tip.find('.airview-inner > img').on('load', function(){ $tip.find('.airview-loader').fadeOut() })
    this.options.html ? $tip.find('.airview-inner')['html'](title) : $tip.find('.airview-inner > img')['attr']({src: title, alt: imgalt})
                        $tip.find('.airview-inner > img')['attr'](dimension)
	
    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!title || $e.attr('data-lost')) $tip.find('.airview-inner').empty().addClass('error').html('<span>' + this.options.error + '</span>')
	else if(title && isNaN(dimension.height) && $e.attr('data-broken')) $tip.find('.airview-inner').empty().addClass('error').html('<span>Broken Link</span>')
  }
  
  Airview.prototype.getHeight = function (width) {
    var $e = this.$element
    return width / $e.attr('data-aratio')
  }
  
  Airview.prototype.fixTitle = function () {
    var $e      = this.$element
    var error   = false
    var wait    = false
    var img     = new Image()
    var that    = this
    var title   = ''
    var content = ''
	
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
	
    title   = this.getTitle()
    content = this.getContent()
	
    if(!title && !content) {
      title = this.options.content ? this.options.url ? this.options.url + this.options.content : this.options.content : ''
    } else {
      if(title) title = this.options.url ? this.options.url + title : title
      else title = content ? this.options.url ? this.options.url + content : content : title
    }
	
    $(img).error(function(e){
      if(title) $e.attr('data-broken', true)
	  else $e.attr('data-lost', true)
      error = true
    })
    img.src = title
	
    wait = setInterval(function () {
      if(img.width != 0 && img.height != 0 || error) {
        $e.attr('data-aratio', img.width / img.height)
        img.removeAttribute("src")
        img = null
        clearInterval(wait)
      }
    },0)
  }

  Airview.prototype.hasContent = function () {
    return this.getTitle() || this.getContent() || " "
  }

  Airview.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Airview.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.airview-arrow'))
  }

  Airview.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // AIRVIEW PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.airview')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.airview', (data = new Airview(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.airview             = Plugin
  $.fn.airview.Constructor = Airview


  // AIRVIEW NO CONFLICT
  // ===================

  $.fn.airview.noConflict = function () {
    $.fn.airview = old
    return this
  }

}(jQuery);
