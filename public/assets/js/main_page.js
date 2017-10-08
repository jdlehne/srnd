
$(document).ready(function() {
    // The maximum number of options
    var MAX_OPTIONS = 5;
    var MAX_QTY = 5;

    $('#AddForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                question: {
                    validators: {
                        notEmpty: {
                            message: 'The question required and cannot be empty'
                        }
                    }
                },
                'option[]': {
                    validators: {
                        notEmpty: {
                            message: 'The option required and cannot be empty'
                        },
                        stringLength: {
                            max: 100,
                            message: 'The option must be less than 100 characters long'
                        }
                    }
                },
                'qty[]': {
                    validators: {
                        notEmpty: {
                            message: 'The quantity required and cannot be empty'
                        },
                        stringLength: {
                            max: 4,
                            message: 'The quantity must be less than 4 numbers long'
                        }
                    }
                },
            }
        })

        // Add button click handler
        .on('click', '.addButton', function() {
            var $template = $('#optionTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .insertBefore($template),
                $option   = $clone.find('[name="option[]"]');
                $qty   = $clone.find('[name="qty[]"]');

            // Add new field
            $('#addForm').formValidation('addField', $option, $qty);
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row    = $(this).parents('.form-group'),
                $option = $row.find('[name="option[]"]');
                $qty = $row.find('[name="qty[]"]');

            // Remove element containing the option
            $row.remove();

            // Remove field
            $('#addForm').formValidation('removeField', $option);
        })

        // Called after adding new field
        .on('added.field.fv', function(e, data) {

            if (data.field === 'option[]') {
                if ($('#addForm').find(':visible[name="option[]"]').length >= MAX_OPTIONS) {
                    $('#addForm').find('.addButton').attr('disabled', 'disabled');
                }
            }


        if (data.field === 'qty[]') {
            if ($('#addForm').find(':visible[name="qty[]"]').length >= MAX_QTY) {
                $('#addForm').find('.addButton').attr('disabled', 'disabled');
            }
        }
    })

        // Called after removing the field
        .on('removed.field.fv', function(e, data) {
           if (data.field === 'option[]') {
                if ($('#addForm').find(':visible[name="option[]"]').length < MAX_OPTIONS) {
                    $('#addForm').find('.addButton').removeAttr('disabled');
                }
            }
            if (data.field === 'qty[]') {
                 if ($('#addForm').find(':visible[name="qty[]"]').length < MAX_QTY) {
                     $('#addForm').find('.addButton').removeAttr('disabled');
                 }
             }
        });
});
