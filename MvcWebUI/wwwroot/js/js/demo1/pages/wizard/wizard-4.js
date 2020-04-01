"use strict";

// Class definition
var KTWizard4 = function () {
	// Base elements
	var wizardEl;
	var formEl;
	var validator;
	var wizard;
	
	// Private functions
	var initWizard = function () {
		// Initialize form wizard
		wizard = new KTWizard('kt_wizard_v4', {
			startStep: 1,
		});

		// Validation before going to next page
		wizard.on('beforeNext', function(wizardObj) {
			if (validator.form() !== true) {
				wizardObj.stop();  // don't go to the next step
			}
		})

		// Change event
		wizard.on('change', function(wizard) {
			KTUtil.scrollTop();	
		});
	}

	var initValidation = function() {
		validator = formEl.validate({
			// Validate only visible fields
			ignore: ":hidden",

			// Validation rules
			rules: {
				//= Step 1
				fname: {
					required: true 
				},
				lname: {
					required: true
				},	   
				phone: {
					required: true
				},	 
				emaul: {
					required: true,
					email: true
				},	 

				//= Step 2
				address1: {
					required: true 
				},
				postcode: {
					required: true
				},	   
				city: {
					required: true
				},	 
				state: {
					required: true
				},	 
				country: {
					required: true
				},	

				//= Step 3
				ccname: {
					required: true 
				},
				ccnumber: {
					required: true,
					creditcard: true
				},	   
				ccmonth: {
					required: true
				},	 
				ccyear: {
					required: true
				},	 
				cccvv: {
					required: true,					
					minlength: 2,
					maxlength: 3
				},	
			},
			
			// Display error  
			invalidHandler: function(event, validator) {	 
				KTUtil.scrollTop();

				swal.fire({
					"title": "", 
					"text": "There are some errors in your submission. Please correct them.", 
					"type": "error",
					"confirmButtonClass": "btn btn-secondary"
				});
			},

			// Submit valid form
			submitHandler: function (form) {
				
			}
		});   
	}

	var initSubmit = function() {
		var btn = formEl.find('[data-ktwizard-type="action-submit"]');

		btn.on('click', function(e) {
			e.preventDefault();
            Swal.fire({
                title: 'Emin misiniz?',
                text: "Onay verdiginiz takdirde diyet formu kaydedilecektir.!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet, Kaydet!',
                cancelButtonText: 'Iptal Et!'
            }).then((result) => {
                if (result.value) {
                    if (validator.form()) {
                        // See: src\js\framework\base\app.js
                        KTApp.progress(btn);
                        //KTApp.block(formEl);

                        // See: http://malsup.com/jquery/form/#ajaxSubmit
                        formEl.ajaxSubmit({
                            success: function () {
                                KTApp.unprogress(btn);
                                //KTApp.unblock(formEl);

                                //swal.fire({
                                //    "title": "",
                                //    "text": "Form basari ile kaydedildi",
                                //    "type": "success",
                                //    "confirmButtonClass": "btn btn-secondary",
                                //    "confirmButtonText": "Tamam"
                                //});

                            }
                        });
                        location.reload();
                   
                       
                    }
                }
            })
			
		});
	}

	return {
		// public functions
		init: function() {
			wizardEl = KTUtil.get('kt_wizard_v4');
			formEl = $('#kt_form');

			initWizard(); 
			initValidation();
			initSubmit();
		}
	};
}();

jQuery(document).ready(function() {	
	KTWizard4.init();
});