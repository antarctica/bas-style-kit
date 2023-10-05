/* ========================================================================
 * BAS Style Kit: version.js
 * https://style-kit.web.bas.ac.uk/interactivity/version/
 * ======================================================================== */


+function ($) {
    'use strict';
  
    // VERSION CLASS DEFINITION
    // ======================
  
    var Version   = function () {}
  
    Version.VERSION = '0.7.0-alpha'
  
  
    // VERSION PLUGIN DEFINITION
    // =======================
  
    function Plugin(option) {
      return new Version();
    }
  
    var old = $.fn.bsk_version
  
    $.fn.bsk_version             = Plugin
    $.fn.bsk_version.Constructor = Version
  
  
    // Version NO CONFLICT
    // =================
  
    $.fn.bsk_version.noConflict = function () {
      $.fn.bsk_version = old
      return this
    }
  
  }(jQuery);
  