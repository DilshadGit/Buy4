 $(document).ready(function(){
    // contact form handler
    // var contactForm = $('.contact-form')
    var contactForm = $('.contact-form')
    var contactFormMethod = contactForm.attr('method')
    var contactFormEndpoint = contactForm.attr('action')
    

    function displaySubmitting(submitButton, defaultText, doSubmit){

        if (doSubmit){
            submitButton.addClass('disabled')
            submitButton.html("<i class='fa fa-spin fa-spinner'></i> Sending >>")
        } else {
            submitButton.removeClass('disabled')
            submitButton.html(defaultText)
        }
    }
    // handler
    contactForm.submit(function(event) {
        /* Act on the event */
        event.preventDefault()

        var contactFormSubmitBtn = contactForm.find('[type="submit"]')
        var contactFormSubmitBtnTxt = contactFormSubmitBtn.text()

        var contactFormData = contactForm.serialize()
        var sentForm = $(this)
        displaySubmitting(contactFormSubmitBtn, '', true)

        $.ajax({
            method: contactFormMethod,
            url: contactFormEndpoint,
            data: contactFormData,
            success: function(data){
                // console.log()
                sentForm[0].reset()
                $.alert({
                    title: 'Thank you',
                    // content: 'Jquery confirm alert, Your message has been sent',
                    content: data.message,
                    theme: 'modern',
                })
                setTimeout(function(){
                    displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
                }, 2000)
            },
            error: function(error){
                console.log(error.responseJSON)
                var jsonData = error.responseJSON
                var msg = ''

                // .each() is a for loop in jq
                $.each(jsonData, function(key, value){
                    // key, value in dictionary but in js is array index, object
                    msg += key + ": " + value[0].message + "<br/>"
                })

                $.alert({
                    title: 'Oops!',
                    // content: 'Jquery confirm alert, Something wrong',
                    // content: 'Please check your email, something went wrong!',
                    content: msg,
                    theme: 'modern',
                })
                setTimeout(function(){
                    displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
                }, 2000)
            }
        })
    });
    // End of contact form check

    // ===============================================================================

    // Searching
    var searchForm = $('.search-form')
    var searchInput = searchForm.find("[name='q']") // input name='q'
    var typimgTimer;
    var typingInterval = 500 // .5 seconds
    var searchButton = searchForm.find("[type='submit']")

    searchInput.keyup(function(event){
        // console.log(event)
        // console.log(searchInput.val())
        // var query = searchInput.val()
        // window.location.href = "/seach/?q" + query //
        // key released
        clearTimeout(typingTimer)
        typintTimer = setTimeout(performSearch, typingInterval)
    })

    searchInput.keydown(function(event){
        // key pressed
        clearTimeout(typingTimer)
    })

    function displaySearch(){
        searchButton.addClass('disabled')
        searchButton.html("<i class='fa fa-spinner'> </i> Searching ...")
    }

    function performSearch(){
        displaySearch()
        var query = searchInput.val()
        setTimeout(function(){
            window.location.href="/search/?q" + query
        }, 1000) 
    }
    // End of searching part

    // ===============================================================================

    // Cart and Add product
    // This is a form selector ajax = Asynchronos javascript request
    var itemForm = $(".form-item-ajax");

    // preventDefault() not allowd this form submited
    itemForm.submit(function(event){
        event.preventDefault();
        // console.log("Form is not sending!")
        var thisForm = $(this)
        // var actionEndPoint = thisForm.attr("action"); // Using API endpoint
        // What is happening here is change the above line to data-endpoint for reference
        var actionEndPoint = thisForm.attr("data-endpoint")
        var httpMethod =  thisForm.attr("method");
        var formData =  thisForm.serialize();

        // this is only to test in js console in chrom
        // console.log(thisForm.attr("action"), thisForm.attr("method"))

        // Here building ajax form 
        $.ajax({
            url: actionEndPoint,
            method: httpMethod,
            data: formData,

            success: function(data){
                console.log("success")
                // console.log(data)
                // console.log('Added', data.added)
                // console.log('Removed', data.removed)
                var submitSpan = thisForm.find(".submit-span")
                if (data.added){
                    submitSpan.html("<strong>In cart </strong>\
                            <button type='submit' class='btn btn-link' style='cursor: pointer; color:red;'>\
                            <i class='fa fa-minus-circle'></i> Remove ?\
                            </button>"
                        )
                } else {
                    submitSpan.html("<button type='submit' class='btn btn-success'>\
                            <i class='fa fa-plus-circle'></i> Add to cart\
                            </button>"
                        )
                }
                var navbarCartCount = $(".navbar-cart-count")
                navbarCartCount.text(data.cartItemCount)
                // create var currentPath and window.location.href built in jq
                var currentPath = window.location.href

                if (currentPath.indexOf('cart') != -1){
                    refreshCart()
                }
                // or 
                // console.log(submitSpan.html())
            },
            error: function(errorData){
                // This is jquery confirm example to test go to product list and click
                // on add item to the cart,l you can replace where you have error in jq
                // and comment out beoth colsole.log('error'), console.log(errorData)
                $.alert({
                    title: 'Upps',
                    content: 'Jquery confirm alert, Something wrong',
                    theme: 'modern',
                })
                // console.log("error")
                // console.log(errorData)
            }
        })
    })

    // This function is creat to referesh the cart-index when an item has been
    // removed from the cart the page automatically refreshed with which is left
    function refreshCart(){
        // console.log('Items left in current Cart')
        var cartTable = $('.cart-table')
        var cartBody = cartTable.find('.cart-body')
        // cartBody.html("<h3>Refresh</h3>")
        var productRows = cartBody.find(".cart-product")
        var currentUrl = window.location.href

        var refreshCartUrl = '/api/cart/';
        var refreshCartMethod = 'GET';
        var data = {};

        $.ajax({
            url: refreshCartUrl,
            method: refreshCartMethod,
            data: data,
            success: function(data){
                // console.log('success')
                // console.log(data)
                var hiddenCartItemRemoveForm = $('.cart-item-remove-form')
                if (data.products.length > 0){
                    productRows.html(" ")

                    i = data.products.length
                    // forloop
                    $.each(data.products, function(index, value){
                        console.log(value)
                        var newCartItemRemove = hiddenCartItemRemoveForm.clone()
                        newCartItemRemove.css('display', 'block')
                        // newCartItemRemove.removeClass('hidden-class')
                        newCartItemRemove.find('.cart-item-product-id').val(value.id)

                        cartBody.prepend("<tr><th colspan='' rowspan='' headers=''\
                            scope='row'>" + i + "</th><td><a href='" + value.url + "'>" + 
                            value.name + "</a>" + newCartItemRemove.html() + "</td><td>"
                             + value.price + "</td></tr>")
                            i --
                    })
                    
                    cartBody.find(".cart-subtotal").text(data.sub_total)
                    cartBody.find(".cart-taxes").text(data.taxes)
                    cartBody.find(".cart-total").text(data.total)
                } else {
                    window.location.href = currentUrl
                }
            },
            error: function(errorData){
                $.alert({
                    title: 'Upps',
                    content: 'Jquery confirm alert, Something wrong',
                    theme: 'modern',
                })
                // console.log('error')
                // console.log(errorData)
            }
        })
    }
    // End of Cart and Add product
})