define('app',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _aureliaRouter.Router), _dec(_class = function () {
    function App(aurelia, router) {
      _classCallCheck(this, App);

      this.aurelia = aurelia;
      this.router = router;

      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        options.url = AppState.config.baseUrl + options.url;
        options.error = function (data) {
          switch (data.status) {
            case 0:
              break;

            case 401:
              break;

            case 413:
              break;

            default:
              if (data.statusText) {}
              break;
          }
        };
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.addPipelineStep('postRender', postRenderStep);

      config.map([{
        route: ['', 'home'],
        name: 'home',
        moduleId: 'home/home',
        title: 'Home'
      }, {
        route: 'submit',
        name: 'submit',
        moduleId: 'submit/submit',
        title: 'Submit Property'
      }, {
        route: 'contact',
        name: 'contact',
        moduleId: 'contact/contact',
        title: 'Contact Us'
      }, {
        route: 'faq',
        name: 'faq',
        moduleId: 'faq/faq',
        title: 'FAQ'
      }, {
        route: 'tnc',
        name: 'tnc',
        moduleId: 'tnc/tnc',
        title: 'Terms and Conditions'
      }, {
        route: 'policy',
        name: 'policy',
        moduleId: 'policy/policy',
        title: 'Privacy Policy'
      }]);
      this.router = router;
    };

    return App;
  }()) || _class);

  var postRenderStep = function () {
    function postRenderStep() {
      _classCallCheck(this, postRenderStep);
    }

    postRenderStep.prototype.run = function run(navigationInstruction, next) {
      $('html, body').animate({ scrollTop: 0 }, 'fast');

      if (navigationInstruction.config && navigationInstruction.config.name) {}
      return next();
    };

    postRenderStep.prototype.setActiveTab = function setActiveTab(name) {};

    return postRenderStep;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('app-footer/app-footer',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AppFooter = exports.AppFooter = function AppFooter() {
    _classCallCheck(this, AppFooter);
  };
});
define('app-header/app-header',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppHeader = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AppHeader = exports.AppHeader = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
    function AppHeader(router) {
      _classCallCheck(this, AppHeader);

      this.router = router;
    }

    AppHeader.prototype.attached = function attached() {};

    return AppHeader;
  }()) || _class);
});
define('faq/faq',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Faq = exports.Faq = function () {
    function Faq() {
      _classCallCheck(this, Faq);

      this.model = {};
    }

    Faq.prototype.attached = function attached() {};

    Faq.prototype.submit = function submit() {
      this.submitted = true;
      var query = this.model;
      $.ajax({
        url: '/contact/query',
        method: 'POST',
        data: query,
        success: function success(data) {
          alert('Your query has been submitted.');
        },
        error: function error(err) {
          console.log(err);
        }
      });
    };

    return Faq;
  }();
});
define('contact/contact',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Contact = exports.Contact = function () {
    function Contact() {
      _classCallCheck(this, Contact);

      this.model = {};
      this.position = {
        lat: 25.0968872,
        lng: 55.1646739
      };
    }

    Contact.prototype.attached = function attached() {
      var me = this;

      this.googleMap = new google.maps.Map(document.getElementById('listing-map'), {
        zoom: 12,
        center: me.position,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        scrollwheel: true,
        draggable: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        navigationControl: false,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL
        }
      });
    };

    Contact.prototype.submit = function submit() {
      this.submitted = true;
      var query = this.model;
      $.ajax({
        url: '/contact/query',
        method: 'POST',
        data: query,
        success: function success(data) {
          console.log(data);
          alert('Your query has been submitted.');
        },
        error: function error(err) {
          console.log(err);
        }
      });
    };

    return Contact;
  }();
});
define('home/home',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function () {
    function Home() {
      _classCallCheck(this, Home);
    }

    Home.prototype.attached = function attached() {};

    return Home;
  }();
});
define('submit/submit',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Submit = exports.Submit = function () {
    function Submit() {
      _classCallCheck(this, Submit);

      this.model = {
        location: {},
        contact: {},
        information: {
          type: '-',
          bedrooms: '-',
          bathrooms: '-',
          parkingSpaces: '-'
        }
      };
      this.validation = {
        location: {},
        contact: {},
        information: {
          type: true,
          bedrooms: true,
          bathrooms: true,
          parkingSpaces: true
        }
      };
      this.submitted = false;
      this.tncCheck = false;
      this.contactSubmitted = false;
    }

    Submit.prototype.attached = function attached() {};

    Submit.prototype.validateContact = function validateContact() {
      var me = this;
      console.log(this.model);
      console.log('validateContact');
      var valid = true;

      this.validation.contact.name = false;
      this.validation.contact.email = false;
      this.validation.contact.contactNo = false;

      if (!this.model.contact.name || this.model.contact.name === '') {
        valid = false;
        this.validation.contact.name = true;
      }

      if (!this.model.contact.email || this.model.contact.email === '') {
        valid = false;
        this.validation.contact.email = true;
      } else {
        var atpos = this.model.contact.email.indexOf('@');
        var dotpos = this.model.contact.email.lastIndexOf('.');
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= this.model.contact.email.length) {
          valid = false;
          this.validation.contact.email = true;
        }
      }

      if (!this.model.contact.contactNo || this.model.contact.contactNo === '') {
        valid = false;
        this.validation.contact.contactNo = true;
      } else {
        var phoneno = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
        if (!this.model.contact.contactNo.match(phoneno)) {
          valid = false;
          this.validation.contact.contactNo = true;
        }
      }

      if (valid) {
        if (!me.contactSubmitted) {
          me.contactSubmitted = true;
          $.ajax({
            url: '/contact/info',
            method: 'POST',
            data: me.model.contact,
            success: function success(data) {
              console.log('data');
            },
            error: function error(err) {
              console.log(err);
            }
          });
        }
        $('.submit-property__steps a[href="#submit-property-2"]').tab('show');
      }
    };

    Submit.prototype.validateInformation = function validateInformation(images) {
      var me = this;
      console.log(this.model);
      console.log('validateInformation');
      var valid = true;

      this.validation.location.address = false;
      this.validation.location.unit = false;
      this.validation.information.title = false;
      this.validation.information.view = false;
      this.validation.information.squareFeet = false;
      this.validation.information.expectedPrice = false;

      if (valid) {
        var formData = new FormData();
        if (me.deed) {
          formData.append('images', me.deed[0], 'deed_' + me.model.information.title + '.jpg');
        }
        if (me.selectedFiles && me.selectedFiles.length) {
          for (var i = 0; i < me.selectedFiles.length; i++) {
            formData.append('images', me.selectedFiles[i], 'property' + i + '_' + me.model.information.title + '.jpg');
          }
        }
        formData.append('model', JSON.stringify(me.model));
        $.ajax({
          url: '/property',
          method: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function success(data) {
            $('#submitted').tab('show');
          },
          error: function error(err) {
            console.log(err);
          }
        });
      }
    };

    Submit.prototype.validateStep = function validateStep(step, callback) {
      console.log('validateStep');
      var me = this;
      var valid = true;
      switch (step) {
        case 1:
          break;

        case 2:
          if (!this.model.contact.name || this.model.contact.name === '') {
            valid = false;
            alert('Please fill in the NAME field');
          } else if (!this.model.contact.email || this.model.contact.email === '') {
            valid = false;
            alert('Please fill in a valid EMAIL address');
          } else if (!this.model.contact.contactNo || this.model.contact.contactNo === '') {
            valid = false;
            alert('Please fill in the CONTACT NUMBER field');
          } else {
            var atpos = this.model.contact.email.indexOf('@');
            var dotpos = this.model.contact.email.lastIndexOf('.');

            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= this.model.contact.email.length) {
              alert('Please fill in a valid EMAIL address');
            } else {
              var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
              if (!this.model.contact.contactNo.match(phoneno)) {
                alert('Please enter a valid contact number');
              } else {
                if (!me.contactSubmitted) {
                  me.contactSubmitted = true;
                  $.ajax({
                    url: '/contact/info',
                    method: 'POST',
                    data: me.model.contact,
                    success: function success(data) {
                      console.log('data');
                    },
                    error: function error(err) {
                      console.log(err);
                    }
                  });
                }
                !callback && $('.submit-property__steps a[href="#submit-property-2"]').tab('show');
              }
            }
          }
          break;

        case 3:
          break;
        default:
          break;
      }
      callback && callback(valid);
    };

    Submit.prototype.toggleBedrooms = function toggleBedrooms(value) {
      this.model.information.bedrooms = value;
    };

    Submit.prototype.toggleBathrooms = function toggleBathrooms(value) {
      this.model.information.bathrooms = value;
    };

    Submit.prototype.toggleFloors = function toggleFloors(value) {
      this.model.information.floors = value;
    };

    Submit.prototype.toggleParkingSpaces = function toggleParkingSpaces(value) {
      this.model.information.parkingSpaces = value;
    };

    Submit.prototype.finalValidationAnSubmit = function finalValidationAnSubmit(images) {
      var me = this;
      if (this.tncCheck) {
        me.validateStep(1, function (f1) {
          console.log('step 1 is valid');
          f1 && me.validateStep(2, function (f2) {
            console.log('step 2 is valid');
            f2 && me.validateStep(3, function (f3) {
              console.log('step 3 is valid');

              var formData = new FormData();
              if (me.deed) {
                formData.append('images', me.deed[0], 'deed_' + me.model.information.title + '.jpg');
              }
              if (me.selectedFiles && me.selectedFiles.length) {
                for (var i = 0; i < me.selectedFiles.length; i++) {
                  formData.append('images', me.selectedFiles[i], 'property' + i + '_' + me.model.information.title + '.jpg');
                }
              }
              formData.append('model', JSON.stringify(me.model));
              $.ajax({
                url: '/property',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function success(data) {
                  console.log('data');
                  f3 && $('#submitted').tab('show');
                },
                error: function error(err) {
                  console.log(err);
                }
              });
            });
          });
        });
      }
    };

    return Submit;
  }();

  var FileListToArrayValueConverter = exports.FileListToArrayValueConverter = function () {
    function FileListToArrayValueConverter() {
      _classCallCheck(this, FileListToArrayValueConverter);
    }

    FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
      var files = [];
      if (!fileList) {
        return files;
      }
      for (var i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i));
      }
      return files;
    };

    return FileListToArrayValueConverter;
  }();

  var BlobToUrlValueConverter = exports.BlobToUrlValueConverter = function () {
    function BlobToUrlValueConverter() {
      _classCallCheck(this, BlobToUrlValueConverter);
    }

    BlobToUrlValueConverter.prototype.toView = function toView(blob) {
      return URL.createObjectURL(blob);
    };

    return BlobToUrlValueConverter;
  }();
});
define('policy/policy',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Policy = exports.Policy = function () {
    function Policy() {
      _classCallCheck(this, Policy);
    }

    Policy.prototype.attached = function attached() {};

    return Policy;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('tnc/tnc',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Tnc = exports.Tnc = function () {
    function Tnc() {
      _classCallCheck(this, Tnc);
    }

    Tnc.prototype.attached = function attached() {};

    return Tnc;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app-header/app-header\"></require><require from=\"./app-footer/app-footer\"></require><app-header></app-header><router-view></router-view><app-footer></app-footer></template>"; });
define('text!contact/contact.css', ['module'], function(module) { module.exports = "body{\r\n    /* background-color: #f3f3f3 !important */\r\n}"; });
define('text!app-footer/app-footer.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!faq/faq.css', ['module'], function(module) { module.exports = "body{\r\n    /* background-color: #f3f3f3 !important */\r\n}"; });
define('text!app-header/app-header.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!home/home.css', ['module'], function(module) { module.exports = ""; });
define('text!contact/contact.html', ['module'], function(module) { module.exports = "<template><section class=\"section\"><div class=\"container\"><header class=\"section__title\"><h2>Contact Information</h2><small>Please feel free to contact us anytime</small></header><div class=\"contact\"><div class=\"contact__map\"><div id=\"listing-map\"></div></div><div class=\"contact__inner clearfix\"><div class=\"col-sm-12\"><form class=\"contact__form\" style=\"color:#fff\"><div class=\"form-group form-group--light form-group--float\">Name <input type=\"text\" class=\"form-control\" value.bind=\"model.name\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--light form-group--float\">Email Address <input type=\"email\" class=\"form-control\" value.bind=\"model.email\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--light form-group--float\">Contact Number <input type=\"text\" class=\"form-control\" value.bind=\"model.contactNo\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--light form-group--float\">Message<textarea class=\"form-control textarea-autoheight\" value.bind=\"model.message\"></textarea><i class=\"form-group__bar\"></i></div><small class=\"mdc-text-white-darker\">By sending us your information, you agree to our Terms of Use &amp; Privacy Policy.</small><div class=\"m-t-30\"><button type=\"submit\" class=\"btn brn-sm btn-default btn-static\" click.delegate=\"submit()\" disabled.bind=\"submitted\">Send</button></div></form></div></div></div></div></section></template>"; });
define('text!submit/submit.css', ['module'], function(module) { module.exports = "body{\r\n    /* background-color: #f3f3f3 !important */\r\n}"; });
define('text!faq/faq.html', ['module'], function(module) { module.exports = "<template><require from=\"./faq.css\"></require><section class=\"section\"><div class=\"container\"><header class=\"section__title\"><h2>Frequently Asked Questions</h2></header><div class=\"row\"><div class=\"col-md-8 faq\"><div class=\"card faq__item\"><div class=\"card__header\"><h2>Are there any hidden fees involved?</h2></div><div class=\"card__body\">No. There are absolutely no fees involved in our service. What you see is what you pay.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>If needed, would somebody be available for a meeting?</h2></div><div class=\"card__body\">Yes. We would be more than happy to meet with you to make an offer* on your property. Contact us today to arrange an appointment for one of our representatives to come out and see you.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>Does it matter if I am behind on my mortgage payments and face the risk of repossession?</h2></div><div class=\"card__body\">No. Wherever possible, we will use our strong relationship with mortgage lenders to help with any situation you might have. If the property is about to be repossessed, we suggest you request for a call back now and act sooner rather than later.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>How do I know if I am getting a fair price for my property?</h2></div><div class=\"card__body\">Fair trade is at the core of Cash For Property. Time is also money and it must be factored in the transaction. Allow us to make an offer* and find out.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>How do you calculate the value of my property?</h2></div><div class=\"card__body\">We use our collective experience of 30 years and our extensive knowledge of local markets. We use our proprietary system that provides us with the most up-to-date data to help us to offer* you a fair price.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>How long does the entire process take?</h2></div><div class=\"card__body\">The average time to conclude the transaction is usually 2 – 3 weeks. In some cases, we have concluded the transaction in 3 days. Having said that, Cash For Property will work with you to complete the entire process within the timeline ideal to you.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>How quick will I get an offer* on my property?</h2></div><div class=\"card__body\">Less than 24hrs. Submit your property on our portal or call us on Cash For Property for our offer*.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>What type of properties do you buy?</h2></div><div class=\"card__body\">Cash For Property buys the following types of property: Independent Villas, Townhouses and Apartments.</div></div><div class=\"card faq__item\"><div class=\"card__header\"><h2>Which areas does Cash For Property cover?</h2></div><div class=\"card__body\">All freehold and leasehold areas in the United Arab Emirates.</div></div>* Subject to a survery by us</div><div class=\"col-md-4 rmd-sidebar-mobile\" id=\"write-to-us\"><form class=\"card\"><div class=\"card__header\"><h2>Write to us</h2></div><div class=\"card__body m-t-10\"><div class=\"form-group form-group--float\">Name <input type=\"text\" class=\"form-control\" value.bind=\"model.name\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--float\">Email Address <input type=\"text\" class=\"form-control\" value.bind=\"model.email\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--float\">Contact Number <input type=\"text\" class=\"form-control\" value.bind=\"model.contactNo\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--float\">Message<textarea class=\"form-control textarea-autoheight\" value.bind=\"model.message\"></textarea><i class=\"form-group__bar\"></i></div><small class=\"text-muted\">By sending us your information, you agree our Terms of Use &amp; Privacy Policy.</small></div><div class=\"card__footer\"><button class=\"btn btn-primary\" click.delegate=\"submit()\" disabled.bind=\"submitted\">Submit</button> <button class=\"btn btn-link visible-sm-inline visible-xs-inline\" data-rmd-action=\"block-close\" data-rmd-target=\"#write-to-us\">Cancel</button></div></form></div></div></div></section></template>"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template><require from=\"./home.css\"></require><section id=\"home\"><div class=\"container home-container\"><div class=\"row\"><div class=\"col-md-6 wow fadeInLeft\" data-wow-delay=\"0.2s\"><div class=\"intro\"><h3>One solution <span>design for all marketing</span> website</h3><p>Omnis commodo consequat ei mea. Movet praesent postulant mea at, at nam dolorem lucilius. Soleat interesset mea cu, eum regione menandri definitionem no.</p><p><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg marginbot10\">Get started with us</a> <a href=\"#\" class=\"btn btn-green btn-bavel btn-lg marginbot10\">Connected with us</a></p></div></div><div class=\"col-md-6 wow fadeInRight\" data-wow-delay=\"0.2s\"><div class=\"form-wrapp\"><img src=\"img/lady.png\" class=\"form-image\" alt=\"\"><div class=\"form-horizontal\"><div class=\"heading\"><h3>Join with us <span>and get more</span> premium design</h3><span class=\"heding-style\"></span></div><form><div class=\"form-group\"><div class=\"col-lg-12\"><input type=\"text\" class=\"form-control form-block\" placeholder=\"Enter your username\"></div></div><div class=\"form-group\"><div class=\"col-lg-12\"><input type=\"text\" class=\"form-control form-block\" placeholder=\"Enter your email address\"></div></div><div class=\"form-group\"><div class=\"col-lg-12\"><input type=\"text\" class=\"form-control form-block\" placeholder=\"Enter your password\"></div></div><div class=\"form-group\"><div class=\"col-lg-12\"><input type=\"text\" class=\"form-control form-block\" placeholder=\"Retype your password\"></div></div><div class=\"form-group\"><div class=\"col-lg-12\"><button class=\"btn btn-default btn-bavel btn-lg\">Register now</button></div></div></form></div></div></div></div></div></section><header><div class=\"navbar navbar-inverse\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\"><img src=\"img/logo-small.png\" alt=\"\"></a></div><div class=\"collapse navbar-collapse pull-right\"><ul class=\"nav navbar-nav\"><li><a href=\"#home\">Home</a></li><li><a href=\"#introduce\">How It Works</a></li><li><a href=\"#gallery\">Case Study</a></li><li><a href=\"#pricing\">About Us</a></li><li><a href=\"#team\">Our team</a></li><li><a href=\"#contact\">Contact us</a></li><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Extra <span class=\"caret\"></span></a><ul class=\"dropdown-menu\" role=\"menu\"><li><a href=\"portfolio-detail.html\">Portfolio detail</a></li><li><a href=\"components.html\">Components</a></li><li><a href=\"flat-icons.html\">Flat icons</a></li><li><a href=\"font-icons.html\">Font icons</a></li></ul></li></ul></div></div></div></header><section id=\"introduce\" class=\"contain paddingbot-clear\"><div class=\"container marginbot60\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"heading centered\"><h3>See what <span>we can do to help your</span> business</h3><span class=\"heding-style\"></span></div></div></div><div class=\"row text-center wow fadeInUp\" data-wow-delay=\"0.4s\"><div class=\"col-md-4 margintop20 relative\"><span class=\"number\">1</span> <i class=\"icons icon-imac icon-center\"></i><h5>Web design <span>services</span></h5><p>Vix lucilius singulis ut. Unum solum platonem pri viderer petentium te, mel ea graeci bonorum perpetua copiosae idque constituto consetetur eu qui.</p><p><a href=\"#\" class=\"btn btn-default btn-bavel\">Learn more</a></p></div><div class=\"col-md-4 margintop20 relative\"><span class=\"number\">2</span> <i class=\"icons icon-image icon-center\"></i><h5>Logo design <span>services</span></h5><p>Vix lucilius singulis ut. Unum solum platonem pri viderer petentium te, mel ea graeci bonorum perpetua copiosae idque constituto consetetur eu qui.</p><p><a href=\"#\" class=\"btn btn-default btn-bavel\">Learn more</a></p></div><div class=\"col-md-4 margintop20 relative\"><span class=\"number\">3</span> <i class=\"icons icon-iphone icon-center\"></i><h5>App design <span>services</span></h5><p>Vix lucilius singulis ut. Unum solum platonem pri viderer petentium te, mel ea graeci bonorum perpetua copiosae idque constituto consetetur eu qui.</p><p><a href=\"#\" class=\"btn btn-default btn-bavel\">Learn more</a></p></div></div></div><div class=\"dark-bg contain\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-7 wow fadeInLeft\" data-wow-delay=\"0.4s\"><div class=\"heading\"><h3>What makes <span>us different</span></h3><span class=\"heding-style\"></span></div><p>An postea indoctum his. Nam ea commodo similique, tacimates prodesset conclusionemque sea ea, et vel animal deleniti laboramus. Sed quod admodum suavitate et, in usu reque tibique deleniti, est id audiam vocibus constituto. Idque quando feugiat in ius. Cu qui movet malorum, cum ne fabulas peric. Stet deleniti mei ei. Usu eu nisl justo referrentur, eam graecis mandamus in.</p><div class=\"accordion clearfix\" id=\"accordion1\"><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\"><span class=\"accordion-icon icon-like\"></span> Awesome theme features</a></div><div id=\"collapse1\" class=\"accordion-body collapse\"><div class=\"accordion-inner\"><p>Lorem ipsum dolor sit amet, ad eos aperiri voluptatum. Ut nisl disputando has, sit causae dolorum ei, vim choro corpora ei. Vel nobis putent praesent ne, conceptam eloquentiam te vix.</p></div></div></div><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\"><span class=\"accordion-icon icon-wrench\"></span> Easy to customize</a></div><div id=\"collapse2\" class=\"accordion-body collapse\"><div class=\"accordion-inner\"><p>Prodesset maiestatis at eos, rebum offendit ad usu. Pri aeque viris referrentur an, vel soleat mucius scribentur te, eu saepe convenire his.</p></div></div></div><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\"><span class=\"accordion-icon icon-screen-tablet\"></span> Fully responsive layout</a></div><div id=\"collapse3\" class=\"accordion-body collapse\"><div class=\"accordion-inner\"><p>Ut nisl disputando has, sit causae dolorum ei, vim choro corpora ei. Vel nobis putent praesent ne, conceptam eloquentiam te vix. Prodesset maiestatis at eos, rebum offendit ad usu.</p></div></div></div><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\"><span class=\"accordion-icon icon-star\"></span> Valid HTML 5 code</a></div><div id=\"collapse4\" class=\"accordion-body collapse\"><div class=\"accordion-inner\"><p>Vel nobis putent praesent ne, conceptam eloquentiam te vix. Prodesset maiestatis at eos, rebum offendit ad usu. Pri aeque viris referrentur an, vel soleat mucius scribentur te.</p></div></div></div></div></div><div class=\"col-md-5 wow fadeInRight\" data-wow-delay=\"0.4s\"><img src=\"img/flat-divace.png\" class=\"img-responsive pull-right\" alt=\"\"></div></div></div></div></section><section id=\"gallery\" class=\"contain\"><div class=\"container\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"heading centered\"><h3>View <span>our project</span></h3><span class=\"heding-style\"></span></div></div></div><div class=\"row wow fadeInUp\" data-wow-delay=\"0.4s\">><div class=\"col-md-12 text-center\"><ul class=\"nav nav-tabs centered marginbot40\" role=\"tablist\"><li class=\"active\"><a href=\"#tab1\" role=\"tab\" data-toggle=\"tab\">Recent</a></li><li><a href=\"#tab2\" role=\"tab\" data-toggle=\"tab\">Popular</a></li><li><a href=\"#tab3\" role=\"tab\" data-toggle=\"tab\">Premium file</a></li><li><a href=\"#tab4\" role=\"tab\" data-toggle=\"tab\">Free</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab1\"><div class=\"row\"><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img1.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img2.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img3.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img4.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img5.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img6.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img7.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img8.jpg\" class=\"img-responsive\" alt=\"\"></div></div></div></div><div class=\"tab-pane\" id=\"tab2\"><div class=\"row\"><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img8.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img3.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img1.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img6.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img4.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img5.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img7.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img2.jpg\" class=\"img-responsive\" alt=\"\"></div></div></div></div><div class=\"tab-pane\" id=\"tab3\"><div class=\"row\"><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img8.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img6.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img5.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img2.jpg\" class=\"img-responsive\" alt=\"\"></div></div></div></div><div class=\"tab-pane\" id=\"tab4\"><div class=\"row\"><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img4.jpg\" class=\"img-responsive\" alt=\"\"></div></div><div class=\"col-md-3\"><div class=\"portfolio-wrapp\"><div class=\"image-caption\"><a href=\"portfolio-detail.html\" class=\"image-link\"><span class=\"icon-link\"></span></a><div class=\"image-title\"><h5>Project <span>name</span></h5><p>Movet malorum cum ne fabulas peric. Stet deleniti mei ei usu eu nisl.</p></div></div><img src=\"img/gallery/img7.jpg\" class=\"img-responsive\" alt=\"\"></div></div></div></div></div></div></div><div class=\"row\"><div class=\"col-md-4 col-md-offset-4\"><p><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg btn-block\">View more portfolio</a></p></div></div></div></section><section id=\"client\" class=\"color-bg contain\"><div class=\"container\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-12\"><ul class=\"client-list tooltips\"><li><ul><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo1.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo2.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo3.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo4.png\" class=\"client-logo\" alt=\"\"></a></li><li class=\"last\"><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo5.png\" class=\"client-logo\" alt=\"\"></a></li></ul></li><li class=\"bottom-list\"><ul><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo6.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo7.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo8.png\" class=\"client-logo\" alt=\"\"></a></li><li><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo9.png\" class=\"client-logo\" alt=\"\"></a></li><li class=\"last\"><a href=\"#\" class=\"client-link\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Client name\"><img src=\"img/client/logo10.png\" class=\"client-logo\" alt=\"\"></a></li></ul></li></ul></div></div></div></section><div id=\"testimoni\" class=\"parallax\"><div class=\"container\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-12\"><ul class=\"ticker\"><li><div class=\"testimoni\"><a href=\"#\" class=\"testimoni-avatar\"><img src=\"img/testimoni/avatar1.png\" alt=\"\"></a><p>Modo omittantur in pro, has ei reque eloquentiam. Vel cu iudico populo rationibus eam te delicata imperdiet.</p><span>John doe - Doer corp</span></div></li><li><div class=\"testimoni\"><a href=\"#\" class=\"testimoni-avatar\"><img src=\"img/testimoni/avatar2.png\" alt=\"\"></a><p>Brute intellegebat eos eu, te erat viderer necessitatibus sea. Omnis commodo consequat ei mea movet praesent.</p><span>Daren maker - Desimaili corp</span></div></li><li><div class=\"testimoni\"><a href=\"#\" class=\"testimoni-avatar\"><img src=\"img/testimoni/avatar3.png\" alt=\"\"></a><p>Soleat interesset mea cu, eum regione menandri definitionem no, ei pro verear omittantur reprehendunt.</p><span>Joel noah - MartimX corp</span></div></li></ul></div></div></div></div><section id=\"pricing\" class=\"contain\"><div class=\"container\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"heading centered\"><h3>See our <span>project plan</span></h3><span class=\"heding-style\"></span></div></div></div><div class=\"row text-center marginbot20 wow fadeInUp\" data-wow-delay=\"0.4s\"><div class=\"col-md-8 col-md-offset-2\"><h5>Argumentum in nec errem imperdiet abhorreant ei. Id lorem quando legere eos ea nam.</h5><p>Eam facer elaboraret ea, ad eos nullam consulatu maiestatis. Eum mazim simul ne, dicta mnesarchum duo no, ex nec graece verear. Quodsi mentitum iudicabit ut vel, nam suscipiantur definitionem delicatissimi in.</p></div></div><div class=\"row\"><div class=\"col-md-3 wow flipInY\" data-wow-delay=\"0.6s\"><div class=\"pricing-box\"><div class=\"pricing-head\"><h4>Basic</h4><div class=\"price\"><span>$15 /</span> <em>mon</em></div></div><ul><li><strong>Free</strong> update</li><li><strong>Unlimited</strong> color</li><li><strong>PSD file</strong> included</li><li><strong>1 month</strong> done</li><li><strong>3 month</strong> maintenance</li><li><strong>Free</strong> icons</li><li><strong>Documentation</strong> included</li></ul><div class=\"pricing-bottom\"><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg btn-block\">Select this</a></div></div></div><div class=\"col-md-3 wow flipInY\" data-wow-delay=\"0.8s\"><div class=\"pricing-box\"><div class=\"pricing-head\"><h4>Team</h4><div class=\"price\"><span>$25 /</span> <em>mon</em></div></div><ul><li><strong>Free</strong> update</li><li><strong>Unlimited</strong> color</li><li><strong>PSD file</strong> included</li><li><strong>1 month</strong> done</li><li><strong>6 month</strong> maintenance</li><li><strong>Free</strong> icons</li><li><strong>Documentation</strong> included</li></ul><div class=\"pricing-bottom\"><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg btn-block\">Select this</a></div></div></div><div class=\"col-md-3 wow flipInY\" data-wow-delay=\"1s\"><div class=\"pricing-box featured\"><div class=\"pricing-head\"><h4>Proffesional</h4><div class=\"price\"><span>$40 /</span> <em>mon</em></div></div><ul><li><strong>Free</strong> update</li><li><strong>Unlimited</strong> color</li><li><strong>PSD file</strong> included</li><li><strong>1 month</strong> done</li><li><strong>1 year</strong> maintenance</li><li><strong>Free</strong> icons</li><li><strong>Documentation</strong> included</li></ul><div class=\"pricing-bottom\"><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg btn-block\">Select this</a></div></div></div><div class=\"col-md-3 wow flipInY\" data-wow-delay=\"1.2s\"><div class=\"pricing-box\"><div class=\"pricing-head\"><h4>Buseness</h4><div class=\"price\"><span>$75 /</span> <em>mon</em></div></div><ul><li><strong>Free</strong> update</li><li><strong>Unlimited</strong> color</li><li><strong>PSD file</strong> included</li><li><strong>1 month</strong> done</li><li><strong>5 year</strong> maintenance</li><li><strong>Free</strong> icons</li><li><strong>Documentation</strong> included</li></ul><div class=\"pricing-bottom\"><a href=\"#\" class=\"btn btn-default btn-bavel btn-lg btn-block\">Select this</a></div></div></div></div></div></section><section id=\"team\" class=\"color-bg contain paddingbot-clear\"><div class=\"container\"><div class=\"row wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-8 col-md-offset-2\"><div class=\"heading centered\"><h3>People behind <span>increate</span></h3><span class=\"heding-style\"></span></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"list_carousel responsive\"><a id=\"prev4\" class=\"prev\" href=\"#\"><span class=\"icon-arrow-left\"></span> </a><a id=\"next4\" class=\"next\" href=\"#\"><span class=\"icon-arrow-right\"></span></a><div class=\"clearfix\"></div><ul id=\"foo4\"><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Jhonatan <span>done</span></h5><p>Founder</p></div><img src=\"img/team/team1.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Anna <span>whilebord</span></h5><p>Cofounder</p></div><img src=\"img/team/team2.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Alex <span>root</span></h5><p>Web designer</p></div><img src=\"img/team/team3.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Annisa <span>mints</span></h5><p>App engineer</p></div><img src=\"img/team/team4.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>George <span>willmore</span></h5><p>Web progremer</p></div><img src=\"img/team/team5.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Marrio <span>Slovlansky</span></h5><p>Web progremer</p></div><img src=\"img/team/team6.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Linna <span>luna</span></h5><p>Marketing</p></div><img src=\"img/team/team7.png\" class=\"img-responsive\" alt=\"\"></div></li><li><div class=\"team-wrapper\"><div class=\"team-detail\"><h5>Dindee <span>dee</span></h5><p>Marketing</p></div><img src=\"img/team/team8.png\" class=\"img-responsive\" alt=\"\"></div></li></ul></div></div></div></div></section><section id=\"contact\" class=\"contain\"><div class=\"container\"><div class=\"row text-center marginbot20 wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"col-md-6 col-md-offset-3\"><div class=\"heading centered\"><h3>Get in touch <span>with us</span></h3><span class=\"heding-style\"></span></div><h5>If you have a need for a freelance web designer to help you with your web project please get in touch.</h5></div></div><div class=\"row wow fadeInUp\" data-wow-delay=\"0.4s\"><div class=\"col-md-8 col-md-offset-2\"><form id=\"contactform\" action=\"contact/contact.php\" method=\"post\" class=\"validateform\" name=\"leaveContact\"><div class=\"clearfix\"></div><div id=\"sendmessage\"><div class=\"alert alert-info marginbot35\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button> <strong>Your message has been sent. Thank you!</strong><br></div></div><ul class=\"listForm\"><li><input class=\"form-control input-name\" type=\"text\" name=\"name\" data-rule=\"maxlen:4\" data-msg=\"Required field\" placeholder=\"Enter your full name . . .\"><div class=\"validation\"></div></li><li><input class=\"form-control input-email\" type=\"text\" name=\"email\" data-rule=\"email\" data-msg=\"Please enter a valid email\" placeholder=\"Enter your email address . . .\"><div class=\"validation\"></div></li><li class=\"fullwidth\"><textarea class=\"form-control input-message\" rows=\"9\" name=\"message\" data-rule=\"required\" data-msg=\"Please write something for us\" placeholder=\"Write something for us . . .\"></textarea><div class=\"validation\"></div></li><li class=\"fullwidth\"><input type=\"submit\" value=\"Send message\" class=\"btn btn-default btn-bavel btn-lg btn-block\" name=\"Submit\"></li></ul></form></div></div></div></section><section id=\"subscribe\" class=\"color-bg contain\"><div class=\"container\"><div class=\"row text-center\"><div class=\"col-md-6 col-md-offset-3 wow fadeInDown\" data-wow-delay=\"0.4s\"><div class=\"heading centered\"><h3>Stay update <span>with us</span></h3><span class=\"heding-style\"></span></div></div><div class=\"col-md-8 col-md-offset-2 wow fadeInUp\" data-wow-delay=\"0.4s\"><form><fieldset class=\"subscribe-form\"><input class=\"subscribe\" type=\"text\" placeholder=\"Enter your email address\"> <button class=\"subscribe-button\" type=\"button\">Subscribe</button></fieldset></form></div></div></div></section><footer><div class=\"social-network\"><a href=\"#\" class=\"social-link\"><span class=\"icon-social-facebook\"></span> </a><a href=\"#\" class=\"social-link\"><span class=\"icon-social-twitter\"></span> </a><a href=\"#\" class=\"social-link\"><span class=\"icon-social-dribbble\"></span> </a><a href=\"#\" class=\"social-link\"><span class=\"icon-social-tumblr\"></span></a></div><p class=\"copyright\">2014 &copy; Copyright <a href=\"#\">nce18cex.</a> All rights Reserved.</p></footer></template>"; });
define('text!policy/policy.html', ['module'], function(module) { module.exports = "<template><section class=\"section\"><div class=\"container\"><div class=\"card\"><div class=\"card__header\"><h2>Privacy Policy</h2></div><div class=\"card__body\"><p>1. INFORMATION GATHERED BY CASHFORPROPERTY.AE: This is cashforproperty.ae’s (cashforproperty.ae”) online privacy policy (“Policy”). This policy applies only to activities cashforproperty.ae engages in on its website and does not apply to cashforproperty.ae activities that are “offline” or unrelated to the website. cashforproperty.ae collects certain anonymous data regarding the usage of the website. This information does not personally identify users, by itself or in combination with other information, and is gathered to improve the performance of the website. The anonymous data collected by cashforproperty.ae website can include information such as the type of browser you are using, and the length of the visit to the website. You may also be asked to provide personally identifiable information on the cashforproperty.ae website, which may include your name, address, telephone number and e-mail address. This information can be gathered when feedback or e-mails are sent to cashforproperty.ae, when you register for services, or make purchases via the website. In all such cases you have the option of providing us with personally identifiable information.</p><p>2. USE AND DISCLOSURE OF INFORMATION: Except as otherwise stated below, we do not sell, trade or rent your personally identifiable information collected on the site to others. The information collected by our site is used to process your property sale, to keep you informed and for statistical purposes for improving our site. All details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties.</p><p>3. COOKIES: Cookies are small bits of data cached in a user’s browser. cashforproperty.ae utilises cookies to determine whether or not you have visited the home page in the past. However, no other user information is gathered.</p>cashforproperty.ae may use non-personal “aggregated data” to enhance the operation of our website, or analyse interest in the areas of our website. Additionally, if you provide cashforproperty.ae with content for publishing or feedback, we may publish your user name or other identifying data with your permission.<p></p>cashforproperty.ae may also disclose personally identifiable information in order to respond to a subpoena, court order or other such request. cashforproperty.ae may also provide such personally identifiable information in response to a law enforcement agency’s request or as otherwise required by law. Your personally identifiable information may be provided to a party if cashforproperty.ae files for bankruptcy, or there is a transfer of the assets or ownership of cashforproperty.ae in connection with proposed or consummated corporate reorganisations, such as mergers or acquisitions.<p></p><p>4. SECURITY: cashforproperty.ae takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However, cashforproperty.ae cannot guarantee the security of any information that is disclosed online.</p><p>5. OTHER WEBSITES: cashforproperty.ae is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties, different rules regarding the collection and use of your personal information may apply. We strongly suggest you review such third party’s privacy policies before providing any data to them. We are not responsible for the policies or practices of third parties. Please be aware that our sites may contain links to other sites on the Internet that are owned and operated by third parties. The information practices of those Web sites linked to our site is not covered by this Policy. These other sites may send their own cookies or clear GIFs to users, collect data or solicit personally identifiable information. We cannot control this collection of information. You should contact these entities directly if you have any questions about their use of the information that they collect.</p><p>6. MINORS: cashforproperty.ae does not knowingly collect personal information from minors under the age of 18. Minors are not permitted to use the cashforproperty.ae website or services, and cashforproperty.ae requests that minors under the age of 18 not submit any personal information to the website. Since information regarding minors under the age of 18 is not collected, cashforproperty.ae does not knowingly distribute personal information regarding minors under the age of 18.</p><p>7. CORRECTIONS AND UPDATES: If you wish to modify or update any information cashforproperty.ae has received, please contact info@cashforproperty.ae.</p><p>8. MODIFICATIONS OF THE PRIVACY POLICY: The Website Policies and Terms &amp; Conditions would be changed or updated occasionally to meet the requirements and standards. Therefore the Customers’ are encouraged to frequently visit these sections in order to be updated about the changes on the website. Modifications will be effective on the day they are posted.</p></div></div></div></section><a class=\"btn brn-sm btn-default btn-static\" style=\"position:fixed;bottom:75%;right:0;border-radius:100px;padding:3px\" route-href=\"route: submit\"><img src=\"img/sellnow.png\" class=\"img-responsive\"></a></template>"; });
define('text!submit/submit.html', ['module'], function(module) { module.exports = "<template>'<require from=\"./submit.css\"></require>'<section class=\"section\"><div class=\"container\"><header class=\"section__title\"><h2>Submit your property</h2><small>Please fill up some basic details about the property</small></header><div class=\"submit-property\"><ul class=\"submit-property__steps\"><li class=\"active\"><a href=\"#submit-property-1\" data-toggle=\"tab\">1</a></li><li><a href=\"#submit-property-2\" data-toggle=\"tab\">2</a></li><li><a id=\"submitted\" href=\"#submit-property-3\">3</a></li><li class=\"submit-property__caret\"></li></ul><div class=\"tab-content submit-property__content\"><div class=\"tab-pane fade in active\" id=\"submit-property-1\"><div class=\"card\"><div class=\"card__header\"><h2>Contact Information</h2><small>Please fill up your contact information so we can get in touch with you.</small></div><form class=\"card__body\"><div class=\"form-group form-group--float form-group--float-center\">Full Name <span style=\"color:red\">*</span> <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.contact.name\" required> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.contact.name\">Please enter a valid name</div></div><div class=\"form-group form-group--float form-group--float-center\">Organization Name (optimal) <span style=\"color:red\">*</span> <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.contact.organization\"> <i class=\"form-group__bar\"></i></div><div class=\"form-group form-group--float form-group--float-center m-b-5\">Email Address <span style=\"color:red\">*</span> <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.contact.email\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.contact.email\">Please enter a valid email</div></div><div class=\"form-group form-group--float form-group--float-center\">Contact Number [+971XXXXXXXXX] <span style=\"color:red\">*</span> <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.contact.contactNo\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.contact.contactNo\">Please enter a valid contactNo</div></div><div class=\"form-group form-group--float form-group--float-center\"><i><span style=\"color:red\">*</span> required</i></div><a data-toggle=\"tab\" class=\"btn btn--circle btn-primary submit-property__button\" click.delegate=\"validateContact()\"><i class=\"zmdi zmdi-long-arrow-right\"></i></a></form></div></div><div class=\"tab-pane fade\" id=\"submit-property-2\"><div class=\"card\"><div class=\"card__header\"><h2>Property Information</h2><small>Please fill up information about the property.</small></div><form class=\"card__body\"><div class=\"form-group form-group--float m-b-5\">Area and Community (optional) <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.location.address\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.location.address\">Please enter a valid value</div></div><div class=\"form-group\"><label>Property Type (optional)</label><select class=\"select2\" value.bind=\"model.information.type\"><option value=\"apartment\">-</option><option value=\"apartment\">Apartment</option><option value=\"townhouse\">Townhouse</option><option value=\"villa\">Villa</option></select></div><div class=\"form-group form-group--float m-b-5\">Unit/Floor/Block (optional) <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.location.unit\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.location.unit\">Please enter a valid value</div></div><div class=\"form-group\"><div class=\"checkbox\"><label><input type=\"checkbox\" checked.bind=\"model.location.currentlyRented\"> <i class=\"input-helper\"></i> Currently Rented</label></div></div><div class=\"form-group form-group--float form-group--float-center\">Title Deed Number (optional) <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.information.title\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.title\">Please enter a valid value</div></div><div class=\"form-group form-group--float form-group--float-center\">View (optional)<textarea class=\"form-control text-center textarea-autoheight\" value.bind=\"model.information.view\"></textarea><i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.view\">Please enter a valid value</div></div><div class=\"form-group form-group--float form-group--float-center\">Square Feet (optional) <input type=\"numeric\" class=\"form-control text-center\" value.bind=\"model.information.squareFeet\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.squareFeet\">Please enter a valid value</div></div><div class=\"form-group form-group--float form-group--float-center\">Plot Size (if applicable) (optional) <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.information.plotSize\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.plotSize\">Please enter a valid value</div></div><div class=\"form-group form-group--float m-b-5\">Description (optional)<br><small><i>For example: Pool included, well maintained garden etc.</i></small> <input type=\"text\" class=\"form-control text-center textarea-autoheight\" value.bind=\"model.information.description\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.description\">Please enter a valid value</div></div><div class=\"form-group\"><label>Bedrooms (optional)</label><div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\"><label class=\"btn active\" click.delegate=\"toggleBathrooms('-')\"><input type=\"radio\" name=\"inner-search-beds\">-</label><label class=\"btn\" click.delegate=\"toggleBathrooms('1')\"><input type=\"radio\" name=\"inner-search-beds\">1</label><label class=\"btn\" click.delegate=\"toggleBathrooms('2')\"><input type=\"radio\" name=\"inner-search-beds\">2</label><label class=\"btn\" click.delegate=\"toggleBathrooms('3')\"><input type=\"radio\" name=\"inner-search-beds\">3</label><label class=\"btn\" click.delegate=\"toggleBathrooms('4')\"><input type=\"radio\" name=\"inner-search-beds\">4</label><label class=\"btn\" click.delegate=\"toggleBathrooms('4+')\"><input type=\"radio\" name=\"inner-search-beds\">4+</label></div></div><div class=\"form-group\"><label>Bathrooms (optional)</label><div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\"><label class=\"btn active\" click.delegate=\"toggleBathrooms('-')\"><input type=\"radio\" name=\"inner-search-beds\">-</label><label class=\"btn\" click.delegate=\"toggleBathrooms('1')\"><input type=\"radio\" name=\"inner-search-beds\">1</label><label class=\"btn\" click.delegate=\"toggleBathrooms('2')\"><input type=\"radio\" name=\"inner-search-beds\">2</label><label class=\"btn\" click.delegate=\"toggleBathrooms('3')\"><input type=\"radio\" name=\"inner-search-beds\">3</label><label class=\"btn\" click.delegate=\"toggleBathrooms('4')\"><input type=\"radio\" name=\"inner-search-beds\">4</label><label class=\"btn\" click.delegate=\"toggleBathrooms('4+')\"><input type=\"radio\" name=\"inner-search-beds\">4+</label></div></div><div class=\"form-group\"><label>Parking Space (optional)</label><div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\"><label class=\"btn active\" click.delegate=\"toggleParkingSpaces('-')\"><input type=\"radio\" name=\"inner-search-beds\">-</label><label class=\"btn\" click.delegate=\"toggleParkingSpaces('1')\"><input type=\"radio\" name=\"inner-search-beds\">1</label><label class=\"btn\" click.delegate=\"toggleParkingSpaces('2')\"><input type=\"radio\" name=\"inner-search-beds\" click.delegate=\"toggleParkingSpaces(2)\">2</label><label class=\"btn\" click.delegate=\"toggleParkingSpaces('3')\"><input type=\"radio\" name=\"inner-search-beds\" click.delegate=\"toggleParkingSpaces(3)\">3</label><label class=\"btn\" click.delegate=\"toggleParkingSpaces('3+')\"><input type=\"radio\" name=\"inner-search-beds\" click.delegate=\"toggleParkingSpaces(4)\">3+</label></div></div><div class=\"form-group form-group--float form-group--float-center\">Property Deed (jpg/png) (optional) <input type=\"file\" accept=\"image/*\" files.bind=\"deed\"> <i class=\"form-group__bar\"></i></div><ul><li repeat.for=\"file of deed | fileListToArray\"><h6>${file.name}: ${file.type} ${file.size / 1000} kb</h6><img src.bind=\"file | blobToUrl\" width=\"100\" height=\"100\"><img></li></ul><div class=\"form-group form-group--float form-group--float-center\">Property Images (jpg/png) (optional) <input type=\"file\" multiple=\"multiple\" accept=\"image/*\" files.bind=\"selectedFiles\"> <i class=\"form-group__bar\"></i></div><ul><li repeat.for=\"file of selectedFiles | fileListToArray\"><h6>${file.name}: ${file.type} ${file.size / 1000} kb</h6><img src.bind=\"file | blobToUrl\" width=\"100\" height=\"100\"><img></li></ul><div class=\"form-group form-group--float form-group--float-center\">Expected Price (optional) <input type=\"text\" class=\"form-control text-center\" value.bind=\"model.information.expectedPrice\"> <i class=\"form-group__bar\"></i><div style=\"color:brown\" show.bind=\"validation.information.expectedPrice\">Please enter a valid value</div></div><div class=\"form-group\"><div class=\"checkbox\"><label><input type=\"checkbox\" checked.bind=\"tncCheck\"> <i class=\"input-helper\"></i> I agree to the <a route-href=\"route: tnc\" target=\"_blank\">Terms &amp; Conditions</a></label></div></div><button data-toggle=\"tab\" class=\"btn btn--circle btn-primary submit-property__button\" disabled.bind=\"!tncCheck || submitted\" click.delegate=\"validateInformation(images)\"><i class=\"zmdi zmdi-check\"></i></button></form></div></div><div class=\"tab-pane fade\" id=\"submit-property-3\"><div class=\"card\"><div class=\"submit-property__success\"><i class=\"zmdi zmdi-check\"></i><h2>Successful!</h2><p>Your proposal has been submitted and we will get back to you as soon as possible.</p><div class=\"info-box__item\"><img class=\"img-responsive\" src=\"img/ON40SC1.png\" alt=\"\" width=\"300\" height=\"300\" style=\"display:inline\"></div></div></div></div></div></div></div></section></template>"; });
define('text!tnc/tnc.html', ['module'], function(module) { module.exports = "<template><section class=\"section\"><div class=\"container\"><div class=\"card\"><div class=\"card__header\"><h2>Terms &amp; Conditions</h2></div><div class=\"card__body\"><p>Cash For Property offers usually follow the average timescale of 2 – 3 Weeks. However, in some cases, we have completed the transaction within 7 days.</p><p>Cash For Property reserves the right to have a certified valuation conducted on your property.</p><p>Cash For Property reserves the right to seek additional reports, certificates, prior to concluding the transaction.</p><p>The offer made by Cash For Property may not always be market price. Our offer depends on property type, condition, age, etc. It is important to note here that time saved and headache-free experience in selling your property is very significant.</p><p>Our initial offer is conditional upon final survey. Our offer may change if your property has any unfavourable condition – structural or otherwise.</p><p>Unless we are legally bound by a court order, all information about you, your transaction and any other information we may have through your interaction with Cash For Property, we will not release or misuse this information without your express consent.</p><p>Our Agreement will remain in force for a period of 3 months from the date of signing.</p><p>Breach of terms will be subject to the rules of the real estate regulators in the respective emirates.</p><p>Our offers are based on an analysis of recent transactions registered with the land registrars in the respective emirates. Cash For Property will take into consideration the upkeep of your property as well as the community.</p><p>If the agreement is terminated within the Agreement term by the seller, the seller agrees to a penalty of 10% of the offered price.</p></div></div></div></section><a class=\"btn brn-sm btn-default btn-static\" style=\"position:fixed;bottom:55%;right:0;border-radius:100px;padding:3px\" route-href=\"route: submit\"><img src=\"img/sellnow.png\" class=\"img-responsive\"></a></template>"; });
//# sourceMappingURL=app-bundle.js.map